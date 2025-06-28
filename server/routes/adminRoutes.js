import express from "express";
import { getAdminStats } from "../controllers/adminController.js";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, isAdmin, getAdminStats);

export default router;
