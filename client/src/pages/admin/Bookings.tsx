// import { useEffect, useState } from "react";
// import axios from "axios";
// import { CalendarCheck } from "lucide-react";

// const Bookings = () => {
//     const [bookings, setBookings] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     const fetchBookings = async (currentPage) => {
//         try {
//             const res = await axios.get(
//                 `http://localhost:5000/api/bookings?page=${currentPage}`
//             );
//             setBookings(res.data.bookings);
//             setTotalPages(res.data.totalPages);
//         } catch (error) {
//             console.error("Failed to fetch bookings", error);
//         }
//     };

//     useEffect(() => {
//         fetchBookings(page);
//     }, [page]);

//     const handleNext = () => {
//         if (page < totalPages) setPage((prev) => prev + 1);
//     };

//     const handlePrev = () => {
//         if (page > 1) setPage((prev) => prev - 1);
//     };
//     console.log(bookings);

//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
//                 <CalendarCheck className="w-6 h-6" />
//                 Bookings
//             </h1>

//             <div className="overflow-x-auto bg-white shadow rounded-lg">
//                 <table className="w-full text-sm text-left">
//                     <thead className="bg-gray-100 text-gray-700 uppercase">
//                         <tr>
//                             <th className="px-6 py-3">Client</th>
//                             <th className="px-6 py-3">Artisan</th>
//                             <th className="px-6 py-3">Date</th>
//                             <th className="px-6 py-3">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map((booking) => (
//                             <tr key={booking._id} className="border-b">
//                                 <td className="px-6 py-4">
//                                     {booking.client?.name}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {booking.artisan?.user?.name}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {new Date(booking.date).toLocaleString()}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     <span
//                                         className={`px-2 py-1 rounded text-xs ${
//                                             booking.status === "confirmed"
//                                                 ? "bg-green-100 text-green-700"
//                                                 : booking.status === "pending"
//                                                 ? "bg-yellow-100 text-yellow-700"
//                                                 : "bg-red-100 text-red-700"
//                                         }`}
//                                     >
//                                         {booking.status}
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Pagination Controls */}
//                 <div className="flex justify-between p-4">
//                     <button
//                         onClick={handlePrev}
//                         disabled={page === 1}
//                         className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//                     >
//                         Previous
//                     </button>
//                     <span>
//                         Page {page} of {totalPages}
//                     </span>
//                     <button
//                         onClick={handleNext}
//                         disabled={page === totalPages}
//                         className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Bookings;

import { useEffect, useState } from "react";
import axios from "axios";
import { CalendarCheck, CheckCircle, Clock, XCircle } from "lucide-react";

const statusStyles = {
    confirmed: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: <CheckCircle className="w-4 h-4" />,
    },
    pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: <Clock className="w-4 h-4 animate-pulse" />,
    },
    canceled: {
        bg: "bg-red-100",
        text: "text-red-700",
        icon: <XCircle className="w-4 h-4" />,
    },
};

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
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-orange-900">
                <CalendarCheck className="w-6 h-6 text-orange-600" />
                Bookings
            </h1>

            {/* Table for large screens */}
            <div className="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full text-sm text-left">
                    <thead className="bg-orange-50 text-orange-800 uppercase">
                        <tr>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Artisan</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => {
                            const status =
                                statusStyles[booking.status] ||
                                statusStyles.canceled;
                            return (
                                <tr
                                    key={booking._id}
                                    className="border-b hover:bg-orange-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        {booking.client?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {booking.artisan?.user?.name || "—"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {new Date(
                                            booking.date
                                        ).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${status.bg} ${status.text}`}
                                        >
                                            {status.icon}
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Card list for small screens */}
            <div className="md:hidden space-y-4">
                {bookings.map((booking) => {
                    const status =
                        statusStyles[booking.status] || statusStyles.canceled;
                    return (
                        <div
                            key={booking._id}
                            className="bg-white p-4 rounded-lg shadow border border-orange-100"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold text-orange-900">
                                    {booking.artisan?.user?.name || "—"}
                                </h2>
                                <span
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${status.bg} ${status.text}`}
                                >
                                    {status.icon}
                                    {booking.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-1">
                                <span className="font-semibold">Client:</span>{" "}
                                {booking.client?.name || "—"}
                            </p>
                            <p className="text-sm text-gray-700 mb-1">
                                <span className="font-semibold">Date:</span>{" "}
                                {new Date(booking.date).toLocaleString()}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-6">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-200 transition"
                >
                    Previous
                </button>
                <span className="text-orange-900 font-medium">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-200 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Bookings;
