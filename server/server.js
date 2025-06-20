import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import artisanRoutes from "./routes/artisanRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static images from uploads/
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/users", userRoutes);
app.use("/api/artisans", artisanRoutes);
app.use("/api/bookings", bookingRoutes);

// Connect to DB and start server
await connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to DB", error);
    });
