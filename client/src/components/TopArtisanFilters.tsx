import { Link } from "react-router-dom";
import { Star, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import MainTitleSections from "@/components/mainTitleSections";

const artisanFilters = [
    { label: "All", value: "" },
    { label: "Highest Rated", value: "highestRated" },
    { label: "Most Booked", value: "mostBooked" },
    { label: "Available Now", value: "available" },
    { label: "Nearby", value: "nearby" },
    // { label: "Affordable", value: "affordable" },
];

const ArtisanList = () => {
    const [artisans, setArtisans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");

    useEffect(() => {
        setLoading(true);

        // Build API URL with filters & pagination
        const url = new URL(`${import.meta.env.VITE_API_URL}/api/artisans`);
        url.searchParams.append("page", currentPage);
        url.searchParams.append("limit", 6);
        if (activeFilter) url.searchParams.append("filter", activeFilter);

        axios
            .get(url.toString())
            .then((res) => {
                const data = res.data;
                setArtisans(data.artisans ?? data);
                setTotalPages(data.totalPages ?? 1);
            })
            .catch((err) => console.error("Error loading artisans:", err))
            .finally(() => setLoading(false));
    }, [currentPage, activeFilter]);

    // When filter changes, reset to page 1
    const onFilterClick = (value) => {
        setActiveFilter(value);
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] p-6">
            <MainTitleSections title={"Featured Artisans"} />

            {/* Filters */}
            <div className="flex justify-center gap-4 overflow-x-auto py-4 max-w-6xl mx-auto">
                {artisanFilters.map(({ label, value }) => (
                    <button
                        key={value || "all"}
                        onClick={() => onFilterClick(value)}
                        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition
              ${
                  activeFilter === value
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700"
              }`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Artisan Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {loading && <p>Loading artisans...</p>}
                {!loading && artisans.length === 0 && (
                    <p className="text-center text-gray-500">
                        No artisans found.
                    </p>
                )}

                {!loading &&
                    artisans.map((artisan) => (
                        <div
                            key={artisan._id}
                            className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm mx-auto"
                        >
                            {/* Avatar */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={
                                        artisan.user?.avatar
                                            ? `http://localhost:5000${artisan.user.avatar}`
                                            : "/default-avatar.png"
                                    }
                                    alt={artisan.user?.name}
                                    className="w-24 h-24 rounded-full object-cover border"
                                />
                            </div>

                            {/* Name and Role */}
                            <div className="text-center">
                                <h2 className="text-xl font-semibold">
                                    {artisan.user?.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {artisan.jobType?.name} · {artisan.location}
                                </p>
                            </div>

                            {/* Rating + Verified */}
                            <div className="flex justify-center items-center gap-2 text-sm mt-3">
                                <div className="flex items-center gap-1 text-yellow-500 font-medium">
                                    <Star size={16} fill="currentColor" />
                                    {artisan.rating}
                                </div>
                                {artisan.verified && (
                                    <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
                                        <ShieldCheck
                                            size={14}
                                            className="mr-1"
                                        />
                                        Verified
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-600 text-center mt-3 line-clamp-3">
                                {artisan.description}
                            </p>

                            {/* Book Now Button */}
                            <div className="flex gap-3 mt-5">
                                <Link
                                    to={`/artisan/${artisan._id}`}
                                    className="w-1/2"
                                >
                                    <button className="w-full border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-semibold py-2 rounded-full transition">
                                        View Profile
                                    </button>
                                </Link>
                                <Link
                                    to={`/book/${artisan._id}`}
                                    className="w-1/2"
                                >
                                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition">
                                        Book Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>

            {artisans.length > 0 && (
                <div className="mt-10 rounded-2xl p-6 flex items-center justify-center">
                    <Link to="/artisans">
                        <button className="px-10 w-full border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-semibold py-2 rounded-full transition">
                            See More Artisans
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ArtisanList;
