// src/api/conversations.js or similar
import axios from "axios";

export const startConversation = async (userId, artisanProfileId) => {
    try {
        const res = await axios.post("/api/chat/conversations", {
            userId,
            artisanProfileId,
        });
        return res.data; // This is the conversation
    } catch (error) {
        console.error("Failed to start conversation:", error);
        throw error;
    }
};
