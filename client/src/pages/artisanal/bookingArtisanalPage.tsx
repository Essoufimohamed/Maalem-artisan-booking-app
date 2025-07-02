import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
    Check,
    X,
    MessageCircle,
    UserRoundCheck,
    ArrowRight,
} from "lucide-react";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 10;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:5000/api/bookings"
                );
                setBookings(res.data.bookings);
            } catch (err) {
                console.error("Error fetching bookings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleUpdateStatus = async (id, status) => {
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
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "approved":
                return "bg-blue-100 text-blue-800";
            case "Completed":
                return "bg-green-100 text-green-800";
            case "rejected":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const filteredBookings =
        statusFilter === "All"
            ? bookings
            : bookings.filter((b) => b.status === statusFilter);

    const indexOfLast = currentPage * bookingsPerPage;
    const indexOfFirst = indexOfLast - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
    console.log(currentBookings);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

            <div className="mb-4 flex justify-between items-center">
                <select
                    className="border p-2 rounded"
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="All">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {loading ? (
                <p>Loading bookings...</p>
            ) : currentBookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="overflow-x-auto border rounded shadow bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Client
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
                                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                                    Chat
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {booking.client?.name}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(
                                            booking.date
                                        ).toLocaleDateString()}
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
                                        {booking.status === "pending" && (
                                            <>
                                                <button
                                                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            booking._id,
                                                            "approved"
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
                                                            "rejected"
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {booking.status === "approved" && (
                                            <button
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                                                onClick={() =>
                                                    handleUpdateStatus(
                                                        booking._id,
                                                        "completed"
                                                    )
                                                }
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            to={`/artisanal/messages/${booking.client?._id}`}
                                            className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                            Message
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center mt-4 space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 rounded ${
                                currentPage === index + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
