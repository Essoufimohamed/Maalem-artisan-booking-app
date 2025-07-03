// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// import axios from "axios";
// import {
//     CheckBadgeIcon,
//     MapPinIcon,
//     WrenchScrewdriverIcon,
//     CurrencyDollarIcon,
//     StarIcon,
// } from "@heroicons/react/24/solid";
// import BookingModal from "@/pages/clientPages/BookingModal";
// import toast from "react-hot-toast";
// import type { Artisan } from "@/types";
// import { AutContext } from "@/context/AuthContext";

// export default function ArtisanProfile() {
//     const navigate = useNavigate();
//     const { id } = useParams<{ id: string }>();
//     const [artisan, setArtisan] = useState<Artisan | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [isBookingOpen, setIsBookingOpen] = useState(false);

//     const { userId } = useContext(AutContext);
//     const handleContactClick = async () => {
//         // !userId ? navigate("/login") : "";

//         if (!userId) {
//             navigate("/login");
//             return;
//         }
//         try {
//             const res = await axios.post(
//                 `${import.meta.env.VITE_API_URL}/api/chat/conversations`,
//                 {
//                     userId: userId,
//                     artisanProfileId: artisan._id, // <-- correct
//                 }
//             );

//             if (!userId) {
//             } else {
//                 const conversationId = res.data._id;
//                 navigate(`/chat/${conversationId}`);
//             }
//         } catch (err) {
//             toast.error("Could not start conversation.");
//             console.error(err);
//         }
//     };
//     const handleBookingSubmit = async (data: any) => {
//         try {
//             await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
//                 artisanId: artisan._id,
//                 ...data,
//             });
//             toast.success("Booking request sent!");
//         } catch (err) {
//             toast.error("Failed to send booking.");
//         }
//     };

//     useEffect(() => {
//         if (!id) return;
//         axios
//             .get(`${import.meta.env.VITE_API_URL}/api/artisans/${id}`)
//             .then((res) => {
//                 setArtisan(res.data);
//                 setLoading(false);
//             })
//             .catch(() => {
//                 setError("Failed to load artisan profile");
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) return <div className="text-center py-10">Loading...</div>;
//     if (error) return <div className="text-center text-red-500">{error}</div>;
//     if (!artisan) return <div>No artisan found</div>;

//     return (
//         <div className="max-w-5xl mx-auto p-6 space-y-10 text-gray-800">
//             {/* Artisan Card */}
//             <div className="flex flex-col md:flex-row gap-6 bg-orange-50 shadow-xl p-6 rounded-3xl border border-orange-200">
//                 <img
//                     src={
//                         artisan.user?.avatar
//                             ? `${import.meta.env.VITE_API_URL}${
//                                   artisan.user.avatar
//                               }`
//                             : "/default-avatar.jpg"
//                     }
//                     alt={artisan.user?.name}
//                     className="w-48 h-48 rounded-2xl object-cover border border-orange-300"
//                 />

//                 <div className="flex-1 space-y-3">
//                     <div className="flex items-center gap-3">
//                         <h1 className="text-3xl font-bold">
//                             {artisan.user?.name}
//                         </h1>
//                         {artisan.user?.verified && (
//                             <CheckBadgeIcon
//                                 className="h-6 w-6 text-green-500"
//                                 title="Verified"
//                             />
//                         )}
//                     </div>

//                     <div className="flex items-center gap-2 text-orange-600">
//                         <WrenchScrewdriverIcon className="h-5 w-5" />
//                         <p className="font-medium">{artisan.jobType.name}</p>
//                     </div>

//                     <div className="flex items-center gap-2 text-gray-600">
//                         <MapPinIcon className="h-5 w-5" />
//                         <p>{artisan.location}</p>
//                     </div>

