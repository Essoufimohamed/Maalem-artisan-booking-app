// models/ArtisanProfile.js
import mongoose from "mongoose";
const artisanProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        jobType: {
            type: String,
            enum: ["plumber", "electrician", "carpenter", "masonry", "other"],
        },
        description: String,
        experienceYears: Number,
        portfolio: [String], // image URLs
        rating: { type: Number, default: 0 },
        location: String,
        availability: [{ day: String, hours: [String] }],
        pricingEstimate: String,
    },
    { timestamps: true }
);

export default mongoose.model("ArtisanProfile", artisanProfileSchema);
