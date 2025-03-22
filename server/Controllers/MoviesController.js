import asyncHandler from "express-async-handler";
import Movie from "../Models/MoviesModel.js"
import { MoviesData } from "../Data/MovieData.js"


// ***************Public Routes***************

const importMovies = asyncHandler(async (req, res) => {
    // trước tiên chúng ta đảm bảo bảng Movies của mình trống bằng cách xóa tất cả các tài liệu
    await Movie.deleteMany({});
    // sau đó chúng ta chèn tất cả các phim từ MoviesData
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies)
})

const getMovies = asyncHandler(async (req, res) => {
    try {
        const { category, time, language, rate, year, search } = req.query;
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: "i" } }),
        }

        const page = Number(req.query.pageNumber) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const movies = await Movie.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);

        const count = await Movie.countDocuments(query);

        res.json({
            movies,
            page,
            pages: Math.ceil(count / limit),
            totalMovies: count,
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

const getMovieById = asyncHandler(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404);
            throw new Error("Phim không tồn tại");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.find({}).sort({ rate: -1 });
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.aggregate([
            {
                $sample: { size: 16 }
            }
        ]);
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


// ***************Private Routes - admin - controller***************

const createMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const movie = await Movie.findById(req.params.movieId);

        if (movie) {
            const alreadyReviewed = movie.reviews.find(
                (r) => {
                    return r.userId.toString() === req.user._id.toString();
                }
            );

            if (alreadyReviewed) {
                res.status(400);
                throw new Error("Bạn đã review bộ phim nàyyy!")
            }

            const review = {
                userName: req.user.fullName,
                userId: req.user._id,
                userImage: req.user.image,
                rating: Number(rating),
                comment,
            }


            movie.reviews.push(review);
            movie.numberOfReviews = movie.reviews.length;
            movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;

            await movie.save();

            res.status(201).json({ message: "Review đã được tạo" });
        } else {
            res.status(404);
            throw new Error("Bộ phim không tồn tại!");
        }


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



export { importMovies, getMovies, getMovieById, getTopRatedMovies, getRandomMovies, createMovieReview };