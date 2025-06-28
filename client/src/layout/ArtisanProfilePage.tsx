import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

import { FiUser, FiImage } from "react-icons/fi";
import { MdWork, MdDateRange } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { RiPriceTag3Fill } from "react-icons/ri";

type ArtisanProfile = {
    _id: string;
    user: { _id: string; name: string; email: string };
    jobType: { _id: string; name: string; image?: string };
    description: string;
    experienceYears: number;
    portfolio: string[];
    rating: number;
    location: string;
    availability: { day: string; hours: string[] }[];
    pricingEstimate: string;
};
import { AutContext } from "@/context/AuthContext";

export default function ArtisanProfilePage() {
    const { id } = useParams();
    const { userId } = useContext(AutContext);
    const [profile, setProfile] = useState<ArtisanProfile | null>(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/artisans/${userId}`)
            .then((res) => setProfile(res.data))
            .catch((err) => console.error("Error loading profile:", err));
    }, [id]);

    if (!profile)
        return (
            <div className="p-6 text-center text-gray-500 text-lg font-medium">
                Loading...
            </div>
        );

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8">
            <Card className="shadow-lg rounded-2xl border border-gray-200">
                <CardContent className="p-8 space-y-6">
                    {/* Header */}
                    <div className="flex items-center space-x-6">
                        <div className="flex-shrink-0">
                            {profile.jobType.image ? (
                                <img
                                    src={`http://localhost:5000/${profile.jobType.image}`}
                                    alt={profile.jobType.name}
                                    className="w-24 h-24 rounded-xl object-cover border border-gray-300 shadow-md"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                                <FiUser className="text-blue-600" />{" "}
                                {profile.user.name}
                            </h1>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <FiUser className="text-gray-400" />{" "}
                                {profile.user.email}
                            </p>
                            <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm gap-1">
                                <MdWork /> {profile.jobType.name}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <section className="text-gray-700 leading-relaxed text-lg">
                        {profile.description}
                    </section>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700">
                        <div className="bg-blue-50 rounded-lg p-4 text-center shadow-sm flex flex-col items-center gap-1">
                            <FaBriefcase className="text-blue-600 text-2xl" />
                            <h4 className="text-sm font-semibold text-blue-600">
                                Experience
                            </h4>
                            <p className="mt-1 text-xl font-bold">
                                {profile.experienceYears} years
                            </p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 text-center shadow-sm flex flex-col items-center gap-1">
                            <GoLocation className="text-green-600 text-2xl" />
                            <h4 className="text-sm font-semibold text-green-600">
                                Location
                            </h4>
                            <p className="mt-1 text-xl font-bold">
                                {profile.location}
                            </p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-4 text-center shadow-sm flex flex-col items-center gap-1">
                            <AiFillStar className="text-yellow-500 text-2xl" />
                            <h4 className="text-sm font-semibold text-yellow-600">
                                Rating
                            </h4>
                            <p className="mt-1 text-xl font-bold flex items-center justify-center space-x-1">
                                <span>⭐</span>
                                <span>{profile.rating.toFixed(1)}</span>
                            </p>
                        </div>
                    </div>

                    {/* Pricing Estimate */}
                    <div className="bg-purple-50 rounded-lg p-4 text-purple-700 font-semibold text-center text-lg shadow-inner flex items-center justify-center gap-2">
                        <RiPriceTag3Fill className="text-purple-600 text-xl" />
                        Pricing Estimate: {profile.pricingEstimate}
                    </div>

                    {/* Availability */}
                    <section>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 flex items-center gap-2">
                            <MdDateRange className="text-indigo-600 text-2xl" />
                            Availability
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {profile.availability.map((slot, i) => (
                                <li key={i}>
                                    <span className="font-medium">
                                        {slot.day}:
                                    </span>{" "}
                                    {slot.hours.join(", ")}
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Portfolio */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
                            <FiImage className="text-pink-600 text-2xl" />
                            Portfolio
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {profile.portfolio.map((img, i) => (
                                <img
                                    key={i}
                                    src={`${img}`}
                                    alt={`Portfolio ${i + 1}`}
                                    className="w-full h-36 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}
