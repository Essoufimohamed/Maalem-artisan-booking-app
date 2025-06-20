import express from "express";
import upload from "../uploads/upload.js";
import {
    createArtisanProfile,
    getAllArtisans,
    getArtisanById,
} from "../controllers/artisanController.js";

const router = express.Router();

// Upload single or multiple images
router.post("/", upload.array("portfolio", 5), createArtisanProfile);

// router.post("/", createArtisanProfile);
router.get("/", getAllArtisans);
router.get("/:id", getArtisanById);

export default router;
