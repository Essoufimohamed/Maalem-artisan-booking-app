import { useEffect, useState } from "react";
import axios from "axios";

import { Users, CheckCircle, Clock, Check, Loader2 } from "lucide-react";
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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Artisans
            </h1>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full text-sm text-left transition-all duration-300">
                    <thead className="bg-gray-100 text-gray-700 uppercase">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Job Type</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Verified</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artisans.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center py-6 text-gray-500"
                                >
                                    No artisans found.
                                </td>
                            </tr>
                        )}
                        {artisans.map((artisan) => (
                            <tr
                                key={artisan._id}
                                className="border-b hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    {artisan.user?.name || "—"}
                                </td>
                                <td className="px-6 py-4">
                                    {artisan.user?.email || "—"}
                                </td>
                                <td className="px-6 py-4">
                                    {artisan.user?.phone || "—"}
                                </td>
                                <td className="px-6 py-4 capitalize">
                                    {artisan.jobType?.name || "—"}
                                </td>
                                <td className="px-6 py-4">
                                    {artisan.location || "—"}
                                </td>
                                <td className="px-6 py-4 flex items-center gap-1">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
                                            artisan.verified
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {artisan.verified ? (
                                            <>
                                                <CheckCircle className="w-4 h-4" />
                                                Verified
                                            </>
                                        ) : (
                                            <>
                                                <Clock className="w-4 h-4 animate-pulse" />
                                                Pending
                                            </>
                                        )}
                                    </span>
                                </td>
                                {/* <td className="px-6 py-4">
                                    {!artisan.verified && (
                                        <button
                                            onClick={() =>
                                                handleApprove(artisan._id)
                                            }
                                            disabled={
                                                approvingId === artisan._id
                                            }
                                            className={`flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition ${
                                                approvingId === artisan._id
                                                    ? "cursor-not-allowed opacity-70"
                                                    : "cursor-pointer"
                                            }`}
                                        >
                                            {approvingId === artisan._id ? (
                                                <>
                                                    <Loader2 className="animate-spin w-4 h-4" />
                                                    Approving...
                                                </>
                                            ) : (
                                                "Approve"
                                            )}
                                        </button>
                                    )}
                                </td> */}
                                <td className="px-6 py-4 ">
                                    {/* Approve button if needed */}
                                    <span className="px-6 py-4 flex items-center gap-2">
                                        {!artisan.verified && (
                                            <button
                                                onClick={() =>
                                                    handleApprove(artisan._id)
                                                }
                                                disabled={
                                                    approvingId === artisan._id
                                                }
                                                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition"
                                            >
                                                {approvingId === artisan._id ? (
                                                    <Loader2 className="animate-spin w-4 h-4" />
                                                ) : (
                                                    <Check className="w-4 h-4" />
                                                )}
                                                Approve
                                            </button>
                                        )}

                                        {/* View profile button */}
                                        <button
                                            onClick={() =>
                                                handleViewProfile(artisan._id)
                                            }
                                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition"
                                        >
                                            Profile
                                        </button>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between p-4 items-center">
                    <button
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                    >
                        Previous
                    </button>
                    <span className="text-sm font-medium">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Artisans;
