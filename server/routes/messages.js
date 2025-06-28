import express from "express";
import Conversation from "../models/Conversation.js";
import Message from "../models/Messages.js";

const router = express.Router();

router.post("/conversations", async (req, res) => {
    const { userId, artisanId } = req.body;
    try {
        let conversation = await Conversation.findOne({
            members: { $all: [userId, artisanId] },
        });
        if (!conversation) {
            conversation = new Conversation({ members: [userId, artisanId] });
            await conversation.save();
        }
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// // Create/get conversation between artisan and client
// router.post("/conversation", async (req, res) => {
//     const { senderId, receiverId } = req.body;
//     try {
//         let conv = await Conversation.findOne({
//             members: { $all: [senderId, receiverId] },
//         });
//         if (!conv) {
//             conv = await Conversation.create({
//                 members: [senderId, receiverId],
//             });
//         }
//         res.status(200).json(conv);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

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

export default router;
