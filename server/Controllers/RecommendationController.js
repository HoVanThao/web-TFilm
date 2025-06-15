// server/Controllers/RecommendationController.js
import asyncHandler from 'express-async-handler';
import RecommendationService from '../service/RecommendationService.js';
import User from '../Models/UserModels.js';
import Movies from '../Models/MoviesModel.js';
import FeatureExtractionService from '../service/FeatureExtractionService.js';


// Hệ thống recommendation đã sẵn sàng với:
// Content-based filtering (dựa trên đặc trưng phim)
// Collaborative filtering đơn giản (dựa trên likes và reviews)
// Cập nhật tự động sau 24h
// Content-based filtering: Dựa trên nội dung và đặc trưng của phim
// Collaborative filtering: Dựa trên tương tác của người dùng (likes và reviews)

// @desc    Lấy recommendations cho user
// @route   GET /api/recommendations
// @access  Private
const getRecommendations = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        // Lấy thông tin user
        const user = await User.findById(userId);

        // Lấy thời gian hiện tại
        const currentTime = new Date();

        // Kiểm tra xem user đã có recommendations chưa
        let needsUpdate = !user.recommendations?.movies || user.recommendations.movies.length === 0;

        if (!needsUpdate && user.recommendations?.lastUpdated && user.updatedAt) {
            // Convert to timestamps for easier comparison
            const lastUpdateTime = user.recommendations.lastUpdated.getTime();
            const userUpdateTime = user.updatedAt.getTime();

            // Kiểm tra thời gian cập nhật
            const lastRecommendationsUpdate = user.recommendations.lastUpdated;
            const tenSecondsAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

            // Cập nhật recommendations nếu đã quá thời gian quy định từ lần cập nhật cuối
            if (!lastRecommendationsUpdate || lastRecommendationsUpdate < tenSecondsAgo) {
                needsUpdate = true;
                console.log('|------------Recommendations cũ hơn thời gian quy định, cần cập nhật lại------------|');
            }
            // Kiểm tra dựa trên thời gian cập nhật user và thời điểm cuối cùng recommendations được cập nhật
            else if (userUpdateTime > lastUpdateTime) {
                needsUpdate = true;
                console.log('|------------Người dùng đã thay đổi, cần cập nhật lại recommendations------------|');
            }
            // Kiểm tra xem người dùng có đánh giá phim mới không
            else {
                // Tìm kiếm đánh giá phim mới được thêm sau lần cập nhật gợi ý cuối cùng
                const hasNewRatings = await Movies.exists({
                    'reviews.userId': userId,
                    'reviews.createdAt': { $gt: lastRecommendationsUpdate }
                });

                if (hasNewRatings) {
                    needsUpdate = true;
                    console.log('|------------Người dùng đã đánh giá phim mới, cần cập nhật lại recommendations|------------');
                }
            }
        }

        if (needsUpdate) {
            console.log('|------------Bắt đầu cập nhật recommendations cho user------------|');

            // Xóa recommendations cũ nếu có
            if (user.recommendations?.movies) {
                user.recommendations.movies = [];
                await user.save();
            }

            try {
                // Kiểm tra xem user đã có tương tác nào chưa (phim yêu thích hoặc đánh giá)
                const hasLikedMovies = user.likedMovies && user.likedMovies.length > 0;
                const hasReviews = await Movies.exists({ 'reviews.userId': userId });

                if (hasLikedMovies || hasReviews) {
                    // Nếu đã có tương tác, dùng ML để gợi ý
                    await RecommendationService.generateRecommendations(userId);
                    console.log('<-----------Đã tạo recommendations bằng ML cho user----------->');
                } else {
                    // Nếu chưa có tương tác, dùng phương pháp legacy
                    await RecommendationService.generateRecommendationsLegacy(userId);
                    console.log('<-----------Đã tạo recommendations bằng phương pháp truyền thống----------->');
                }
            } catch (mlError) {
                console.error('<-----------Lỗi khi tạo gợi ý:', mlError);
                // Fallback: Sử dụng phương pháp cũ
                await RecommendationService.generateRecommendationsLegacy(userId);
                console.log('<-----------Đã fallback về phương pháp cũ----------->');
            }
        }

        // Lấy recommendations đã được populate
        const recommendations = await User.findById(userId)
            .populate({
                path: 'recommendations.movies.movieId',
                // Chỉ lấy các trường cần thiết
                // select: 'name posterUrl year genres overview' 
            })
            .select('recommendations')
            .exec();

        if (!recommendations?.recommendations?.movies) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy recommendations'
            });
        }

        res.json({
            success: true,
            data: recommendations.recommendations.movies,
            lastUpdated: recommendations.recommendations.lastUpdated
        });
    } catch (error) {
        console.error('Lỗi khi lấy recommendations:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách phim gợi ý',
            error: error.message
        });
    }
});


// @desc    Admin: Cập nhật features cho tất cả phim
// @route   POST /api/recommendations/update-features
// @access  Admin
const trainModelsAdminController = asyncHandler(async (req, res) => {
    // Gửi phản hồi ngay lập tức để tránh timeout ở phía client
    res.json({
        success: true,
        message: 'Đã bắt đầu quá trình train models và cập nhật gợi ý cho tất cả người dùng, quá trình này sẽ diễn ra ở background'
    });

    try {
        // Bắt đầu quá trình train ở background
        console.log('|------------Bắt đầu quá trình train models------------|');

        // // Cập nhật features cho tất cả phim
        await FeatureExtractionService.updateAllMoviesFeatures();
        console.log('Đã cập nhật features cho tất cả phim');

        // // Cập nhật similar movies
        await FeatureExtractionService.updateSimilarMovies();
        console.log('Đã cập nhật similar movies cho tất cả phim');

        // Train lại models
        const modelTrainingResult = await RecommendationService.retrainModels();
        if (modelTrainingResult) {
            console.log('Đã train lại models thành công');

            // Cập nhật recommendations cho tất cả users
            console.log('|------------Bắt đầu cập nhật gợi ý cho tất cả người dùng------------|');
            await RecommendationService.updateAllUserRecommendations(true);
            console.log('<-----------Đã cập nhật gợi ý cho tất cả người dùng thành công------------>');
        } else {
            console.error('Lỗi khi train lại models');
        }

    } catch (error) {
        console.error('Lỗi khi train lại models:', error);
    }
});


export {
    getRecommendations,
    trainModelsAdminController,
};