// models/ArtisanProfile.js
import mongoose from "mongoose";
const artisanProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: true,
        },
        jobType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        description: String,
        experienceYears: Number,
        portfolio: [String], // image URLs
        rating: { type: Number, default: 0 },
        location: String,
        availability: [{ day: String, hours: [String] }],
        pricingEstimate: String,
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("ArtisanProfile", artisanProfileSchema);
