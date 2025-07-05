// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Input } from "@/components/ui/input";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";

// export default function AllArtisansPage() {
//     const [artisans, setArtisans] = useState([]);
//     const [locationInput, setLocationInput] = useState("");
//     const [categories, setCategories] = useState([]);

//     const [filters, setFilters] = useState({
//         jobType: "",
//         location: "",
//         minRating: "",
//         verified: false,
//     });

//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setFilters((prev) => ({ ...prev, location: locationInput }));
//         }, 400);
//         return () => clearTimeout(timer);
//     }, [locationInput]);

//     const fetchArtisans = async () => {
//         try {
//             const activeFilters = { ...filters };

//             // Remove empty or default values
//             Object.keys(activeFilters).forEach((key) => {
//                 if (
//                     activeFilters[key] === "" ||
//                     activeFilters[key] === null ||
//                     activeFilters[key] === undefined
//                 ) {
//                     delete activeFilters[key];
//                 }
//             });

//             const res = await axios.get(
//                 `${import.meta.env.VITE_API_URL}/api/artisans/all/`,
//                 { params: activeFilters }
//             );
//             setArtisans(res.data);
//         } catch (error) {
//             console.error("❌ Failed to fetch artisans:", error);
//         }
//     };

//     useEffect(() => {
//         fetchArtisans();
//     }, [filters]);

//     useEffect(() => {
//         async function fetchCategories() {
//             try {
//                 const res = await axios.get(
//                     `${import.meta.env.VITE_API_URL}/api/categories`
//                 );
//                 setCategories(res.data);
//                 // You can set state here if needed
//             } catch (error) {
//                 console.error("Failed to fetch categories", error);
//             }
//         }
//         fetchCategories();
//     }, []);
//     return (
//         <div className="max-w-7xl mx-auto px-4 py-10">
//             <h1 className="text-4xl font-bold mb-10 text-gray-800 tracking-tight">
//                 🔍 Browse Artisans
//             </h1>

//             {/* Filters */}
//             <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 mb-10 bg-white p-4 rounded-xl shadow">
//                 <Input
//                     placeholder="Search by location..."
//                     value={locationInput}
//                     onChange={(e) => setLocationInput(e.target.value)}
//                 />
//                 <Select
//                     value={filters.jobType || ""}
//                     onValueChange={(value) =>
//                         setFilters((prev) => ({ ...prev, jobType: value }))
//                     }
//                 >
//                     <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Job Type" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">All Jobs</SelectItem>
//                         {categories &&
//                             categories.map((category) => {
//                                 return (
//                                     <SelectItem
//                                         key={category._id || category.name}
//                                         value={category?.name}
//                                     >
//                                         {category?.name}
//                                     </SelectItem>
//                                 );
//                             })}
//                     </SelectContent>
//                 </Select>
//                 <Select
//                     value={filters.minRating || ""}
//                     onValueChange={(value) =>
//                         setFilters((prev) => ({ ...prev, minRating: value }))
//                     }
//                 >
//                     <SelectTrigger className="w-full">
//                         <SelectValue placeholder="Min Rating" />
//                     </SelectTrigger>
//                     <SelectContent>
//                         <SelectItem value="all">All Ratings</SelectItem>
//                         <SelectItem value="4">4 ★ & up</SelectItem>
//                         <SelectItem value="3">3 ★ & up</SelectItem>
//                     </SelectContent>
//                 </Select>
//                 <div className="flex items-center space-x-2">
//                     <Checkbox
//                         checked={filters.verified}
//                         onCheckedChange={(val) =>
//                             setFilters((prev) => ({
//                                 ...prev,
//                                 verified: val as boolean,
//                             }))
//                         }
//                     />
//                     <span className="text-sm font-medium text-gray-700">
//                         Verified only
//                     </span>
//                 </div>
//             </div>

//             {/* Artisan Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                 {artisans.map((artisan: any) => (
//                     <Card
//                         key={artisan._id}
//                         className="shadow hover:shadow-lg transition-shadow"
//                     >
//                         <CardContent className="p-4">
//                             <div className="flex items-center space-x-4 mb-2">
//                                 <img
//                                     src={
//                                         artisan.user?.avatar
//                                             ? `http://localhost:5000${artisan.user.avatar}`
//                                             : "/default-avatar.jpg"
//                                     }
//                                     className="w-14 h-14 rounded-full object-cover"
//                                     alt="avatar"
//                                 />
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-800">
//                                         {artisan.user?.name}
//                                     </h3>
//                                     <p className="text-sm text-gray-600">
//                                         {artisan.jobType?.name}
//                                     </p>
//                                 </div>
//                             </div>
//                             <p className="text-gray-700 text-sm mb-1">
//                                 {artisan.location}
//                             </p>
//                             <p className="text-yellow-500 text-sm">
//                                 {"★".repeat(Math.round(artisan.rating)) +
//                                     "☆".repeat(
//                                         5 - Math.round(artisan.rating)
//                                     )}{" "}
//                                 ({artisan.rating.toFixed(1)})
//                             </p>
//                         </CardContent>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import { Star, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

export default function AllArtisans() {
    const [artisans, setArtisans] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({ jobType: "", location: "" });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchArtisans();
    }, [filters]);

    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data);
    };

    const fetchArtisans = async () => {
        const query = new URLSearchParams(filters).toString();
        const res = await axios.get(
            `http://localhost:5000/api/artisans/all?${query}`
        );
        setArtisans(res.data);
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Filters */}
            <div className="bg-[#eeeeee3d] rounded-2xl shadow-sm px-4 py-3 flex flex-col sm:flex-row gap-4 items-center justify-ceenter mb-10">
                <h3 className="text-xl font-bold text-center ">
                    Artisans Filter :
                </h3>
                <Select
                    onValueChange={(val) => handleFilterChange("jobType", val)}
                >
                    <SelectTrigger className="w-full sm:w-64 bg-white">
                        <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat._id} value={cat._id}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Input
                    type="text"
                    placeholder="Search by location"
                    className="w-full sm:w-64 bg-white"
                    onChange={(e) =>
                        handleFilterChange("location", e.target.value)
                    }
                />
            </div>

            {/* Artisan Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {artisans.map((artisan) => (
                    <div
                        key={artisan._id}
                        className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm mx-auto "
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

                        {/* Name + Role */}
                        <div className="text-center">
                            <h2 className="text-xl font-semibold">
                                {artisan.user?.name || "Unnamed"}
                            </h2>
                            <p className="text-sm text-gray-500">
                                {artisan.jobType?.name} ·{" "}
                                {artisan.location || "N/A"}
                            </p>
                        </div>

                        {/* Rating + Verified */}
                        <div className="flex justify-center items-center gap-2 text-sm mt-3">
                            <div className="flex items-center gap-1 text-yellow-500 font-medium">
                                <Star size={16} fill="currentColor" />
                                {artisan.rating || 0}
                            </div>
                            {artisan.verified && (
                                <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
                                    <ShieldCheck size={14} className="mr-1" />
                                    Verified
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-gray-600 text-center mt-3 line-clamp-2">
                            {artisan.description}
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-5">
                            <Link
                                to={`/artisan/${artisan._id}`}
                                className="w-1/2"
                            >
                                <button className="w-full border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-semibold py-2 rounded-full transition">
                                    View Profile
                                </button>
                            </Link>
                            <Link to={`/book/${artisan._id}`} className="w-1/2">
                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition">
                                    Book Now
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {artisans.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No artisans found.
                </p>
            )}
        </div>
    );
}
