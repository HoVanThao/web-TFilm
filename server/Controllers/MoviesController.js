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

// const getMovies = asyncHandler(async (req, res) => {
//     try {
//         const { category, language, rate, year, typeFilm, search } = req.query;
//         let query = {
//             ...(category && { category }),
//             ...(language && { language }),
//             ...(rate && { rate }),
//             ...(year && { year }),
//             ...(typeFilm && { typeFilm }),
//             ...(search && { name: { $regex: search, $options: "i" } }),
//         }

//         const page = Number(req.query.pageNumber) || 1;
//         const limit = 15;
//         const skip = (page - 1) * limit;
//         const movies = await Movie.find(query)
//             .sort({ year: -1, _id: -1 })
//             .skip(skip)
//             .limit(limit);

//         const count = await Movie.countDocuments(query);

//         res.json({
//             movies,
//             page,
//             pages: Math.ceil(count / limit),
//             totalMovies: count,
//         });

//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// })

const getMovies = asyncHandler(async (req, res) => {
    try {
        const { category, language, rate, year, typeFilm, search } = req.query;

        // Xây dựng query object
        let query = {};

        // Xử lý category (nếu có)
        if (category) {
            query.category = { $in: [category] }; // Tìm các phim có category chứa giá trị được truyền vào
        }

        // Thêm các điều kiện khác
        if (language) query.language = language;
        if (rate) query.rate = rate;
        if (year) query.year = year;
        if (typeFilm) query.typeFilm = typeFilm;
        // if (search) query.name = { $regex: search, $options: "i" };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { nameVn: { $regex: search, $options: 'i' } },
            ];
        }

        // Phân trang
        const page = Number(req.query.pageNumber) || 1;
        const limit = 15;
        const skip = (page - 1) * limit;

        // Thực hiện truy vấn
        const movies = await Movie.find(query)
            .sort({ year: -1, _id: -1 })
            .skip(skip)
            .limit(limit);

        const count = await Movie.countDocuments(query);

        // Thống kê số lượng phim lẻ (single) và phim bộ (series)
        const stats = await Movie.aggregate([
            { $match: query }, // Áp dụng cùng query tìm kiếm
            {
                $group: {
                    _id: "$typeFilm", // Nhóm theo typeFilm
                    count: { $sum: 1 } // Đếm số lượng
                }
            }
        ]);

        // Chuyển kết quả aggregation thành object dễ đọc
        const typeFilmStats = {
            single: stats.find(stat => stat._id === "single")?.count || 0,
            series: stats.find(stat => stat._id === "series")?.count || 0
        };

        res.json({
            movies,
            page,
            pages: Math.ceil(count / limit),
            totalMovies: count,
            typeFilmStats, // Trả về số lượng phim lẻ và phim bộ
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

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
        const movies = await Movie.find({}).sort({ createdAt: -1, rate: -1 });
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
        ]).sort({ createdAt: -1, rate: -1 });
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// const getHomePageData = asyncHandler(async (req, res) => {
//     try {
//         // Sử dụng Promise.all để chạy song song các truy vấn
//         const [
//             randomMovies,
//             topRatedMovies,
//             allMovies,
//             cinemaMovies,
//             singleMovies,
//             seriesMovies,
//             animeMovies
//         ] = await Promise.all([
//             // Lấy phim ngẫu nhiên
//             Movie.aggregate([{ $sample: { size: 16 } }]).sort({ createdAt: -1, rate: -1 }),

//             // Lấy phim đánh giá cao
//             Movie.find({}).sort({ rate: -1, createdAt: -1 }).limit(16),

//             // Lấy tất cả phim (cho banner)
//             Movie.find({}).sort({ year: -1, _id: -1 }).limit(16),

//             // Lấy phim chiếu rạp
//             Movie.find({ category: "Chiếu rạp" }).sort({ year: -1, _id: -1 }).limit(16),

//             // Lấy phim lẻ
//             Movie.find({ typeFilm: "single" }).sort({ year: -1, _id: -1 }).limit(16),

//             // Lấy phim bộ
//             Movie.find({ typeFilm: "series" }).sort({ year: -1, _id: -1 }).limit(16),

//             // Lấy anime
//             Movie.find({ category: "Anime" }).sort({ year: -1, _id: -1 }).limit(16)
//         ]);

//         res.json({
//             randomMovies,
//             topRatedMovies,
//             allMovies,
//             cinemaMovies,
//             singleMovies,
//             seriesMovies,
//             animeMovies
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });


// ***************Private Routes controller***************

