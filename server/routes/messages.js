import express from "express";
import Conversation from "../models/Conversation.js";
import Message from "../models/Messages.js";
import ArtisanProfile from "../models/ArtisanProfile.js";

const router = express.Router();

router.post("/conversations", async (req, res) => {
    const { userId, artisanProfileId } = req.body;

    if (!userId || !artisanProfileId) {
        return res
            .status(400)
            .json({ message: "Both userId and artisanProfileId are required" });
    }

    try {
        // ✅ Get the artisan's user ID from the ArtisanProfile
        const artisanProfile = await ArtisanProfile.findById(artisanProfileId);
        if (!artisanProfile || !artisanProfile.user) {
            return res
                .status(404)
                .json({ message: "Artisan profile not found" });
        }

        const artisanUserId = artisanProfile.user.toString();

        // ✅ Look for existing conversation between user and artisan's user ID
        let conversation = await Conversation.findOne({
            members: { $all: [userId, artisanUserId], $size: 2 },
        });

        // ✅ If no conversation exists, create one
        if (!conversation) {
            conversation = new Conversation({
                members: [userId, artisanUserId],
            });
            await conversation.save();
        }

        res.status(200).json(conversation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Get all conversations of a user
router.get("/conversations/:userId", async (req, res) => {
    try {
        const convs = await Conversation.find({
            members: req.params.userId,
        }).populate("members", "name");
        res.status(200).json(convs);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get messages in a conversation
router.get("/messages/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Send a message
router.post("/message", async (req, res) => {
    const { conversationId, sender, text } = req.body;
    try {
        const msg = await Message.create({ conversationId, sender, text });
        res.status(201).json(msg);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/client-messages/:clientId", async (req, res) => {
    try {
        const conversations = await Conversation.find({
            "members._id": req.params.clientId,
        }).populate("members", "name avatar");
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch" });
    }
});

export default router;
