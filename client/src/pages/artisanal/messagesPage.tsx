// src/pages/MessagesPage.jsx
import { io } from "socket.io-client";
import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AutContext } from "@/context/AuthContext";

const socket = io("http://localhost:5000");

export default function MessagesPage() {
    const { userId } = useContext(AutContext);
    const currentUserId = userId;

    const { artisanId } = useParams(); // optional artisanId from URL

    const [conversations, setConversations] = useState([]);
    const [activeConvId, setActiveConvId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    // Load all conversations for current user
    useEffect(() => {
        if (!currentUserId) return;
        axios
            .get(
                `http://localhost:5000/api/chat/conversations/${currentUserId}`
            )
            .then((res) => setConversations(res.data))
            .catch((err) => console.error(err));
    }, [currentUserId]);

    // When artisanId param exists, find or create conversation and set active
    useEffect(() => {
        if (!artisanId || !currentUserId) return;

        axios
            .post(`http://localhost:5000/api/chat/conversations`, {
                userId: currentUserId,
                artisanId,
            })
            .then((res) => {
                const conv = res.data;
                setActiveConvId(conv._id);

                // Add to conversations list if not already there
                setConversations((prev) => {
                    if (!prev.find((c) => c._id === conv._id)) {
                        return [...prev, conv];
                    }
                    return prev;
                });
            })
            .catch(console.error);
    }, [artisanId, currentUserId]);

    // Join room and load messages when active conversation changes
    useEffect(() => {
        if (!activeConvId) return;

        socket.emit("join", activeConvId);

        axios
            .get(`http://localhost:5000/api/chat/messages/${activeConvId}`)
            .then((res) => setMessages(res.data))
            .catch((err) => console.error(err));
    }, [activeConvId]);

    // Listen for new incoming messages
    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off("receiveMessage");
    }, []);

    // Scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send message handler
    const sendMessage = async () => {
        if (!input.trim() || !activeConvId) return;

        const newMsg = {
            conversationId: activeConvId,
            sender: currentUserId,
            text: input,
        };

        try {
            const res = await axios.post(
                "http://localhost:5000/api/chat/message",
                newMsg
            );
            setMessages((prev) => [...prev, res.data]);
            socket.emit("sendMessage", {
                roomId: activeConvId,
                message: res.data,
            });
            setInput("");
        } catch (err) {
            console.error("Error sending message", err);
        }
    };

    // Helper to get name of conversation partner
    const getReceiverName = () => {
        const conv = conversations.find((c) => c._id === activeConvId);
        return conv?.members.find((m) => m._id !== currentUserId)?.name || "";
    };

    return (
        <div className="flex h-full border rounded shadow bg-white">
            {/* Sidebar */}
            <div className="w-64 border-r overflow-y-auto">
                <h2 className="p-4 font-semibold border-b">Conversations</h2>
                <ul>
                    {conversations.map((conv) => {
                        const other = conv.members.find(
                            (m) => m._id !== currentUserId
                        );
                        return (
                            <li
                                key={conv._id}
                                onClick={() => setActiveConvId(conv._id)}
                                className={`cursor-pointer p-4 border-b hover:bg-yellow-100 ${
                                    conv._id === activeConvId
                                        ? "bg-yellow-200 font-semibold"
                                        : ""
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <img
                                        src={
                                            other?.avatar ||
                                            "/default-avatar.png"
                                        }
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <span>{other?.name || "Unknown User"}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
                {activeConvId && (
                    <div className="p-4 border-b font-medium bg-gray-50">
                        Chatting with: {getReceiverName()}
                    </div>
                )}

                <div className="flex-grow p-6 overflow-y-auto">
                    {messages.map(({ _id, sender, text, createdAt }) => (
                        <div
                            key={_id}
                            className={`max-w-xl mb-4 p-3 rounded-xl ${
                                sender === currentUserId
                                    ? "bg-yellow-200 self-end ml-auto"
                                    : "bg-gray-200 self-start mr-auto"
                            }`}
                        >
                            <p>{text}</p>
                            <span className="text-xs text-gray-600 block mt-1">
                                {new Date(createdAt).toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t flex gap-2">
                    <input
                        type="text"
                        className="flex-grow border rounded px-3 py-2 focus:outline-yellow-400"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
