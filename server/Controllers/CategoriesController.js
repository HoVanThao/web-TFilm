import Categories from "../Models/CategoriesModel.js";
import asyncHandler from "express-async-handler";


// ***************Public Routes***************

// @desc get all categories
// @route GET /api/categories
// @access Public

const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Categories.find({});
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
);

// ***************Admin Routes***************

// @desc create new category
// @route POST /api/categories
// @access Private/Admin

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { title } = req.body;
        const category = new Categories({ title, });
        const createCategory = await category.save();
        res.status(201).json(createCategory);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc update category
// @route PUT /api/categories/:id
// @access Private/Admin

const updatedCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id);

        if (category) {
            category.title = req.body.title || category.title;
            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: "Category not found" })
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc delete category
// @route DELETE /api/categories/:id
// @access Private/Admin

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Categories.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await category.deleteOne();
        res.json({ message: "category removed" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export { getCategories, updatedCategory, createCategory, deleteCategory };
