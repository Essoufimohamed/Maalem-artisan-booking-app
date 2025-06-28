import User from "../models/User.js";

export const getArtisanRegistrations = async (req, res) => {
    const { period = "month" } = req.query;

    let groupFormat;

    if (period === "day") {
        groupFormat = {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        };
    } else if (period === "week") {
        groupFormat = { $isoWeek: "$createdAt" };
    } else {
        // Default to monthly
        groupFormat = {
            $dateToString: { format: "%Y-%m", date: "$createdAt" },
        };
    }

    try {
        const stats = await User.aggregate([
            { $match: { role: "artisan" } },
            {
                $group: {
                    _id: groupFormat,
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.json(stats);
    } catch (error) {
        console.error("Artisan registration stats error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
