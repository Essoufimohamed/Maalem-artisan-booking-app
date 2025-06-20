import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Database Connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the app if connection fails
    }
};
