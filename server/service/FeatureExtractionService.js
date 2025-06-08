//1. Trích xuất đặc trưng từ phim (thể loại, diễn viên)
//2. Tính toán điểm tương đồng giữa các phim
//3. Xử lý dữ liệu từ đánh giá và lượt thích của người dùng

// server/services/FeatureExtractionService.js
import Movies from '../Models/MoviesModel.js';

class FeatureExtractionService {
    // Hàm chuyển đổi tiếng Việt có dấu thành không dấu
    removeVietnameseTones(str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Xóa các ký tự đặc biệt
        str = str.replace(/[^a-z0-9\s]/g, "");
        // Xóa khoảng trắng thừa
        str = str.replace(/\s+/g, "_");
        return str;
    }

    // Hàm tính toán đặc trưng cho một bộ phim
    async extractMovieFeatures(movie) {
        const features = {};

        // 1. Xử lý thể loại
        movie.category.forEach(category => {
            if (typeof category === 'string') {
                const key = `category_${this.removeVietnameseTones(category)}`;
                features[key] = 1.0;
            } else {
                console.warn(`Bỏ qua category không hợp lệ cho phim ${movie.name}:`, category);
            }
        });

        // 2. Xử lý diễn viên
        movie.casts.forEach(cast => {
            if (typeof cast === 'string') {
                const key = `actor_${this.removeVietnameseTones(cast)}`;
                features[key] = 1.0;
            } else if (typeof cast.name === 'string') {
                const key = `actor_${this.removeVietnameseTones(cast.name)}`;
                features[key] = 1.0;
            } else {
                console.warn(`Bỏ qua cast không hợp lệ cho phim ${movie.name}:`, cast);
            }
        });

        // 3. Xử lý thập kỷ
        const year = parseInt(movie.year);
        const decade = Math.floor(year / 10) * 10;
        features[`decade_${decade}`] = 1.0;

        // 4. Xử lý ngôn ngữ
        if (typeof movie.language === 'string') {
            const key = `language_${this.removeVietnameseTones(movie.language)}`;
            features[key] = 1.0;
        } else {
            console.warn(`Ngôn ngữ không hợp lệ cho phim ${movie.name}:`, movie.language);
        }

        // 5. Xử lý thời lượng
        const duration = parseInt(movie.time);
        let durationCategory;
        if (duration <= 90) durationCategory = 'short';
        else if (duration <= 150) durationCategory = 'medium';
        else durationCategory = 'long';
        features[`duration_${durationCategory}`] = 1.0;

        return features;
    }

    // Hàm tính điểm tương đồng giữa hai bộ phim
    calculateSimilarity(features1, features2) {
        let dotProduct = 0;    // Tích vô hướng
        let norm1 = 0;         // Độ dài vector 1
        let norm2 = 0;         // Độ dài vector 2

        // Tính tích vô hướng và độ dài vector 1
        for (const [key, value1] of Object.entries(features1)) {
            norm1 += value1 * value1;
            if (key in features2) {
                dotProduct += value1 * features2[key];
            }
        }

        // Tính độ dài vector 2
        for (const value2 of Object.values(features2)) {
            norm2 += value2 * value2;
        }

        // Công thức cosine similarity:
        // cos(θ) = (a·b)/(||a||·||b||)
        if (norm1 === 0 || norm2 === 0) return 0;
        return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    }

    // Cập nhật đặc trưng cho tất cả phim
    async updateAllMoviesFeatures() {
        try {
            console.log('Bắt đầu cập nhật đặc trưng cho tất cả phim...');
            const movies = await Movies.find({});
            let updatedCount = 0;

            for (const movie of movies) {
                try {
                    const features = await this.extractMovieFeatures(movie);
                    movie.features = features;  // Lưu dưới dạng object
                    await movie.save();
                    console.log(`Đã cập nhật đặc trưng cho phim: ${movie.name}`);
                    updatedCount++;
                } catch (movieError) {
                    console.error(`Lỗi khi cập nhật phim ${movie.name}:`, movieError);
                }
            }

            console.log(`Hoàn thành cập nhật đặc trưng cho ${updatedCount}/${movies.length} phim`);
            return {
                success: true,
                message: `Đã cập nhật features cho ${updatedCount}/${movies.length} phim`
            };
        } catch (error) {
            console.error('Lỗi khi cập nhật đặc trưng phim:', error);
            return {
                success: false,
                message: "Lỗi khi cập nhật features",
                error: error.message
            };
        }
    }

    // Cập nhật danh sách phim tương tự
    async updateSimilarMovies() {
        try {
            console.log('Bắt đầu cập nhật danh sách phim tương tự...');
            const movies = await Movies.find({});
            let updatedCount = 0;

            for (const movie1 of movies) {
                try {
                    if (!movie1.features || Object.keys(movie1.features).length === 0) {
                        console.log(`Bỏ qua phim ${movie1.name} vì không có features`);
                        continue;
                    }

                    const similarMovies = [];

                    for (const movie2 of movies) {
                        if (movie1._id.equals(movie2._id)) continue;
                        if (!movie2.features || Object.keys(movie2.features).length === 0) continue;

                        const similarity = this.calculateSimilarity(
                            movie1.features,
                            movie2.features
                        );

                        if (similarity > 0.2) { // Ngưỡng tương đồng tối thiểu
                            similarMovies.push({
                                movieId: movie2._id,
                                score: similarity,
                                lastUpdated: new Date()
                            });
                        }
                    }

                    // Sắp xếp và lấy top 10 phim tương tự nhất
                    similarMovies.sort((a, b) => b.score - a.score);
                    movie1.similarMovies = similarMovies.slice(0, 10);
                    await movie1.save();
                    console.log(`Đã cập nhật phim tương tự cho: ${movie1.name}`);
                    updatedCount++;
                } catch (movieError) {
                    console.error(`Lỗi khi cập nhật phim tương tự ${movie1.name}:`, movieError);
                }
            }

            console.log(`Hoàn thành cập nhật danh sách phim tương tự cho ${updatedCount}/${movies.length} phim`);
            return {
                success: true,
                message: `Đã cập nhật phim tương tự cho ${updatedCount}/${movies.length} phim`
            };
        } catch (error) {
            console.error('Lỗi khi cập nhật phim tương tự:', error);
            return {
                success: false,
                message: "Lỗi khi cập nhật phim tương tự",
                error: error.message
            };
        }
    }
}

export default new FeatureExtractionService();

