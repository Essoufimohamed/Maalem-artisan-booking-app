import express from "express";

import {
    createBooking,
    // getBookingsForClient,
    getBookingsForArtisan,
    getAllBookings,
    updateBookingStatus,
    getBookingsByClient,
} from "../controllers/bookingController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, createBooking);
// router.get("/client/:clientId", getBookingsForClient);
router.get("/artisan/:artisanId", authMiddleware, getBookingsForArtisan);

router.get("/", getAllBookings);
router.put("/:id/status", updateBookingStatus);
router.get("/client/:clientId", getBookingsByClient);
export default router;
