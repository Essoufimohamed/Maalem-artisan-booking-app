import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

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

export default function ArtisanProfilePage() {
    const { id } = useParams();
    const [profile, setProfile] = useState<ArtisanProfile | null>(null);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/artisans/${id}`)
            .then((res) => setProfile(res.data))
            .catch((err) => console.error("Error loading profile:", err));
    }, [id]);

    if (!profile) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <Card>
                <CardContent className="p-6 space-y-4">
                    <h1 className="text-2xl font-bold">{profile.user.name}</h1>
                    <p className="text-sm text-gray-500">
                        {profile.user.email}
                    </p>
                    <div className="text-lg font-medium text-blue-600">
                        {profile.jobType.name}
                    </div>
                    {profile.jobType.image && (
                        <img
                            src={`http://localhost:5000/uploads/${profile.jobType.image}`}
                            alt={profile.jobType.name}
                            className="h-40 object-cover rounded-xl"
                        />
                    )}
                    <p className="text-gray-800">{profile.description}</p>
                    <p>Experience: {profile.experienceYears} years</p>
                    <p>Location: {profile.location}</p>
                    <p>Rating: ⭐ {profile.rating}</p>
                    <p>Estimate: {profile.pricingEstimate}</p>

                    <div>
                        <h3 className="font-semibold mt-4 mb-2">
                            Availability:
                        </h3>
                        <ul className="text-sm list-disc ml-5">
                            {profile.availability.map((slot, i) => (
                                <li key={i}>
                                    {slot.day}: {slot.hours.join(", ")}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-4 mb-2">Portfolio:</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {profile.portfolio.map((img, i) => (
                                <img
                                    key={i}
                                    src={`http://localhost:5000/${img}`}
                                    alt={`Portfolio ${i + 1}`}
                                    className="w-full h-32 object-cover rounded"
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
