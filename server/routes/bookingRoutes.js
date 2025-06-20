import express from "express";

import {
    createBooking,
    getBookingsForClient,
    getBookingsForArtisan,
} from "../controllers/bookingController.js";
const router = express.Router();

router.post("/", createBooking);
router.get("/client/:clientId", getBookingsForClient);
router.get("/artisan/:artisanId", getBookingsForArtisan);

export default router;
