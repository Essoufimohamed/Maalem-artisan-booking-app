import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getBookingsForClient = async (req, res) => {
    try {
        const bookings = await Booking.find({
            client: req.params.clientId,
        }).populate("artisan");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getBookingsForArtisan = async (req, res) => {
    try {
        const bookings = await Booking.find({
            artisan: req.params.artisanId,
        }).populate("client");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
