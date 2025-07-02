import { Link } from "react-router-dom";
import { CardContent } from "@/components/ui/card";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import type { Artisan } from "@/types";

interface Props {
    artisan: Artisan;
}

export default function ArtisanCard({ artisan }: Props) {
    const rating = artisan.rating || 0;
    console.log(artisan);

    return (
        <div className="block border border-[#285241] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white">
            <img
                src={
                    artisan.user?.avatar
                        ? `${import.meta.env.VITE_API_URL}${
                              artisan.user.avatar
                          }`
                        : "/default-avatar.jpg"
                }
                alt={artisan.user?.name}
                className="w-full h-48 object-cover"
            />

            <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                        {artisan.user?.name}
                    </h3>
                    {artisan.verified == true && (
                        <CheckBadgeIcon
                            className="h-5 w-5 text-black-500"
                            title="Verified"
                        />
                    )}
                </div>

                <p className="text-sm text-gray-600">
                    {artisan.jobType?.name}{" "}
                    <span className="text-gray-400">•</span> {artisan.location}
                </p>

                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx}>
                            {idx < Math.round(rating) ? "★" : "☆"}
                        </span>
                    ))}
                    <span className="ml-1 text-gray-600">
                        ({rating.toFixed(1)})
                    </span>
                </div>

                <div className="text-gray-800 font-medium text-sm">
                    {artisan.pricingEstimate ?? "N/A"} MAD
                </div>

                <div className="pt-4 flex gap-2">
                    <Link
                        to={`/artisan/${artisan._id}`}
                        className="text-sm px-4 py-2 rounded-xl border border-[#285241] text-[#285241] hover:bg-indigo-50 transition"
                    >
                        View Profile
                    </Link>
                    <Link
                        to={`/artisan/${artisan._id}#booking`}
                        className="text-sm px-4 py-2 rounded-xl bg-[#285241] text-white hover:bg-[#366f58] transition"
                    >
                        Book Now
                    </Link>
                </div>
            </CardContent>
        </div>
    );
}
