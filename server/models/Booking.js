import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        artisan: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: String,
        time: String,
        serviceType: String,
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
        },
        price: Number,
        notes: String,
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
