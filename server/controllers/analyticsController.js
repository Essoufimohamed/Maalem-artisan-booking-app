import ArtisanProfile from "../models/ArtisanProfile.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
    try {
        const clients = await User.countDocuments({ role: "client" });
        const artisans = await User.countDocuments({ role: "artisan" });
        const bookings = await Booking.countDocuments();

        const monthly = await Booking.aggregate([
            { $group: { _id: { $month: "$createdAt" }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ]);
        const monthlyBookings = Array.from({ length: 12 }, (_, i) => {
            const found = monthly.find((m) => m._id === i + 1);
            return {
                month: new Date(0, i).toLocaleString("default", {
                    month: "short",
                }),
                count: found ? found.count : 0,
            };
        });

        const topRated = await Booking.aggregate([
            { $match: { rating: { $exists: true } } },
            {
                $group: {
                    _id: "$artisan",
                    avgRating: { $avg: "$rating" },
                    count: { $sum: 1 },
                },
            },
            { $sort: { avgRating: -1, count: -1 } },
            { $limit: 5 },
            {
                $lookup: {
                    from: "artisanprofiles",
                    localField: "_id",
                    foreignField: "_id",
                    as: "artisan",
                },
            },
            { $unwind: "$artisan" },
            {
                $project: {
                    _id: 0,
                    artisanId: "$artisan._id",
                    name: "$artisan.user.name",
                    avgRating: 1,
                    reviews: "$count",
                },
            },
        ]);

        res.json({ clients, artisans, bookings, monthlyBookings, topRated });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
