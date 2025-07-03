// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import HeroSection from "@/components/hero-section";
// // import Category from "@/components/categories";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//     MagnifyingGlassIcon,
//     EyeIcon,
//     CalendarDaysIcon,
// } from "@heroicons/react/24/outline";
// import { CheckBadgeIcon } from "@heroicons/react/24/solid";

// const artisans = [
//     {
//         name: "Mohamed El Maalem",
//         job: "Electrician",
//         rating: 4.8,
//         location: "Agadir",
//         image: "/uploads/mohamed.jpg",
//     },
// ];

// export default function HomePage() {
//     const [profiles, setProfiles] = useState([]);
//     const { artisans, totalPages, currentPage } = profiles;
//     useEffect(() => {
//         axios
//             .get(`http://localhost:5000/api/artisans`)
//             .then((res) => {
//                 setProfiles(res.data);
//                 console.log(res.data);
//             })
//             .catch((err) => console.error("Error loading profile:", err));
//     }, []);

//     return (
//         <>
//             <HeroSection />
//             <div className="px-6 py-16 max-w-7xl mx-auto font-sans">
//                 {/* Categories */}
//                 {/* <Category /> */}

//                 {/* How It Works */}
//                 <section className="text-center mb-24 px-4 max-w-7xl mx-auto">
//                     <h2 className="text-4xl font-extrabold mb-12 text-gray-900 relative inline-block after:block after:w-16 after:h-1 after:bg-yellow-700 after:mt-2 after:mx-auto">
//                         How It Works
//                     </h2>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//                         {/* Step 1: Search */}
//                         <div className="bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
//                             <div className="bg-yellow-100 p-4 rounded-full mb-6">
//                                 <MagnifyingGlassIcon className="h-10 w-10 text-[#3D5F44]" />
//                             </div>
//                             <h3 className="font-semibold text-xl mb-3 text-gray-900">
//                                 1. Search
//                             </h3>
//                             <p className="text-gray-600 max-w-xs">
//                                 Find artisans by service and location.
//                             </p>
//                         </div>

//                         {/* Step 2: Review */}
//                         <div className="bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
//                             <div className="bg-yellow-100 p-4 rounded-full mb-6">
//                                 <EyeIcon className="h-10 w-10 text-[#3D5F44]" />
//                             </div>
//                             <h3 className="font-semibold text-xl mb-3 text-gray-900">
//                                 2. Review
//                             </h3>
//                             <p className="text-gray-600 max-w-xs">
//                                 View profiles, reviews, and prices.
//                             </p>
//                         </div>

//                         {/* Step 3: Book */}
//                         <div className="bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
//                             <div className="bg-yellow-100 p-4 rounded-full mb-6">
//                                 <CalendarDaysIcon className="h-10 w-10 text-[#3D5F44]" />
//                             </div>
//                             <h3 className="font-semibold text-xl mb-3 text-gray-900">
//                                 3. Book
//                             </h3>
//                             <p className="text-gray-600 max-w-xs">
//                                 Book instantly and get confirmation.
//                             </p>
//                         </div>
//                     </div>
//                 </section>

//                 {/* Featured Artisans */}
//                 <section className="mb-24">
//                     <h2 className="text-3xl font-bold mb-8 text-center">
//                         Featured Artisans
//                     </h2>

//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                         {artisans?.map((artisan, i) => (
//                             <div
//                                 key={i}
//                                 className="block rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 bg-white"
//                             >
//                                 <img
//                                     src={
//                                         artisan.user?.avatar
//                                             ? `${import.meta.env.VITE_API_URL}${
//                                                   artisan.user.avatar
//                                               }`
//                                             : "/default-avatar.jpg"
//                                     }
//                                     alt={artisan.user?.name || "Artisan"}
//                                     className="w-full h-48 object-cover"
//                                 />

