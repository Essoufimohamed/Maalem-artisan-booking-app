// routes/categoryRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getCategoriesWithArtisanCount,
} from "../controllers/categoryController.js";

const router = express.Router();

// Setup multer storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
        const dir = "uploads/categories";
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createCategory);
router.get("/", getAllCategories);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

router.get("/with-count", getCategoriesWithArtisanCount);

export default router;