//                     <div className="flex items-center gap-1 text-yellow-500">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                             <StarIcon
//                                 key={i}
//                                 className={`h-5 w-5 ${
//                                     i < Math.round(artisan.rating)
//                                         ? "fill-yellow-500"
//                                         : "fill-gray-200"
//                                 }`}
//                             />
//                         ))}
//                         <span className="ml-2 text-gray-700 text-sm">
//                             ({artisan.rating.toFixed(1)})
//                         </span>
//                     </div>
//                     <div className="flex items-center gap-2 text-green-700 font-semibold mt-2">
//                         <CurrencyDollarIcon className="h-5 w-5" />
//                         <span>start at {artisan.pricingEstimate} MAD</span>
//                     </div>
//                     <p className="text-gray-700 mt-2">
//                         {artisan.description || "No description provided."}
//                     </p>

//                     <div className="flex gap-4 mt-6">
//                         <button
//                             className="mt-3 px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
//                             onClick={() => setIsBookingOpen(true)}
//                         >
//                             Book Now
//                         </button>

//                         {/* <BookingModal
//                             open={isBookingOpen}
//                             onClose={() => setIsBookingOpen(false)}
//                             artisanName={artisan.user?.name ?? "Artisan"}
//                             onSubmit={handleBookingSubmit}
//                         /> */}
//                         <BookingModal
//                             isOpen={isBookingOpen}
//                             onClose={() => setIsBookingOpen(false)}
//                             onBook={(data) => {
//                                 console.log("Booking confirmed:", data);
//                                 // Send to backend
//                             }}
//                             artisanCategory="plumber" // or "electrician", "carpenter"
//                         />
//                         <button
//                             className="mt-3 px-6 py-2 border border-orange-600 text-orange-600 rounded-xl hover:bg-orange-100 transition"
//                             // onClick={() => navigate(`/chat/${artisan._id}`)}
//                             onClick={handleContactClick}
//                         >
//                             Contact
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Portfolio */}
//             {artisan.portfolio?.length > 0 && (
//                 <div className="bg-white shadow-md rounded-2xl p-6">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                         Portfolio
//                     </h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                         {artisan.portfolio.map((img, i) => (
//                             <img
//                                 key={i}
//                                 src={`${img}`}
//                                 alt={`Portfolio ${i + 1}`}
//                                 className="rounded-xl object-cover w-full h-48 border"
//                             />
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    CheckBadgeIcon,
    MapPinIcon,
    WrenchScrewdriverIcon,
    CurrencyDollarIcon,
    StarIcon,
} from "@heroicons/react/24/solid";
import BookingModal from "@/pages/clientPages/BookingModal";
import toast from "react-hot-toast";
import type { Artisan } from "@/types";
import { AutContext } from "@/context/AuthContext";

