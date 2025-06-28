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

export const getAllBookings = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const total = await Booking.countDocuments();

        const bookings = await Booking.find()
            .populate("client", "name")
            .populate("artisan", "name")
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);

        res.json({
            bookings,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updated) return res.status(404).json({ msg: "Booking not found" });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
