import express from 'express'
import { addLikedMovie, changeUserPassword, deleteLikedMovies, deleteUser, deleteUserProfile, getLikedMovies, getUsers, loginUser, registerUser, updateUserProfile } from '../Controllers/UserController.js'
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ***************Public Routes***************
router.post("/", registerUser);
router.post("/login", loginUser);

// ***************Private Routes***************
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMovies);
router.post("/favorites", protect, addLikedMovie);
router.delete("/favorites", protect, deleteLikedMovies);

// ***************Admin Routes***************
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);


export default router;