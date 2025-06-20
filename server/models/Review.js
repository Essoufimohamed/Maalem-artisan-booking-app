import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
    {
        client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        artisan: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
