// controllers/categoryController.js
import Category from "../models/Category.js";
import ArtisanProfile from "../models/ArtisanProfile.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        // const image = req.file ? req.file.path : null;
        const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

        const category = new Category({ name, image });
        await category.save();

        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const update = { name };

        if (req.file) {
            update.image = req.file.path;
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            update,
            { new: true }
        );
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCategoriesWithArtisanCount = async (req, res) => {
    try {
        const categories = await Category.find();

        const results = await Promise.all(
            categories.map(async (cat) => {
                const count = await ArtisanProfile.countDocuments({
                    jobType: cat._id,
                });
                return {
                    _id: cat._id,
                    name: cat.name,
                    image: cat.image,
                    artisanCount: count,
                };
            })
        );

        res.json(results);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
