// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { CheckBadgeIcon } from "@heroicons/react/24/solid";
// import toast from "react-hot-toast";

// import { AutContext } from "@/context/AuthContext";
// export default function ArtisanViewProfile() {
//     const [artisan, setArtisan] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { userId } = useContext(AutContext);

//     useEffect(() => {
//         axios
//             .get(`${import.meta.env.VITE_API_URL}/api/artisans/me/${userId}`)
//             .then((res) => {
//                 console.log(res.data);

//                 setArtisan(res.data);
//                 setLoading(false);
//             })
//             .catch(() => {
//                 toast.error("Failed to load profile.");
//                 setLoading(false);
//             });
//     }, [userId]);

//     if (loading) return <div className="text-center py-10">Loading...</div>;
//     if (!artisan)
//         return (
//             <div className="text-center text-gray-500">Profile not found.</div>
//         );

//     return (
//         <div className="max-w-5xl mx-auto px-6 py-10">
//             <h1 className="text-3xl font-bold mb-6">My Profile</h1>

//             <div className="bg-white shadow-md rounded-xl p-6">
//                 <div className="flex flex-col md:flex-row gap-6 items-start">
//                     <img
//                         src={
//                             artisan.user?.avatar
//                                 ? `${import.meta.env.VITE_API_URL}${
//                                       artisan.user?.avatar
//                                   }`
//                                 : "/default-avatar.jpg"
//                         }
//                         alt="Avatar"
//                         className="w-32 h-32 rounded-full object-cover"
//                     />
//                     <div>
//                         <div className="flex items-center gap-2">
//                             <h2 className="text-2xl font-bold">
//                                 {artisan.user?.name}
//                             </h2>
//                             {artisan.user?.verified && (
//                                 <CheckBadgeIcon className="h-6 w-6 text-green-600" />
//                             )}
//                         </div>
//                         <p className="text-gray-600">{artisan.jobType?.name}</p>
//                         <p className="text-gray-500">{artisan.location}</p>
//                         <div className="text-yellow-500 mt-2">
//                             {Array.from({ length: 5 }).map((_, i) => (
//                                 <span key={i}>
//                                     {i < Math.round(artisan.rating) ? "★" : "☆"}
//                                 </span>
//                             ))}
//                             <span className="ml-2 text-gray-600">
//                                 ({artisan.rating?.toFixed(1)})
//                             </span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="mt-6">
//                     <h3 className="text-lg font-semibold">About Me</h3>
//                     <p className="text-gray-700 mt-2">
//                         {artisan.description || "No description provided."}
//                     </p>
//                 </div>

//                 <div className="mt-4">
//                     <h3 className="text-lg font-semibold">Estimated Price</h3>
//                     <p className="text-gray-800">
//                         {artisan.pricingEstimate} MAD
//                     </p>
//                 </div>

//                 <div className="mt-6">
//                     <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                         {artisan.portfolio?.length > 0 ? (
//                             artisan.portfolio.map((img, index) => (
//                                 <img
//                                     key={index}
//                                     src={`${img}`}
//                                     alt={`Portfolio ${index + 1}`}
//                                     className="rounded-xl object-cover"
//                                 />
//                             ))
//                         ) : (
//                             <p className="text-gray-500">
//                                 No portfolio images added.
//                             </p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { useContext, useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import { AutContext } from "@/context/AuthContext";

