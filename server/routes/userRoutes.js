import express from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected route (JWT middleware to be added)
router.get("/profile/:id", getUserProfile);

export default router;
