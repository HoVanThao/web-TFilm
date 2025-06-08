import mongoose from 'mongoose';
import Movies from '../Models/MoviesModel.js';
import User from '../Models/UserModels.js';
import dotenv from 'dotenv';

// Load biến môi trường
dotenv.config();

// Hàm chính để chạy migration
const runMigration = async () => {
    try {
        // Kết nối database
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Đã kết nối MongoDB thành công');

        // Reset features và similarMovies của tất cả phim
        const moviesResult = await Movies.updateMany(
            {},
            {
                $set: {
                    features: {},
                    similarMovies: []
                }
            }
        );
        console.log(`Đã cập nhật ${moviesResult.modifiedCount} phim`);

        // Reset preferences và recommendations của tất cả users
        const usersResult = await User.updateMany(
            {},
            {
                $set: {
                    preferences: {},
                    recommendations: {
                        movies: [],
                        lastUpdated: null
                    }
                }
            }
        );
        console.log(`Đã cập nhật ${usersResult.modifiedCount} users`);

    } catch (error) {
        console.error('Lỗi:', error.message);
    } finally {
        // Đóng kết nối
        await mongoose.connection.close();
        process.exit();
    }
};

// Chạy migration
runMigration(); 