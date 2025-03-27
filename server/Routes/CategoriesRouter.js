import express from 'express'
import { admin, protect } from '../middlewares/authMiddleware.js';
import * as categoriesController from "../Controllers/CategoriesController.js"

const router = express.Router();

// ******************** PUBLIC ROUTER ***************************
router.get("/", categoriesController.getCategories);

// ******************** Admin ROUTER ***************************
router.post("/", protect, admin, categoriesController.createCategory);
router.put("/:id", protect, admin, categoriesController.updatedCategory);
router.delete("/:id", protect, admin, categoriesController.deleteCategory);


export default router;