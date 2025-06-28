import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarCheck } from "lucide-react";

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBookings = async (currentPage) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/bookings?page=${currentPage}`
            );
            setBookings(res.data.bookings);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch bookings", error);
        }
    };

    useEffect(() => {
        fetchBookings(page);
    }, [page]);

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CalendarCheck className="w-6 h-6" />
                Bookings
            </h1>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Artisan</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="border-b">
                                <td className="px-6 py-4">
                                    {booking.client?.name}
                                </td>
                                <td className="px-6 py-4">
                                    {booking.artisan?.name}
                                </td>
                                <td className="px-6 py-4">
                                    {new Date(booking.date).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${
                                            booking.status === "confirmed"
                                                ? "bg-green-100 text-green-700"
                                                : booking.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between p-4">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Bookings;
