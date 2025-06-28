import express from "express";
import upload from "../middlewares/upload.js";
import {
    approveArtisan,
    createArtisanProfile,
    getAllArtisans,
    getArtisanById,
    getArtisanProfile,
    updateArtisanal,
} from "../controllers/artisanController.js";

const router = express.Router();

// Upload single or multiple images
// router.post("/", upload.array("portfolio", 5), createArtisanProfile);
router.post("/", upload.array("portfolio"), createArtisanProfile);

// router.post("/", createArtisanProfile);
router.get("/", getAllArtisans);
router.get("/:id", getArtisanById);
router.get("/me/:id", getArtisanProfile);
router.patch("/approve-artisan/:id", approveArtisan);

router.put("/me/:userId", updateArtisanal);

export default router;
