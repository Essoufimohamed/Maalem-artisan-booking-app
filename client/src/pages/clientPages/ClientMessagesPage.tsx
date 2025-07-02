// pages/clientPages/ClientMessagesPage.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AutContext } from "@/context/AuthContext";

export default function ClientMessagesPage() {
    const { userId } = useContext(AutContext);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        if (!userId) return;
        axios
            .get(`http://localhost:5000/api/chat/client-messages/${userId}`)
            .then((res) => setConversations(res.data))
            .catch((err) => console.error(err));
    }, [userId]);

    console.log(conversations);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>
            <ul className="space-y-4">
                {conversations.map((c) => {
                    const other = c.members.find((m) => m._id !== userId);
                    return (
                        <li
                            key={c._id}
                            className="bg-white p-4 shadow rounded flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={other?.avatar || "/default-avatar.png"}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <span className="font-medium">
                                    {other?.name || "Unknown"}
                                </span>
                            </div>
                            <Link
                                to={`/chat/${other?._id}`}
                                className="text-blue-600 hover:underline"
                            >
                                View Chat
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
