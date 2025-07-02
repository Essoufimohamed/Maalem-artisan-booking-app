// pages/clientPages/ClientBookingsPage.jsx
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AutContext } from "@/context/AuthContext";

export default function ClientBookingsPage() {
    const { userId } = useContext(AutContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!userId) return;
        axios
            .get(`http://localhost:5000/api/bookings/client/${userId}`)
            .then((res) => setBookings(res.data))
            .catch((err) => console.error(err));
    }, [userId]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
            <div className="space-y-4">
                {bookings.map((b) => (
                    <div
                        key={b._id}
                        className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={b.artisan.avatar || "/default-avatar.png"}
                                alt="avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-medium">{b.artisan.name}</p>
                                <p className="text-sm text-gray-500">
                                    Date:{" "}
                                    {new Date(b.date).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">
                            Service: {b.service}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
