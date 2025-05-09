import express from 'express'
import { admin, protect } from '../middlewares/authMiddleware.js';
import { createMovieReview, deteleAllMovie, deleteMovie, getMovieById, getMovies, getRandomMovies, getTopRatedMovies, importMovies, updateMovie, createMovie, getHomePageData, createSeries, updateSeries } from '../Controllers/MoviesController.js';


const router = express.Router();

// ***************Public Routes***************
router.post("/import", importMovies);
router.get("/", getMovies);
router.get('/home-page-data', getHomePageData);
router.get("/:movieId", getMovieById);
router.get("/rated/top", getTopRatedMovies);
router.get("/random/all", getRandomMovies);


// ***************Private Routes***************
router.post("/:movieId/reviews", protect, createMovieReview);

// ***************Admin Routes***************
router.put("/:movieId", protect, admin, updateMovie);
router.delete("/:movieId", protect, admin, deleteMovie);
router.delete("/", protect, admin, deteleAllMovie);
router.post("/", protect, admin, createMovie);
router.post("/series", protect, admin, createSeries);
router.put("/series/:movieId", protect, admin, updateSeries);

export default router;