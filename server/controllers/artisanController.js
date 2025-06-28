import ArtisanProfile from "../models/ArtisanProfile.js";

export const createArtisanProfile = async (req, res) => {
    try {
        const portfolioImages = req.files
            ? req.files.map(
                  (file) =>
                      `${req.protocol}://${req.get("host")}/uploads/${
                          file.filename
                      }`
              )
            : [];

        const profileData = {
            ...req.body,
            portfolio: portfolioImages,
        };

        const profile = await ArtisanProfile.create(profileData);
        res.status(201).json(profile);
    } catch (err) {
        console.error("Create Artisan Error:", err);
        res.status(500).json({ msg: err.message });
    }
};

// export const getAllArtisans = async (req, res) => {
//     try {
//         const artisans = await ArtisanProfile.find().populate(
//             "user jobType",
//             "name phone email avatar"
//         );
//         res.json(artisans);
//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };
export const getAllArtisans = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const total = await ArtisanProfile.countDocuments();

        const artisans = await ArtisanProfile.find()
            .populate("user jobType", "name phone email avatar")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.json({
            artisans,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// export const getArtisanById = async (req, res) => {
//     try {
//         const artisan = await ArtisanProfile.findById(req.params.id).populate(
//             "user"
//         );
//         if (!artisan) return res.status(404).json({ msg: "Artisan not found" });
//         res.json(artisan);
//     } catch (err) {
//         res.status(500).json({ msg: err.message });
//     }
// };
export const getArtisanProfile = async (req, res) => {
    try {
        const artisan = await ArtisanProfile.findOne({
            user: req.params.id,
        }).populate("user jobType");

        if (!artisan) {
            return res.status(200).json(null); // It's OK to return null if no profile yet
        }

        res.json(artisan);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getArtisanById = async (req, res) => {
    try {
        const artisan = await ArtisanProfile.findById(req.params.id).populate(
            "user jobType"
        );

        if (!artisan) {
            return res.status(404).json({ message: "Artisan not found" });
        }

        res.json(artisan);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const updateArtisanal = async (req, res) => {
    try {
        const updated = await Artisan.findOneAndUpdate(
            { user: req.params.userId }, // ✅ match userId
            {
                description: req.body.description,
                pricingEstimate: req.body.pricingEstimate,
                location: req.body.location,
                portfolio: req.body.portfolio,
            },
            { new: true }
        )
            .populate("user")
            .populate("jobType");

        if (!updated) {
            return res.status(404).json({ message: "Artisan not found" });
        }

        res.json(updated);
    } catch (err) {
        console.error("❌ Artisan update error:", err); // ✅ helpful log
        res.status(500).json({ message: "Update failed", error: err.message });
    }
};

export const approveArtisan = async (req, res) => {
    try {
        const artisan = await ArtisanProfile.findByIdAndUpdate(
            req.params.id,
            { verified: true },
            { new: true }
        );
        res.status(200).json(artisan);
    } catch (err) {
        res.status(500).json({
            message: "Approval failed",
            error: err.message,
        });
    }
};
