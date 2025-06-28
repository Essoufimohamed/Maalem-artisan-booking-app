import express from "express";

import {
    createBooking,
    getBookingsForClient,
    getBookingsForArtisan,
    getAllBookings,
    updateBookingStatus,
} from "../controllers/bookingController.js";
const router = express.Router();

router.post("/", createBooking);
router.get("/client/:clientId", getBookingsForClient);
router.get("/artisan/:artisanId", getBookingsForArtisan);

router.get("/", getAllBookings);
router.put("/:id/status", updateBookingStatus);
export default router;
