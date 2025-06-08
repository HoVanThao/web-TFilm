import mongoose from "mongoose";
import Movies from '../Models/MoviesModel.js';
import User from '../Models/UserModels.js';
import dotenv from 'dotenv';

dotenv.config();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Đã kết nối với MongoDB...'))
    .catch(err => console.error('Không thể kết nối với MongoDB...', err));

async function migrateData() {
    try {
        console.log('Bắt đầu quá trình migration...');

        // 1. Cập nhật Collection Movies
        console.log('Đang cập nhật collection Movies...');
        const moviesResult = await Movies.updateMany(
            {},  // Cập nhật tất cả documents
            {
                $set: {
                    features: {},
                    similarMovies: [],
                    'reviews.$[].impactScore': 1.0,
                    'reviews.$[].processedByML': false
                }
            }
        );
        console.log(`Đã cập nhật ${moviesResult.modifiedCount} bộ phim`);

        // 2. Cập nhật Collection Users
        console.log('Đang cập nhật collection Users...');
        const usersResult = await User.updateMany(
            {},
            {
                $set: {
                    preferences: {},
                    recommendations: {
                        movies: [],
                        lastUpdated: new Date()
                    }
                }
            }
        );
        console.log(`Đã cập nhật ${usersResult.modifiedCount} người dùng`);

        console.log('Hoàn thành quá trình migration!');
    } catch (error) {
        console.error('Lỗi trong quá trình migration:', error);
    } finally {
        // Đóng kết nối MongoDB
        await mongoose.connection.close();
        console.log('Đã đóng kết nối MongoDB');
        process.exit(0);
    }
}

// Chạy migration
migrateData();
