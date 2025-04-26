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
            type: String,
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
        reviews: [reviewSchema],
        casts: [
            {

                name: { type: String, required: true },
                image: { type: String, required: true },

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