export default function ArtisanViewProfile() {
    const { userId } = useContext(AutContext);

    const [artisan, setArtisan] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        pricingEstimate: "",
        location: "",
        portfolio: [] as string[],
    });

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/artisans/me/${userId}`)
            .then((res) => {
                setArtisan(res.data);
                setForm({
                    name: res.data.user?.name || "",
                    description: res.data.description || "",
                    pricingEstimate: res.data.pricingEstimate || "",
                    location: res.data.location || "",
                    portfolio: res.data.portfolio || [],
                });
                setLoading(false);
            })
            .catch(() => {
                toast.error("Failed to load profile.");
                setLoading(false);
            });
    }, [userId]);

    const handleImageUpload = (files: FileList | null) => {
        if (!files) return;
        const newImages: string[] = [];

        for (const file of Array.from(files)) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setForm((prev) => ({
                        ...prev,
                        portfolio: [...prev.portfolio, reader.result as string],
                    }));
                }
            };
            reader.readAsDataURL(file); // For preview only. Replace with upload logic if needed.
        }
    };

    const handleSave = async () => {
        try {
            const res = await axios.put(
                `http://localhost:5173/api/artisans/me/${userId}`,
                {
                    description: form.description,
                    pricingEstimate: form.pricingEstimate,
                    location: form.location,
                    portfolio: form.portfolio,
                }
            );
            toast.success("Profile updated!");

            setArtisan(res.data);
            setIsEditing(false);
        } catch (err) {
            toast.error("Failed to update profile.");
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!artisan)
        return (
            <div className="text-center text-gray-500">Profile not found.</div>
        );

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Profile</h1>
                <button
                    onClick={() => {
                        if (isEditing) {
                            setForm({
                                name: artisan.user?.name || "",
                                description: artisan.description || "",
                                pricingEstimate: artisan.pricingEstimate || "",
                                location: artisan.location || "",
                                portfolio: artisan.portfolio || [],
                            });
                        }
                        setIsEditing(!isEditing);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <img
                        src={
                            artisan.user?.avatar
                                ? `http://localhost:5000${artisan.user?.avatar}`
                                : "/default-avatar.jpg"
                        }
                        alt="Avatar"
                        className="w-32 h-32 rounded-full object-cover"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            name: e.target.value,
                                        })
                                    }
                                    className="border px-2 py-1 rounded"
                                />
                            ) : (
                                <h2 className="text-2xl font-bold">
                                    {artisan.user?.name}
                                </h2>
                            )}
                            {artisan.user?.verified && (
                                <CheckBadgeIcon className="h-6 w-6 text-green-600" />
                            )}
                        </div>
                        <p className="text-gray-600">{artisan.jobType?.name}</p>
                        <p className="text-gray-500">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            location: e.target.value,
                                        })
                                    }
                                    className="border px-2 py-1 rounded"
                                />
                            ) : (
                                artisan.location
                            )}
                        </p>
                        <div className="text-yellow-500 mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i}>
                                    {i < Math.round(artisan.rating) ? "★" : "☆"}
                                </span>
                            ))}
                            <span className="ml-2 text-gray-600">
                                ({artisan.rating?.toFixed(1)})
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold">About Me</h3>
                    {isEditing ? (
                        <textarea
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                            className="border p-2 w-full rounded mt-2"
                        />
                    ) : (
                        <p className="text-gray-700 mt-2">
                            {artisan.description || "No description provided."}
                        </p>
                    )}
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Estimated Price</h3>
                    {isEditing ? (
                        <input
                            type="number"
                            value={form.pricingEstimate}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    pricingEstimate: e.target.value,
                                })
                            }
                            className="border px-2 py-1 rounded mt-2"
                        />
                    ) : (
                        <p className="text-gray-800">
                            {artisan.pricingEstimate} MAD
                        </p>
                    )}
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Portfolio</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {form.portfolio?.length > 0 ? (
                            form.portfolio.map((img, index) => (
                                <div
                                    key={index}
                                    className="relative rounded-xl overflow-hidden"
                                >
                                    <img
                                        src={img}
                                        alt={`Portfolio ${index + 1}`}
                                        className="rounded-xl object-cover"
                                    />
                                    {isEditing && (
                                        <button
                                            onClick={() => {
                                                setForm({
                                                    ...form,
                                                    portfolio:
                                                        form.portfolio.filter(
                                                            (_, i) =>
                                                                i !== index
                                                        ),
                                                });
                                            }}
                                            className="absolute top-1 right-1 bg-red-600 text-white px-2 rounded-full text-sm"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">
                                No portfolio images added.
                            </p>
                        )}
                    </div>

                    {isEditing && (
                        <div className="mt-4">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) =>
                                    handleImageUpload(e.target.files)
                                }
                            />
                        </div>
                    )}
                </div>

                {isEditing && (
                    <button
                        onClick={() => {
                            handleSave();
                        }}
                        className="bg-green-500 text-white px-6 py-2 mt-6 rounded"
                    >
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );
}
