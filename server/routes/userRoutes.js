import express from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
    getAllClients,
} from "../controllers/userController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Public routes
router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);

// Protected route (JWT middleware to be added)
// router.get("/profile/:id", getUserProfile);
router.get("/:id", getUserProfile);
// router.get("/clients", verifyToken, verifyAdmin, getAllClients);
router.get("/clients", getAllClients);

export default router;
