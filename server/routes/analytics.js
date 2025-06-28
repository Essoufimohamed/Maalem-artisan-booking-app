// routes/analytics.js
import express from "express";
import { getDashboardStats } from "../controllers/analyticsController.js";
// import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.get("/", verifyAdmin, getDashboardStats);
router.get("/", getDashboardStats);
export default router;
