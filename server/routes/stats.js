// import express from "express";
// import { getArtisanRegistrations } from "../controllers/artisanStatsController.js";
// import { getAdminStats } from "../controllers/adminController.js";

// const router = express.Router();

// router.get("/artisan-registrations", getArtisanRegistrations);
// router.get("/", getAdminStats);
// // router.get("/stats", protect, isAdmin, getAdminStats);

// export default router;

// routes/analytics.js
import { getDashboardStats } from "../controllers/analyticsController.js";
import express from "express";
// import { verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
// router.get("/", verifyAdmin, getDashboardStats);
router.get("/", getDashboardStats);
export default router;
