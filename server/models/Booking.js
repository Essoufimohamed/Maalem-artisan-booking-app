import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        artisan: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

        // serviceType: String,
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
        },
        price: Number,

        note: {
            type: String,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
