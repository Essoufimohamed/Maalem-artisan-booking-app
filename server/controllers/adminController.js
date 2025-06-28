import User from "../models/User.js";
import ArtisanProfile from "../models/ArtisanProfile.js";
import Booking from "../models/Booking.js";

export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalArtisans = await ArtisanProfile.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate("client", "name")
            .populate({
                path: "artisan",
                populate: {
                    path: "user",
                    select: "name",
                },
            });

        res.status(200).json({
            totalUsers,
            totalArtisans,
            totalBookings,
            recentBookings,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