const getHomePageData = asyncHandler(async (req, res) => {
    try {
        // Sử dụng Promise.all để chạy song song các truy vấn
        const [
            randomMovies,
            topRatedMovies,
            allMovies,
            cinemaMovies,
            singleMovies,
            seriesMovies,
            animeMovies
        ] = await Promise.all([
            // Lấy phim ngẫu nhiên
            Movie.aggregate([{ $sample: { size: 16 } }]).sort({ createdAt: -1, rate: -1 }),

            // Lấy phim đánh giá cao
            Movie.find({}).sort({ rate: -1, createdAt: -1 }).limit(16),

            // Lấy tất cả phim (cho banner)
            Movie.find({}).sort({ year: -1, _id: -1 }).limit(10),

            // Lấy phim chiếu rạp (category chứa "Chiếu rạp")
            Movie.find({ category: { $in: ["Chiếu Rạp"] } }).sort({ year: -1, _id: -1 }).limit(10),

            // Lấy phim lẻ
            Movie.find({ typeFilm: "single" }).sort({ year: -1, _id: -1 }).limit(16),

            // Lấy phim bộ
            Movie.find({ typeFilm: "series" }).sort({ year: -1, _id: -1 }).limit(16),

            // Lấy anime (category chứa "Anime")
            Movie.find({ category: { $in: ["Anime"] } }).sort({ year: -1, _id: -1 }).limit(10)
        ]);

        res.json({
            randomMovies,
            topRatedMovies,
            allMovies,
            cinemaMovies,
            singleMovies,
            seriesMovies,
            animeMovies
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

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
                throw new Error("Bạn đã review bộ phim này!")
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

// ***************Private Routes - admin - controller***************

const updateMovie = asyncHandler(async (req, res) => {
    try {
        const {
            nameVn,
            name,
            desc,
            image,
            titleImage,
            category,
            language,
            year,
            time,
            video,
            rate,
            numberOfReviews,
            casts,
            typeFilm,
            imdbRating,
        } = req.body;

        const movie = await Movie.findById(req.params.movieId);

        if (movie) {
            movie.nameVn = nameVn || movie.nameVn;
            movie.name = name || movie.name;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.rate = rate || movie.rate;
            movie.number0fReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.time = time || movie.time;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.video = video || movie.video;
            movie.casts = casts || movie.casts;
            movie.typeFilm = typeFilm || movie.typeFilm;
            movie.imdbRating = imdbRating || movie.imdbRating;

            const updateMovie = await movie.save();
            res.status(201).json(updateMovie);
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const createMovie = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            nameVn,
            desc,
            image,
            titleImage,
            category,
            language,
            year,
            time,
            video,
            rate,
            numberOfReviews,
            casts,
            typeFilm,
            imdbRating,
        } = req.body;

        const movie = new Movie({
            name,
            nameVn,
            desc,
            image,
            titleImage,
            category,
            language,
            year,
            time,
            video,
            rate,
            numberOfReviews,
            casts,
            typeFilm,
            imdbRating,
            userId: req.user._id,
        })

        if (!movie) {
            res.status(400).json("Invalid movie data");
        }

        const createMovie = await movie.save();
        res.status(201).json(createMovie);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const createSeries = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            nameVn,
            desc,
            image,
            titleImage,
            category,
            language,
            year,
            time,
            video,
            rate,
            numberOfReviews,
            casts,
            imdbRating,
            typeFilm,
            filmParts,
        } = req.body;

        const movie = new Movie({
            name,
            nameVn,
            desc,
            image,
            titleImage,
            category,
            language,
            year,
            time,
            video,
            rate,
            numberOfReviews,
            casts,
            imdbRating,
            typeFilm,
            filmParts,
            userId: req.user._id,
        });

        if (!movie) {
            res.status(400).json("Invalid movie data");
        }

        const createdSeries = await movie.save();
        res.status(201).json(createdSeries);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const updateSeries = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            nameVn,
            desc,
            image,
            titleImage,
            category,
            language,
            year,
            time,
            rate,
            numberOfReviews,
            casts,
            imdbRating,
            typeFilm,
            filmParts,
        } = req.body;

        const movieId = req.params.movieId;

        const movie = await Movie.findById(movieId);

        if (!movie) {
            return res.status(404).json({ message: "Series not found" });
        }

        movie.name = name || movie.name;
        movie.nameVn = nameVn || movie.nameVn;
        movie.desc = desc || movie.desc;
        movie.image = image || movie.image;
        movie.titleImage = titleImage || movie.titleImage;
        movie.category = category || movie.category;
        movie.language = language || movie.language;
        movie.year = year || movie.year;
        movie.time = time || movie.time;
        movie.rate = rate || movie.rate;
        movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
        movie.casts = casts || movie.casts;
        movie.imdbRating = imdbRating || movie.imdbRating;
        movie.typeFilm = typeFilm || movie.typeFilm;
        movie.filmParts = filmParts || movie.filmParts;

        const updatedSeries = await movie.save();
        res.status(200).json(updatedSeries);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const deleteMovie = asyncHandler(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        await movie.deleteOne();
        res.json({ message: "Movie removed" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const deteleAllMovie = asyncHandler(async (req, res) => {
    try {
        await Movie.deleteMany({});
        res.json({ message: "detele all Movies" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { importMovies, getMovies, getMovieById, getTopRatedMovies, getRandomMovies, createMovieReview, updateMovie, deleteMovie, deteleAllMovie, createMovie, getHomePageData, createSeries, updateSeries };