export default function ArtisanProfile() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [artisan, setArtisan] = useState<Artisan | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const [reviews, setReviews] = useState([]);
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState("");

    const { userId, tokenUser } = useContext(AutContext);

    const handleContactClick = async () => {
        if (!userId) {
            navigate("/login");
            return;
        }
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/chat/conversations`,
                {
                    userId,
                    artisanProfileId: artisan._id,
                }
            );
            const conversationId = res.data._id;
            navigate(`/chat/${conversationId}`);
        } catch (err) {
            toast.error("Could not start conversation.");
            console.error(err);
        }
    };

    const handleBookingSubmit = async (bookingData: {
        selectedDate: Date;
        time: string;
        note: string;
    }) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/bookings`,
                {
                    artisanId: artisan._id,
                    selectedDate: bookingData.selectedDate.toISOString(), // use `selectedDate` here
                    time: bookingData.time,
                    note: bookingData.note,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                    },
                }
            );
            toast.success("Booking request sent!");
            setIsBookingOpen(false); // Close modal after success
        } catch (err) {
            toast.error("Failed to send booking.");
            console.error(err);
        }
    };

    const handleReviewSubmit = async () => {
        if (!userId) return navigate("/login");

        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/reviews`, {
                artisanId: artisan._id,
                userId,
                comment: newComment,
                rating: newRating,
            });
            toast.success("Review submitted!");
            setNewComment("");
            setNewRating(0);

            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/reviews/artisan/${id}`
            );
            setReviews(res.data);
        } catch (err) {
            toast.error("Failed to submit review");
            console.error(err);
        }
    };

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const artisanRes = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/artisans/${id}`
                );
                setArtisan(artisanRes.data);

                const reviewsRes = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/reviews/artisan/${id}`
                );
                setReviews(reviewsRes.data);

                setLoading(false);
            } catch (err) {
                setError("Failed to load artisan profile");
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!artisan) return <div>No artisan found</div>;

    const averageRating =
        reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : artisan.rating;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-10 text-gray-800">
            {/* Artisan Card */}
            <div className="flex flex-col md:flex-row gap-6 bg-orange-50 shadow-xl p-6 rounded-3xl border border-orange-200">
                <img
                    src={
                        artisan.user?.avatar
                            ? `${import.meta.env.VITE_API_URL}${
                                  artisan.user.avatar
                              }`
                            : "/default-avatar.jpg"
                    }
                    alt={artisan.user?.name}
                    className="w-48 h-48 rounded-2xl object-cover border border-orange-300"
                />

                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold">
                            {artisan.user?.name}
                        </h1>
                        {artisan.user?.verified && (
                            <CheckBadgeIcon
                                className="h-6 w-6 text-green-500"
                                title="Verified"
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-orange-600">
                        <WrenchScrewdriverIcon className="h-5 w-5" />
                        <p className="font-medium">{artisan.jobType.name}</p>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPinIcon className="h-5 w-5" />
                        <p>{artisan.location}</p>
                    </div>

                    <div className="flex items-center gap-1 text-yellow-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                                key={i}
                                className={`h-5 w-5 ${
                                    i < Math.round(averageRating)
                                        ? "fill-yellow-500"
                                        : "fill-gray-200"
                                }`}
                            />
                        ))}
                        <span className="ml-2 text-gray-700 text-sm">
                            ({averageRating.toFixed(1)})
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-green-700 font-semibold mt-2">
                        <CurrencyDollarIcon className="h-5 w-5" />
                        <span>start at {artisan.pricingEstimate} MAD</span>
                    </div>

                    <p className="text-gray-700 mt-2">
                        {artisan.description || "No description provided."}
                    </p>

                    <div className="flex gap-4 mt-6">
                        <button
                            className="mt-3 px-6 py-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition"
                            onClick={() => setIsBookingOpen(true)}
                        >
                            Book Now
                        </button>

                        <BookingModal
                            isOpen={isBookingOpen}
                            onClose={() => setIsBookingOpen(false)}
                            onBook={handleBookingSubmit}
                            tokenUser={tokenUser}
                            // artisanCategory={artisan.jobType.name}
                        />

                        <button
                            className="mt-3 px-6 py-2 border border-orange-600 text-orange-600 rounded-xl hover:bg-orange-100 transition"
                            onClick={handleContactClick}
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </div>

            {/* Portfolio */}
            {artisan.portfolio?.length > 0 && (
                <div className="bg-white shadow-md rounded-2xl p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Portfolio
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {artisan.portfolio.map((img, i) => (
                            <img
                                key={i}
                                src={`${img}`}
                                alt={`Portfolio ${i + 1}`}
                                className="rounded-xl object-cover w-full h-48 border"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Reviews */}
            <div className="bg-white shadow-md rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Reviews
                </h2>

                {reviews.length === 0 && (
                    <p className="text-gray-500 italic">No reviews yet.</p>
                )}

                {reviews.map((review, idx) => (
                    <div key={idx} className="border-b py-4">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold text-orange-600">
                                {review.user?.name || "Anonymous"}
                            </div>
                            <div className="flex gap-1 text-yellow-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < review.rating
                                                ? "fill-yellow-500"
                                                : "fill-gray-200"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-700 mt-1">{review.comment}</p>
                    </div>
                ))}

                <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-2">
                        Leave a Review
                    </h3>
                    <div className="flex gap-1 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                                key={i}
                                onClick={() => setNewRating(i + 1)}
                                className={`h-6 w-6 cursor-pointer ${
                                    i < newRating
                                        ? "fill-yellow-500"
                                        : "fill-gray-200"
                                }`}
                            />
                        ))}
                    </div>
                    <textarea
                        className="w-full border rounded-lg p-2 mb-2"
                        placeholder="Write your review here..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                        onClick={handleReviewSubmit}
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
}
