import ArtisanProfile from "../models/ArtisanProfile.js";

export const createArtisanProfile = async (req, res) => {
    try {
        const portfolioImages = req.files.map((file) => file.path); // local paths to images
        const profileData = {
            ...req.body,
            portfolio: portfolioImages,
        };
        const profile = await ArtisanProfile.create(profileData);
        res.status(201).json(profile);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getAllArtisans = async (req, res) => {
    try {
        const artisans = await ArtisanProfile.find().populate(
            "user",
            "name phone email"
        );
        res.json(artisans);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getArtisanById = async (req, res) => {
    try {
        const artisan = await ArtisanProfile.findById(req.params.id).populate(
            "user"
        );
        if (!artisan) return res.status(404).json({ msg: "Artisan not found" });
        res.json(artisan);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
