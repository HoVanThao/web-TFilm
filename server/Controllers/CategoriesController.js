import Categories from "../Models/CategoriesModel.js";
import asyncHandler from "express-async-handler";

const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Categories.find({});
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
);