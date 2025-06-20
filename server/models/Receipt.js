import mongoose from "mongoose";
const receiptSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    totalAmount: Number,
    issuedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Receipt", receiptSchema);
