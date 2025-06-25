// server/Routes/RecommendationRoutes.js
import express from 'express';
import { protect, admin } from '../middlewares/authMiddleware.js';
import {
    getRecommendations,
    trainModelsAdminController,
} from '../Controllers/RecommendationController.js';

const router = express.Router();

// Routes cho user
router.get('/:movieId', protect, getRecommendations);

// Routes cho admin
router.post('/update-features', protect, admin, trainModelsAdminController); // Train lại models

export default router;