import mongoose from "mongoose";


const reviewSchema = mongoose.Schema(
    {
        userName: { type: String, required: true },
        userImage: { type: String },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },
        // Thêm các trường mới
        // impactScore: Mức độ ảnh hưởng của đánh giá này đến recommendations
        impactScore: {
            type: Number,
            default: 1.0
        },
        // processedByML: Đánh dấu review đã được xử lý bởi hệ thống gợi ý chưa
        processedByML: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);


const moviesSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        nameVn: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        titleImage: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: [String],
            required: true
        },
        language: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        video: {
            type: String,
            // required: true
        },
        rate: {
            type: Number,
            required: true,
            default: 0
        },
        numberOfReviews: {
            type: Number,
            required: true,
            default: 0
        },
        imdbRating: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },
        typeFilm: {
            type: String,
            required: true,
            enum: ["single", "series"], // Single là phim lẻ, Series là phim bộ
        },
        filmParts: [
            {
                partNumber: { type: Number, required: true }, // Ví dụ: Phần 1, Phần 2, Phần 3...
                title: { type: String, required: true }, // Tên phần phim
                numberOfEpisodes: { type: Number, required: true }, // Số lượng tập của mỗi phần
                episodes: [
                    {
                        episodeNumber: { type: Number, required: true }, // Tập số 1, 2, 3...
                        title: { type: String, required: true },
                        videoUrl: { type: String }, // VideoUrl của từng tập
                        duration: { type: Number, required: true }, // Thời gian của tập phim
                        desc: { type: String }, // Mô tả tập phim
                    }
                ]
            }
        ],
        // Thêm các trường mới
        features: {
            type: Object,
            default: {}
        },
        similarMovies: [{
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movies"
            },
            score: Number, // Điểm số tương đồng (0-1)
            lastUpdated: Date // Thời điểm cập nhật
        }],
        reviews: [reviewSchema],
        casts: [
            {
                name: { type: String, required: true },
                image: {
                    type: String,
                    // required: true 
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

// Middleware để loại bỏ filmParts nếu là phim lẻ
moviesSchema.pre('save', function (next) {
    if (this.typeFilm === 'single') {
        this.filmParts = undefined; // Xóa filmParts nếu là phim lẻ
    }
    next();
});

export default mongoose.model("Movies", moviesSchema);