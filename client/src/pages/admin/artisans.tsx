// import { useEffect, useState } from "react";
// import axios from "axios";

// import { Users, CheckCircle, Clock, Check, Loader2 } from "lucide-react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// const Artisans = () => {
//     const [artisans, setArtisans] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [approvingId, setApprovingId] = useState(null);

//     const navigate = useNavigate();

//     const fetchArtisans = async (currentPage) => {
//         try {
//             const res = await axios.get(
//                 `http://localhost:5000/api/artisans?page=${currentPage}`
//             );
//             setArtisans(res.data.artisans);
//             setTotalPages(res.data.totalPages);
//         } catch (error) {
//             console.error("Failed to fetch artisans", error);
//             toast.error("Failed to load artisans");
//         }
//     };

//     useEffect(() => {
//         fetchArtisans(page);
//     }, [page]);

//     const handleNext = () => {
//         if (page < totalPages) setPage((prev) => prev + 1);
//     };

//     const handlePrev = () => {
//         if (page > 1) setPage((prev) => prev - 1);
//     };

//     const handleApprove = async (id) => {
//         setApprovingId(id);
//         try {
//             await axios.patch(
//                 `http://localhost:5000/api/artisans/approve-artisan/${id}`
//             );
//             toast.success("Artisan approved!");
//             fetchArtisans(page);
//         } catch (err) {
//             console.error("Approval failed:", err);
//             toast.error("Failed to approve artisan");
//         } finally {
//             setApprovingId(null);
//         }
//     };
//     const handleViewProfile = (artisanId) => {
//         navigate(`/admin/artisans/${artisanId}`);
//     };
//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
//                 <Users className="w-6 h-6 text-blue-600" />
//                 Artisans
//             </h1>

//             <div className="overflow-x-auto bg-white shadow rounded-lg">
//                 <table className="w-full text-sm text-left transition-all duration-300">
//                     <thead className="bg-gray-100 text-gray-700 uppercase">
//                         <tr>
//                             <th className="px-6 py-3">Name</th>
//                             <th className="px-6 py-3">Email</th>
//                             <th className="px-6 py-3">Phone</th>
//                             <th className="px-6 py-3">Job Type</th>
//                             <th className="px-6 py-3">Verified</th>
//                             <th className="px-6 py-3">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {artisans.length === 0 && (
//                             <tr>
//                                 <td
//                                     colSpan={7}
//                                     className="text-center py-6 text-gray-500"
//                                 >
//                                     No artisans found.
//                                 </td>
//                             </tr>
//                         )}
//                         {artisans.map((artisan) => (
//                             <tr
//                                 key={artisan._id}
//                                 className="border-b hover:bg-gray-50 transition-colors"
//                             >
//                                 <td className="px-6 py-4">
//                                     {artisan.user?.name || "—"}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {artisan.user?.email || "—"}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {artisan.user?.phone || "—"}
//                                 </td>
//                                 <td className="px-6 py-4 capitalize">
//                                     {artisan.jobType?.name || "—"}
//                                 </td>

//                                 <td className="px-6 py-4 flex items-center gap-1">
//                                     <span
//                                         className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
//                                             artisan.verified
//                                                 ? "bg-green-100 text-green-700"
//                                                 : "bg-yellow-100 text-yellow-700"
//                                         }`}
//                                     >
//                                         {artisan.verified ? (
//                                             <>
//                                                 <CheckCircle className="w-4 h-4" />
//                                                 Verified
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <Clock className="w-4 h-4 animate-pulse" />
//                                                 Pending
//                                             </>
//                                         )}
//                                     </span>
//                                 </td>
//                                 {/* <td className="px-6 py-4">
//                                     {!artisan.verified && (
//                                         <button
//                                             onClick={() =>
//                                                 handleApprove(artisan._id)
//                                             }
//                                             disabled={
//                                                 approvingId === artisan._id
//                                             }
//                                             className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition ${
//                                                 approvingId === artisan._id
//                                                     ? "cursor-not-allowed opacity-70"
//                                                     : "cursor-pointer"
//                                             }`}
//                                         >
//                                             {approvingId === artisan._id ? (
//                                                 <>
//                                                     <Loader2 className="animate-spin w-4 h-4" />
//                                                     Approving...
//                                                 </>
//                                             ) : (
//                                                 "Approve"
//                                             )}
//                                         </button>
//                                     )}
//                                 </td> */}
//                                 <td className="px-6 py-4 ">
//                                     {/* Approve button if needed */}
//                                     <span className="px-6 py-4 flex items-center gap-2">
//                                         {!artisan.verified && (
//                                             <button
//                                                 onClick={() =>
//                                                     handleApprove(artisan._id)
//                                                 }
//                                                 disabled={
//                                                     approvingId === artisan._id
//                                                 }
//                                                 className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition"
//                                             >
//                                                 {approvingId === artisan._id ? (
//                                                     <Loader2 className="animate-spin w-4 h-4" />
//                                                 ) : (
//                                                     <Check className="w-4 h-4" />
//                                                 )}
//                                                 Approve
//                                             </button>
//                                         )}

