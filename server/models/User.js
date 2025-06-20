// models/User.js
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, required: true, unique: true },
        password: String,
        phone: String,
        address: String,
        role: {
            type: String,
            enum: ["client", "artisan", "admin"],
            default: "client",
        },
        avatar: String,
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
