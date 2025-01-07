import express from 'express'
import { changeUserPassword, deleteUserProfile, getLikedMovies, loginUser, registerUser, updateUserProfile } from '../Controllers/UserController.js'
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ***************Public Routes***************
router.post("/", registerUser);
router.post("/login", loginUser);

// ***************Private Routes***************
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMovies);

export default router;