//                                 <CardContent className="p-5 space-y-3">
//                                     <div className="flex items-center justify-between">
//                                         <h3 className="text-xl font-bold text-gray-900">
//                                             {artisan.user?.name}
//                                         </h3>
//                                         {artisan.user?.verified && (
//                                             <CheckBadgeIcon
//                                                 className="h-5 w-5 text-indigo-500"
//                                                 title="Verified"
//                                             />
//                                         )}
//                                     </div>

//                                     <p className="text-sm text-gray-500">
//                                         {artisan.jobType.name}{" "}
//                                         <span className="text-gray-400">•</span>{" "}
//                                         {artisan.location}
//                                     </p>

//                                     {/* ⭐ Star Rating */}
//                                     <div className="flex items-center gap-1 text-yellow-500 text-sm">
//                                         {Array.from({ length: 5 }).map(
//                                             (_, idx) => (
//                                                 <span key={idx}>
//                                                     {idx <
//                                                     Math.round(artisan.rating)
//                                                         ? "★"
//                                                         : "☆"}
//                                                 </span>
//                                             )
//                                         )}
//                                         <span className="ml-1 text-gray-600">
//                                             ({artisan.rating.toFixed(1)})
//                                         </span>
//                                     </div>

//                                     {/* 💰 Price */}
//                                     <div className="text-gray-800 font-medium text-sm">
//                                         {artisan.pricingEstimate} MAD
//                                     </div>

//                                     {/* Buttons */}
//                                     <div className="pt-4 flex gap-2">
//                                         <Link
//                                             to={`/artisan/${artisan._id}`}
//                                             className="text-sm px-4 py-2 rounded-xl border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition"
//                                         >
//                                             View Profile
//                                         </Link>
//                                         <Link
//                                             to={`/artisan/${artisan._id}#booking`}
//                                             className="text-sm px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
//                                         >
//                                             Book Now
//                                         </Link>
//                                     </div>
//                                 </CardContent>
//                             </div>
//                         ))}
//                     </div>
//                 </section>

//                 {/* CTA */}
//                 <section className="text-center py-12 bg-gradient-to-r from-[#f9f9f9] to-white rounded-2xl">
//                     <h2 className="text-2xl font-bold mb-2 text-gray-800">
//                         Are You an Artisan?
//                     </h2>
//                     <p className="mb-4 text-gray-600">
//                         Join Maalem+ and grow your business
//                     </p>
//                     <Button className="rounded-full px-6 py-2 text-white">
//                         <Link to={"/register"}>Join as Artisan</Link>
//                     </Button>
//                 </section>
//             </div>
//         </>
//     );
// }

import { useEffect, useState } from "react";
import axios from "axios";

import HeroSection from "@/components/hero-section";
import HowItWorks from "@/components/HowItWorks";
// import FeaturedArtisans from "@/components/FeaturedArtisans";
import CallToAction from "@/components/CallToAction";
import type { Artisan } from "@/types";

import ArtisanCard from "../pages/ArtisanCard.tsx";
import CategoryList from "@/components/CategoryList.tsx";
import TopArtisanFilters from "@/components/TopArtisanFilters.tsx";
import GalleryOfWork from "@/components/galleryWork.tsx";
import FeaturedArtisansCarousel from "@/components/FeaturedArtisansCarousel.tsx";
import GroupedArtisanCarousels from "@/components/GroupedArtisanCarousels.tsx";

export default function HomePage() {
    const [artisans, setArtisans] = useState<Artisan[]>([]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/artisans`)
            .then((res) => {
                setArtisans(res.data.artisans ?? res.data);
            })
            .catch((err) => console.error("Error loading artisans:", err));
    }, []);

    return (
        <>
            <HeroSection />
            {/* <div className="px-6 py-16 max-w-7xl mx-auto font-sans"> */}
            <HowItWorks />
            <CategoryList />
            <GroupedArtisanCarousels />

            {/* <FeaturedArtisansCarousel /> */}
            {/* </div> */}
            {/* <TopArtisanFilters /> */}
            <CallToAction />
            {/* <ArtisanCard /> */}
            {/* <FeaturedArtisans artisans={artisans} /> */}
            {/* <GalleryOfWork /> */}
        </>
    );
}
