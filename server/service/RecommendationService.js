// xử lý việc tạo gợi ý cho người dùng

// server/services/RecommendationService.js
import User from '../Models/UserModels.js';
import Movies from '../Models/MoviesModel.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class RecommendationService {
    constructor() {
        // Sử dụng Python từ môi trường ảo
        this.pythonPath = path.join(__dirname, '..', 'ml_scripts', 'venv', 'Scripts', 'python.exe');
        this.scriptsPath = path.join(__dirname, '..', 'ml_scripts');
    }

    // Chạy Python script và lấy kết quả
    async runPythonScript(scriptName, args = []) {
        return new Promise((resolve, reject) => {
            const scriptPath = path.join(this.scriptsPath, scriptName);
            console.log(`Chạy Python script: ${this.pythonPath} ${scriptPath} ${args.join(' ')}`);
            const process = exec(`${this.pythonPath} ${scriptPath} ${args.join(' ')}`, {
                maxBuffer: 1024 * 1024 * 10, // 10MB buffer
            });

            let output = '';
            let errorOutput = '';

            process.stdout.on('data', (data) => {
                output += data.toString();
            });

            process.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            process.on('close', (code) => {
                if (code !== 0) {
                    console.error(`Python script error (${scriptName}):`, errorOutput);
                    reject(new Error(`Script failed with code ${code}: ${errorOutput}`));
                } else {
                    resolve(output.trim());
                }
            });

            process.on('error', (error) => {
                console.error(`Error running Python script (${scriptName}):`, error);
                reject(error);
            });
        });
    }

    // Chỉ cập nhật preferences của user mà KHÔNG train lại models
    async updateUserPreferencesOnly(userId) {
        try {
            const userObjectId = new mongoose.Types.ObjectId(userId);
            const user = await User.findById(userObjectId)
                .populate('likedMovies')
                .exec();

            if (!user) {
                throw new Error('Không tìm thấy người dùng');
            }

            // Vẫn giữ logic cũ để tương thích ngược
            const preferences = {};

            // 1. Xử lý phim đã thích
            for (const movie of user.likedMovies) {
                if (!movie.features) continue;
                for (const [key, value] of Object.entries(movie.features)) {
                    preferences[key] = (preferences[key] || 0) + value;
                }
            }

            // 2. Xử lý đánh giá
            const ratedMovies = await Movies.find({
                'reviews.userId': userObjectId
            }).select('reviews features name').exec();

            for (const movie of ratedMovies) {
                const review = movie.reviews.find(r => r.userId.toString() === userObjectId.toString());
                if (!review || !movie.features) continue;

                const weight = review.rating / 5;
                for (const [key, value] of Object.entries(movie.features)) {
                    preferences[key] = (preferences[key] || 0) + value * weight;
                }
            }

            // Chuẩn hóa preferences
            const values = Object.values(preferences);
            if (values.length > 0) {
                const maxValue = Math.max(...values);
                if (maxValue > 0) {
                    for (const key of Object.keys(preferences)) {
                        preferences[key] = preferences[key] / maxValue;
                    }
                }
            }

            // Lưu preferences vào user
            user.preferences = preferences;
            await user.save();

            return preferences;

        } catch (error) {
            console.error('Lỗi khi cập nhật preferences:', error);
            throw error;
        }
    }

    // Cập nhật preferences của user dựa trên đánh giá và phim yêu thích
    // Lưu ý: Hàm này vẫn giữ lại để tương thích với code cũ
    // Nhưng khuyến khích sử dụng updateUserPreferencesOnly thay thế
    // async updateUserPreferences(userId) {
    //     try {
    //         // Gọi updateUserPreferencesOnly để cập nhật preferences
    //         const preferences = await this.updateUserPreferencesOnly(userId);

    //         // Không train collaborative model ở đây nữa
    //         // Việc training sẽ được thực hiện bởi admin thông qua retrainModels

    //         return preferences;
    //     } catch (error) {
    //         console.error('Lỗi khi cập nhật preferences:', error);
    //         throw error;
    //     }
    // }

    // Tạo gợi ý cho user sử dụng Python ML
    async generateRecommendations(userId) {
        try {
            const userObjectId = new mongoose.Types.ObjectId(userId);

            // Đảm bảo lấy dữ liệu mới nhất của người dùng
            const user = await User.findById(userObjectId).populate('likedMovies');
            if (!user) {
                throw new Error('Không tìm thấy người dùng');
            }

            // Cập nhật preferences trước khi tạo recommendations
            await this.updateUserPreferencesOnly(userId);

            // Gọi Python script để tạo recommendations
            try {
                console.log('Đang chạy Python script để tạo gợi ý...');
                const output = await this.runPythonScript('generate_recommendations.py', [userId]);

                // Recommendations đã được lưu vào MongoDB bởi Python script
                // Lấy lại user để có recommendations mới nhất
                const updatedUser = await User.findById(userObjectId);
                return updatedUser.recommendations.movies;

            } catch (error) {
                console.error('Lỗi khi chạy Python ML:', error);

                // Fallback: Sử dụng phương pháp cũ nếu Python ML thất bại
                console.log('Sử dụng phương pháp gợi ý dự phòng...');

                // Lấy tất cả phim (trừ phim đã thích)
                const allMovies = await Movies.find({});
                const recommendations = [];
                const likedMovieIds = user.likedMovies.map(id => id.toString());

                for (const movie of allMovies) {
                    // Bỏ qua phim đã thích
                    if (likedMovieIds.includes(movie._id.toString())) continue;

                    let score = 0;
                    let reasons = [];

                    // 1. Tính điểm dựa trên preferences
                    if (user.preferences && Object.keys(user.preferences).length > 0) {
                        let preferenceScore = 0;
                        for (const [key, value] of Object.entries(movie.features || {})) {
                            if (key in user.preferences) {
                                preferenceScore += value * user.preferences[key];
                            }
                        }
                        score += preferenceScore;
                        if (preferenceScore > 0.3) {
                            reasons.push('Dựa trên lượt đánh giá của bạn');
                        }
                    }

                    // 2. Tính điểm dựa trên phim tương tự
                    for (const likedMovieId of likedMovieIds) {
                        const similarMovie = movie.similarMovies?.find(
                            sm => sm.movieId.toString() === likedMovieId
                        );
                        if (similarMovie) {
                            score += similarMovie.score;
                            reasons.push('Tương tự phim bạn đã thích');
                            break;
                        }
                    }

                    if (score > 0.2) {
                        recommendations.push({
                            movieId: movie._id,
                            score: score,
                            reason: reasons.join(', '),
                            timestamp: new Date()
                        });
                    }
                }

                recommendations.sort((a, b) => b.score - a.score);
                const topRecommendations = recommendations.slice(0, 6);

                // Lưu recommendations mới với thời gian cập nhật mới - đảm bảo thời gian UTC
                user.recommendations = {
                    movies: topRecommendations,
                    lastUpdated: new Date() // Đảm bảo đúng thời gian hiện tại
                };
                await user.save();

                return topRecommendations;
            }

        } catch (error) {
            console.error('Lỗi khi tạo gợi ý:', error);
            throw error;
        }
    }

    // Cập nhật recommendations cho tất cả users
    async updateAllUserRecommendations(forceAll = true) {
        try {
            console.log('|------------Bắt đầu cập nhật recommendations cho tất cả users------------|');
            const args = forceAll ? ['--force-all'] : [];

            const updatePromise = this.runPythonScript('update_all_recommendations.py', args);

            // Đặt timeout 10 phút cho việc cập nhật tất cả người dùng
            const updateResult = await Promise.race([
                updatePromise,
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Update all recommendations timeout after 10 minutes')), 600000)
                )
            ]);

            console.log('<-----------Đã cập nhật xong recommendations cho tất cả users------------>');
            return true;
        } catch (error) {
            console.error('Lỗi khi cập nhật recommendations cho tất cả users:', error);
            return false;
        }
    }

    // Train lại models
    async retrainModels() {
        try {
            // Train content-based model
            console.log('|------------Bắt đầu train content-based model------------|');
            const contentModelPromise = this.runPythonScript('train_content_based.py');

            // Đặt timeout 5 phút cho content-based model
            const contentModelResult = await Promise.race([
                contentModelPromise,
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Content model training timeout after 5 minutes')), 300000)
                )
            ]);

            console.log('<-----------Đã train xong content-based model------------>');

            // Train collaborative model
            console.log('|------------Bắt đầu train collaborative model------------|');
            const collaborativeModelPromise = this.runPythonScript('train_collaborative.py');

            // Đặt timeout 5 phút cho collaborative model
            const collaborativeModelResult = await Promise.race([
                collaborativeModelPromise,
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Collaborative model training timeout after 5 minutes')), 300000)
                )
            ]);

            console.log('<-----------Đã train xong collaborative model------------>');

            return true;
        } catch (error) {
            console.error('Lỗi khi train models:', error);
            return false;
        }
    }

    // Tạo gợi ý theo phương pháp legacy (không sử dụng ML)
    // 1. Phương pháp dựa trên quy tắc (Legacy):
    // Sử dụng các quy tắc cứng được lập trình sẵn
    // Tính điểm dựa trên các tiêu chí đơn giản:
    // Thể loại phù hợp: +0.1 điểm
    // Năm sản xuất tương tự: +0.1 điểm
    // Ngôn ngữ ưa thích: +0.1 điểm
    // Đánh giá cao (≥7): +0.1 điểm
    // Phim mới (trong 2 năm): +0.1 điểm
    // Không học từ dữ liệu, không cần huấn luyện mô hình

    // 2. Phương pháp ML:
    // Collaborative filtering (ALS): Học từ hành vi người dùng, tìm mối liên hệ ẩn
    // Content-based: Phân tích nội dung phim bằng TF-IDF, tìm phim tương tự
    // Cả hai đều yêu cầu huấn luyện mô hình phức tạp

    // 3. Ưu/nhược điểm:
    // Legacy: Đơn giản, dễ hiểu, không cần dữ liệu lớn, nhưng kém chính xác
    // ML: Chính xác hơn, cá nhân hóa tốt hơn, nhưng phức tạp và cần dữ liệu lớn
    // Phương pháp legacy có thể được sử dụng làm phương án dự phòng khi không có đủ dữ liệu cho các phương pháp ML hoặc khi hệ thống ML gặp sự cố.

    //     Nguyên lý hoạt động
    // 1. Thu thập dữ liệu đầu vào:
    // Lấy danh sách phim người dùng đã thích
    // Lấy tất cả phim trong hệ thống

    // 2. Xây dựng hồ sơ người dùng:
    // Tạo tập hợp thể loại phim yêu thích
    // Xác định ngôn ngữ ưa thích

    // 3. Tính điểm cho từng phim:
    // Thể loại phù hợp (+0.1 điểm):
    // Phim có thể loại trùng với thể loại yêu thích của người dùng
    // Năm sản xuất tương tự (+0.1 điểm):
    // Phim có năm sản xuất gần với phim người dùng đã thích (±5 năm)
    // Ngôn ngữ ưa thích (+0.1 điểm):
    // Phim có ngôn ngữ trùng với ngôn ngữ của phim người dùng đã thích
    // Đánh giá cao (+0.1 điểm):
    // Phim có điểm đánh giá từ 7 trở lên
    // Phim mới (+0.1 điểm):
    // Phim được sản xuất trong vòng 2 năm gần đây

    // 4. Sắp xếp và chọn kết quả:
    // Sắp xếp phim theo điểm số từ cao xuống thấp
    // Chọn 6 phim có điểm cao nhất

    async generateRecommendationsLegacy(userId) {
        try {
            const userObjectId = new mongoose.Types.ObjectId(userId);
            const user = await User.findById(userObjectId);
            if (!user) {
                throw new Error('Không tìm thấy người dùng');
            }

            // Lấy tất cả phim
            const allMovies = await Movies.find({});
            const recommendations = [];

            // Lấy danh sách phim đã thích
            const likedMovies = await Movies.find({
                _id: { $in: user.likedMovies }
            });

            // Tính điểm cho từng phim
            for (const movie of allMovies) {
                // Bỏ qua phim đã thích
                if (user.likedMovies.includes(movie._id)) continue;

                let score = 0;
                let reasons = [];

                // 1. Điểm dựa trên thể loại phim yêu thích
                const userCategories = new Set();
                for (const likedMovie of likedMovies) {
                    if (likedMovie.category) {
                        likedMovie.category.forEach(cat => userCategories.add(cat));
                    }
                }

                if (movie.category) {
                    for (const category of movie.category) {
                        if (userCategories.has(category)) {
                            score += 0.1;
                            reasons.push('Thể loại phù hợp');
                            break;
                        }
                    }
                }

                // 2. Điểm dựa trên năm sản xuất
                const recentLikedMovies = likedMovies.filter(m => Math.abs(m.year - movie.year) <= 5);
                if (recentLikedMovies.length > 0) {
                    score += 0.1;
                    reasons.push('Năm sản xuất tương tự');
                }

                // 3. Điểm dựa trên ngôn ngữ
                const userLanguages = new Set(likedMovies.map(m => m.language).filter(Boolean));
                if (userLanguages.has(movie.language)) {
                    score += 0.1;
                    reasons.push('Ngôn ngữ ưa thích');
                }

                // 4. Điểm dựa trên đánh giá cao
                if (movie.rate >= 7) {
                    score += 0.1;
                    reasons.push('Đánh giá cao');
                }

                // 5. Dựa trên phim mới
                if (movie.year >= new Date().getFullYear() - 2) {
                    score += 0.1;
                    reasons.push('Phim mới');
                }

                // Chỉ thêm phim có điểm > 0
                if (score > 0) {
                    recommendations.push({
                        movieId: movie._id,
                        score: score,
                        reason: [...new Set(reasons)].join(', '),
                        timestamp: new Date()
                    });
                }
            }

            // Sắp xếp và lấy top 10 phim
            recommendations.sort((a, b) => b.score - a.score);
            const topRecommendations = recommendations.slice(0, 6);

            // Lưu vào user
            user.recommendations = {
                movies: topRecommendations,
                lastUpdated: new Date()
            };
            await user.save();

            return topRecommendations;

        } catch (error) {
            console.error('Lỗi khi tạo gợi ý (legacy):', error);
            throw error;
        }
    }
}

export default new RecommendationService();