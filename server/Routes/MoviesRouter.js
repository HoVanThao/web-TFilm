import express from 'express'
import { admin, protect } from '../middlewares/authMiddleware.js';
import { createMovieReview, getMovieById, getMovies, getRandomMovies, getTopRatedMovies, importMovies } from '../Controllers/MoviesController.js';


const router = express.Router();

// ***************Public Routes***************
router.post("/import", importMovies);
router.get("/", getMovies);
router.get("/:movieId", getMovieById);
router.get("/rated/top", getTopRatedMovies);
router.get("/random/all", getRandomMovies);

// ***************Private Routes***************
router.post("/:movieId/reviews", protect, createMovieReview);

// ***************Admin Routes***************



export default router;