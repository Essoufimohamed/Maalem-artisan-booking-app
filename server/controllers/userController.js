import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

// Register
export const registerUser = async (req, res) => {
    const { name, email, phone, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const avatar = req.file ? `/uploads/${req.file.filename}` : null;

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            avatar,
            role,
        });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Get profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// GET /api/clients?page=1
export const getAllClients = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const totalClients = await User.countDocuments({ role: "client" });
        const clients = await User.find({ role: "client" })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select("-password"); // Exclude passwords

        res.json({
            clients,
            totalPages: Math.ceil(totalClients / limit),
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
