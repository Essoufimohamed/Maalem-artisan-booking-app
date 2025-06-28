import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/bookings"
                ); // Customize this endpoint
                console.log(res.data.bookings);

                setBookings(res.data.bookings);
            } catch (err) {
                console.error("Error fetching bookings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-100 text-yellow-800";
            case "Approved":
                return "bg-blue-100 text-blue-800";
            case "Completed":
                return "bg-green-100 text-green-800";
            case "Rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

            {loading ? (
                <p>Loading bookings...</p>
            ) : bookings.length === 0 ? (
                <p>No bookings yet.</p>
            ) : (
                <div className="overflow-x-auto border rounded shadow bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Client
                                </th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Service
                                </th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {booking.client?.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {booking.service}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(
                                            booking.date
                                        ).toLocaleDateString()}{" "}
                                        <br />
                                        <span className="text-sm text-gray-500">
                                            {booking.time}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                booking.status
                                            )}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                        {booking.status === "Pending" && (
                                            <>
                                                <button
                                                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            booking._id,
                                                            "Approved"
                                                        )
                                                    }
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            booking._id,
                                                            "Rejected"
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {booking.status === "Approved" && (
                                            <button
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        booking._id,
                                                        "Completed"
                                                    )
                                                }
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    // Update booking status
    async function handleUpdateStatus(id, status) {
        try {
            await axios.put(`http://localhost:5000/api/bookings/${id}/status`, {
                status,
            });
            setBookings((prev) =>
                prev.map((b) => (b._id === id ? { ...b, status } : b))
            );
        } catch (err) {
            console.error("Failed to update booking", err);
        }
    }
}