//                                         {/* View profile button */}
//                                         <button
//                                             onClick={() =>
//                                                 handleViewProfile(artisan._id)
//                                             }
//                                             className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition"
//                                         >
//                                             Profile
//                                         </button>
//                                     </span>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Pagination Controls */}
//                 <div className="flex justify-between p-4 items-center">
//                     <button
//                         onClick={handlePrev}
//                         disabled={page === 1}
//                         className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
//                     >
//                         Previous
//                     </button>
//                     <span className="text-sm font-medium">
//                         Page {page} of {totalPages}
//                     </span>
//                     <button
//                         onClick={handleNext}
//                         disabled={page === totalPages}
//                         className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Artisans;

import { useEffect, useState } from "react";
import axios from "axios";

import {
    Users,
    CheckCircle,
    Clock,
    Check,
    Loader2,
    Mail,
    Phone,
    Hammer,
    User,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Artisans = () => {
    const [artisans, setArtisans] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [approvingId, setApprovingId] = useState(null);

    const navigate = useNavigate();

    const fetchArtisans = async (currentPage) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/artisans?page=${currentPage}`
            );
            setArtisans(res.data.artisans);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.error("Failed to fetch artisans", error);
            toast.error("Failed to load artisans");
        }
    };

    useEffect(() => {
        fetchArtisans(page);
    }, [page]);

    const handleNext = () => {
        if (page < totalPages) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const handleApprove = async (id) => {
        setApprovingId(id);
        try {
            await axios.patch(
                `http://localhost:5000/api/artisans/approve-artisan/${id}`
            );
            toast.success("Artisan approved!");
            fetchArtisans(page);
        } catch (err) {
            console.error("Approval failed:", err);
            toast.error("Failed to approve artisan");
        } finally {
            setApprovingId(null);
        }
    };

    const handleViewProfile = (artisanId) => {
        navigate(`/admin/artisans/${artisanId}`);
    };

    return (
        <div className="p-4  min-h-screen">
            <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-orange-900">
                <Users className="w-8 h-8 text-orange-600" />
                Artisans
            </h1>

            {artisans.length === 0 ? (
                <p className="text-center text-gray-400 italic select-none">
                    No artisans found.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artisans.map((artisan) => (
                        <div
                            key={artisan._id}
                            className="bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col justify-between hover:shadow-indigo-400 transition-shadow cursor-default"
                        >
                            <div>
                                <div className="flex items-center mb-4 gap-4">
                                    {artisan.user?.avatar ? (
                                        <img
                                            src={`http://localhost:5000${artisan?.user?.avatar}`}
                                            alt={`${artisan.user?.name}'s avatar`}
                                            className="w-14 h-14 rounded-full object-cover border-2 border-orange-600"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full bg-orang-100 flex items-center justify-center border-2 border-orange-600">
                                            <User className="w-8 h-8 text-indigo-600" />
                                        </div>
                                    )}

                                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                        {artisan.user?.name || "—"}
                                        {artisan.verified ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />
                                        )}
                                    </h2>
                                </div>

                                <p className="text-gray-800 font-medium mb-1 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span className="truncate max-w-full">
                                        {artisan.user?.email || "—"}
                                    </span>
                                </p>

                                <p className="text-gray-800 font-medium mb-1 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    {artisan.user?.phone || "—"}
                                </p>

                                <p className="capitalize text-gray-800 font-semibold mb-3 flex items-center gap-2">
                                    <Hammer className="w-5 h-5" />
                                    {artisan.jobType?.name || "—"}
                                </p>
                            </div>

                            <div className="mt-4 flex gap-3">
                                {!artisan.verified && (
                                    <button
                                        onClick={() =>
                                            handleApprove(artisan._id)
                                        }
                                        disabled={approvingId === artisan._id}
                                        className="flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white px-5 py-2 rounded text-sm font-semibold transition disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {approvingId === artisan._id ? (
                                            <Loader2 className="animate-spin w-5 h-5" />
                                        ) : (
                                            <Check className="w-5 h-5" />
                                        )}
                                        Approve
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        handleViewProfile(artisan._id)
                                    }
                                    className="flex items-center gap-2 bg-orange-100 hover:bg-orange-200 text-black-700 px-5 py-2 rounded text-sm font-semibold transition"
                                >
                                    Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center p-4 mt-8 bg-orange-50 rounded-lg max-w-md mx-auto">
                <button
                    onClick={handlePrev}
                    disabled={page === 1}
                    className="px-5 py-2 bg-orange-100 text-gray-900 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-200 transition"
                >
                    Previous
                </button>
                <span className="text-black font-semibold">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={page === totalPages}
                    className="px-5 py-2 bg-orange-100 text-gray-900 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-200 transition"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Artisans;
