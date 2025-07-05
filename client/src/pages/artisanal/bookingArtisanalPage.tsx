// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// import { MessageCircle } from "lucide-react";
// import { AutContext } from "@/context/AuthContext";

// export default function BookingsPage() {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [statusFilter, setStatusFilter] = useState("All");
//     const [currentPage, setCurrentPage] = useState(1);
//     const bookingsPerPage = 10;

//     const { artisan, tokenUser } = useContext(AutContext);

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const res = await axios.get(
//                     `http://localhost:5000/api/bookings/artisan/${artisan._id}`,
//                     { headers: { Authorization: `Bearer ${tokenUser}` } }
//                 );
//                 setBookings(res.data.bookings);
//             } catch (err) {
//                 console.error("Error fetching bookings", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBookings();
//         console.log();
//     }, [artisan]);

//     const handleUpdateStatus = async (id, status) => {
//         try {
//             await axios.put(`http://localhost:5000/api/bookings/${id}/status`, {
//                 status,
//             });
//             setBookings((prev) =>
//                 prev.map((b) => (b._id === id ? { ...b, status } : b))
//             );
//         } catch (err) {
//             console.error("Failed to update booking", err);
//         }
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "pending":
//                 return "bg-yellow-100 text-yellow-500";
//             case "approved":
//                 return "bg-blue-100 text-blue-500";
//             case "Completed":
//                 return "bg-green-100 text-green-500";
//             case "rejected":
//                 return "bg-red-100 text-red-500";
//             default:
//                 return "bg-gray-100 text-gray-500";
//         }
//     };

//     const filteredBookings =
//         statusFilter === "All"
//             ? bookings
//             : bookings.filter((b) => b.status === statusFilter);

//     const indexOfLast = currentPage * bookingsPerPage;
//     const indexOfFirst = indexOfLast - bookingsPerPage;
//     const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);

//     const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
//     console.log(currentBookings);

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

//             <div className="mb-4 flex justify-between items-center">
//                 <select
//                     className="border p-2 rounded"
//                     value={statusFilter}
//                     onChange={(e) => {
//                         setStatusFilter(e.target.value);
//                         setCurrentPage(1);
//                     }}
//                 >
//                     <option value="All">All</option>
//                     <option value="pending">Pending</option>
//                     <option value="approved">Approved</option>
//                     <option value="completed">Completed</option>
//                     <option value="rejected">Rejected</option>
//                 </select>
//             </div>

//             {loading ? (
//                 <p>Loading bookings...</p>
//             ) : currentBookings.length === 0 ? (
//                 <p>No bookings found.</p>
//             ) : (
//                 <div className="overflow-x-auto border rounded shadow bg-white">
//                     <table className="min-w-full divide-y divide-gray-200">
//                         <thead className="bg-gray-100 text-left">
//                             <tr>
//                                 <th className="px-6 py-3 text-sm font-medium text-gray-700">
//                                     Client
//                                 </th>

//                                 <th className="px-6 py-3 text-sm font-medium text-gray-700 w-[20px]">
//                                     Date
//                                 </th>
//                                 <th className="px-6 py-3 text-sm font-medium text-gray-700 w-[20px]">
//                                     Status
//                                 </th>
//                                 <th className="px-6 py-3 text-sm font-medium text-gray-700 w-[40px]">
//                                     Actions
//                                 </th>
//                                 <th className="px-6 py-3 text-sm font-medium text-gray-700">
//                                     Note
//                                 </th>
//                                 <th className="px-6 py-3 text-sm font-medium text-gray-700 w-[30px]">
//                                     Chat
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-white divide-y divide-gray-200">
//                             {currentBookings.map((booking) => (
//                                 <tr key={booking._id}>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         {booking.client?.name}
//                                     </td>

//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         {new Date(
//                                             booking.date
//                                         ).toLocaleDateString()}
//                                         <br />
//                                         <span className="text-sm text-gray-500">
//                                             {booking.time}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap ">
//                                         <span
//                                             className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//                                                 booking.status
//                                             )}`}
//                                         >
//                                             {booking.status}
//                                         </span>
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap space-x-2">
//                                         {booking.status === "pending" && (
//                                             <span className="flex gap-4">
//                                                 {/* <CircleCheckBig
//                                                     className="text-green-400 hover:text-green-500"
//                                                     onClick={() =>
//                                                         handleUpdateStatus(
//                                                             booking._id,
//                                                             "approved"
//                                                         )
//                                                     }
//                                                 /> */}
//                                                 <button
//                                                     className="px-3 py-1 bg-green-400 hover:bg-green-500 text-white rounded text-sm"
//                                                     onClick={() =>
//                                                         handleUpdateStatus(
//                                                             booking._id,
//                                                             "approved"
//                                                         )
//                                                     }
//                                                 >
//                                                     Accept
//                                                 </button>

//                                                 {/* <CircleX
//                                                     className="text-red-400 hover:text-red-500"
//                                                     onClick={() =>
//                                                         handleUpdateStatus(
//                                                             booking._id,
//                                                             "rejected"
//                                                         )
//                                                     }
//                                                 /> */}
//                                                 <button
//                                                     className="px-3 py-1 bg-red-400 hover:bg-red-500 text-white rounded text-sm"
//                                                     onClick={() =>
//                                                         handleUpdateStatus(
//                                                             booking._id,
//                                                             "rejected"
//                                                         )
//                                                     }
//                                                 >
//                                                     Reject
//                                                 </button>
//                                             </span>
//                                         )}
//                                         {booking.status === "approved" && (
//                                             // <CheckCheck className="text-blue-500 hover:text-blue-700" />
//                                             <button
//                                                 className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
//                                                 onClick={() =>
//                                                     handleUpdateStatus(
//                                                         booking._id,
//                                                         "completed"
//                                                     )
//                                                 }
//                                             >
//                                                 Complete
//                                             </button>
//                                         )}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         {booking?.note}
//                                     </td>
//                                     <td className="px-6 py-4 whitespace-nowrap">
//                                         <Link
//                                             to={`/artisanal/messages/${booking.client?._id}`}
//                                             className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
//                                         >
//                                             <MessageCircle className="w-4 h-4" />
//                                             Message
//                                         </Link>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {totalPages > 1 && (
//                 <div className="flex justify-center mt-4 space-x-2">
//                     {[...Array(totalPages)].map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => setCurrentPage(index + 1)}
//                             className={`px-3 py-1 rounded ${
//                                 currentPage === index + 1
//                                     ? "bg-blue-600 text-white"
//                                     : "bg-gray-200"
//                             }`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { AutContext } from "@/context/AuthContext";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 10;

    const { artisan, tokenUser } = useContext(AutContext);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/bookings/artisan/${artisan._id}`,
                    { headers: { Authorization: `Bearer ${tokenUser}` } }
                );
                setBookings(res.data.bookings);
            } catch (err) {
                console.error("Error fetching bookings", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [artisan]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

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
        const base = "px-3 py-1 rounded-full text-xs font-semibold";
        switch (status) {
            case "pending":
                return `${base} bg-yellow-100 text-yellow-600`;
            case "approved":
                return `${base} bg-blue-100 text-blue-600`;
            case "completed":
                return `${base} bg-green-100 text-green-600`;
            case "rejected":
                return `${base} bg-red-100 text-red-600`;
            default:
                return `${base} bg-muted text-muted-foreground`;
        }
    };

    const sortBookings = (bookings) => {
        return [...bookings].sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === "desc" ? dateA - dateB : dateB - dateA;
        });
    };

    const filteredBookings = sortBookings(
        bookings
            .filter((b) =>
                statusFilter === "All" ? true : b.status === statusFilter
            )
            .filter((b) =>
                b.client?.name
                    ?.toLowerCase()
                    .includes(debouncedSearch.toLowerCase())
            )
    );

    const indexOfLast = currentPage * bookingsPerPage;
    const indexOfFirst = indexOfLast - bookingsPerPage;
    const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

    const toggleSort = () => {
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    };
    console.log(currentBookings);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
                My Bookings
            </h2>

            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3">
                    <select
                        className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search by client name..."
                        className="w-60 border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <p className="text-gray-500">Loading bookings...</p>
            ) : currentBookings.length === 0 ? (
                <p className="text-gray-500">No bookings found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-sm bg-white border">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left">Client</th>
                                <th
                                    onClick={toggleSort}
                                    className="px-6 py-3 text-left cursor-pointer hover:underline"
                                >
                                    Date {sortOrder === "asc" ? "↑" : "↓"}
                                </th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                                <th className="px-6 py-3 text-left">Note</th>
                                <th className="px-6 py-3 text-left">Chat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {currentBookings.map((booking) => (
                                <tr
                                    key={booking._id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        {booking.client?.avatar ? (
                                            <img
                                                src={`http://localhost:5000${booking.client.avatar}`}
                                                alt="avatar"
                                                className="w-8 h-8 rounded-full"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-white text-sm font-bold uppercase">
                                                {booking.client?.name?.charAt(
                                                    0
                                                )}
                                            </div>
                                        )}
                                        <span className="text-gray-800 font-medium">
                                            {booking.client?.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            {new Date(
                                                booking.date
                                            ).toLocaleDateString()}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {booking.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={getStatusColor(
                                                booking.status
                                            )}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {booking.status === "pending" && (
                                            <div className="flex gap-2">
                                                <button
                                                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md text-xs"
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
                                                    className="px-3 py-1 bg-red-500 hover:bg-red-500 text-white rounded-md text-xs"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            booking._id,
                                                            "rejected"
                                                        )
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                        {booking.status === "approved" && (
                                            <button
                                                className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-xs"
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
                                    <td className="px-6 py-4">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <button className="text-gray-800 hover:text-orange-800 text-sm underline">
                                                    View Note
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="max-w-xs p-4">
                                                <p className="text-sm text-gray-700">
                                                    {booking.note ||
                                                        "No note provided."}
                                                </p>
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            to={`/artisanal/messages/${booking.client?._id}`}
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
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

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 rounded-md text-sm font-medium ${
                                currentPage === index + 1
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
