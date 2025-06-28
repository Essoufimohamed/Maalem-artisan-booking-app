// const jwt = require('jsonwebtoken');
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if header exists and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1]; // Get token part

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Add user data to request
            next(); // Allow access
        } catch (err) {
            return res
                .status(401)
                .json({ message: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
};
