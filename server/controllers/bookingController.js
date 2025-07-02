import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
    try {
        const { artisanId, selectedDate, time, note } = req.body;
        if (!artisanId || !selectedDate || !time) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const booking = await Booking.create({
            client: req.user._id, // user injected by auth middleware
            artisan: artisanId,
            date: new Date(selectedDate),
            time,
            note,
        });

        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// export const getBookingsForClient = async (req, res) => {
//     try {
//         const bookings = await Booking.find({
//             client: req.params.clientId,
//         }).populate("artisan");
//         res.json(bookings);
//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };

export const getBookingsByClient = async (req, res) => {
    try {
        const bookings = await Booking.find({ client: req.params.clientId })
            .populate("artisan", "name avatar")
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getBookingsForArtisan = async (req, res) => {
    try {
        const { artisanId } = req.query;

        const query = artisanId ? { artisan: artisanId } : {};
        const bookings = await Booking.find(query)
            .populate("client", "name")
            .sort({ createdAt: -1 });

        res.json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch bookings" });
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
