// import { useEffect, useState } from "react";
// import Slider from "react-slick";
// import axios from "axios";
// import { Star, ShieldCheck } from "lucide-react";
// import { Link } from "react-router-dom";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// import { ChevronLeft, ChevronRight } from "lucide-react";
// import SecondTitleSections from "./SecondTitleSections";

// const GroupedArtisanCarousels = () => {
//     const [groupedArtisans, setGroupedArtisans] = useState<
//         Record<string, any[]>
//     >({});

//     useEffect(() => {
//         axios
//             .get(`${import.meta.env.VITE_API_URL}/api/artisans`)
//             .then((res) => {
//                 const allArtisans = res.data.artisans ?? res.data;
//                 const grouped: Record<string, any[]> = {};

//                 allArtisans.forEach((artisan: any) => {
//                     const job = artisan.jobType?.name ?? "Other";
//                     if (!grouped[job]) grouped[job] = [];
//                     grouped[job].push(artisan);
//                 });

//                 setGroupedArtisans(grouped);
//             })
//             .catch((err) => console.error("Failed to load artisans", err));
//     }, []);

//     // const sliderSettings = {
//     //     dots: false,
//     //     infinite: false,
//     //     speed: 500,
//     //     slidesToShow: 3,
//     //     slidesToScroll: 1,
//     //     arrows: true,

//     //     responsive: [
//     //         {
//     //             breakpoint: 1024,
//     //             settings: {
//     //                 slidesToShow: 2,
//     //             },
//     //         },
//     //         {
//     //             breakpoint: 640,
//     //             settings: {
//     //                 slidesToShow: 1,
//     //             },
//     //         },
//     //     ],
//     // };
//     const sliderSettings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         arrows: true,
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: { slidesToShow: 2 },
//             },
//             {
//                 breakpoint: 640,
//                 settings: { slidesToShow: 1 },
//             },
//         ],
//     };

//     return (
//         <div className="bg-[#F9F9F9] py-12 px-4 sm:px-6 lg:px-12">
//             {Object.entries(groupedArtisans).map(([jobType, artisans]) => (
//                 <div key={jobType} className="mb-12">
//                     <SecondTitleSections title={jobType} />
//                     {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//                         {jobType}
//                     </h2> */}
//                     <Slider {...sliderSettings}>
//                         {artisans.map((artisan) => (
//                             <div key={artisan._id} className="px-2">
//                                 <div className="bg-white rounded-2xl shadow p-6">
//                                     {/* Avatar */}
//                                     <div className="flex justify-center mb-4">
//                                         <img
//                                             src={
//                                                 artisan.user?.avatar
//                                                     ? `http://localhost:5000${artisan.user.avatar}`
//                                                     : "/default-avatar.png"
//                                             }
//                                             alt={artisan.user?.name}
//                                             className="w-20 h-20 rounded-full object-cover border"
//                                         />
//                                     </div>

//                                     {/* Name & Job */}
//                                     <div className="text-center">
//                                         <h3 className="text-lg font-medium">
//                                             {artisan.user?.name}
//                                         </h3>
//                                         <p className="text-sm text-gray-500">
//                                             {artisan.jobType?.name} ·{" "}
//                                             {artisan.location}
//                                         </p>
//                                     </div>

//                                     {/* Rating & Verified */}
//                                     <div className="flex justify-center gap-2 items-center text-sm mt-3">
//                                         <div className="flex items-center text-yellow-500">
//                                             <Star
//                                                 size={16}
//                                                 fill="currentColor"
//                                                 className="mr-1"
//                                             />
//                                             {artisan.rating}
//                                         </div>
//                                         {artisan.verified && (
//                                             <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
//                                                 <ShieldCheck
//                                                     size={14}
//                                                     className="mr-1"
//                                                 />
//                                                 Verified
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Description */}
//                                     <p className="text-sm text-gray-600 mt-3 line-clamp-3 text-center">
//                                         {artisan.description}
//                                     </p>

//                                     {/* Buttons */}
//                                     <div className="flex gap-2 mt-4">
//                                         <Link
//                                             to={`/artisan/${artisan._id}`}
//                                             className="w-1/2"
//                                         >
//                                             <button className="w-full border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-semibold py-2 rounded-full transition">
//                                                 View
//                                             </button>
//                                         </Link>
//                                         <Link
//                                             to={`/book/${artisan._id}`}
//                                             className="w-1/2"
//                                         >
//                                             <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition">
//                                                 Book
//                                             </button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </Slider>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default GroupedArtisanCarousels;

// const NextArrow = (props: any) => {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={`${className} right-0 z-10`}
//             style={{
//                 ...style,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//             }}
//             onClick={onClick}
//         >
//             <ChevronRight className="w-8 h-8 text-orange-500 bg-white rounded-full shadow hover:bg-orange-500 hover:text-white transition" />
//         </div>
//     );
// };

// const PrevArrow = (props: any) => {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={`${className} left-0 z-10`}
//             style={{
//                 ...style,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//             }}
//             onClick={onClick}
//         >
//             <ChevronLeft className="w-8 h-8 text-orange-500 bg-white rounded-full shadow hover:bg-orange-500 hover:text-white transition" />
//         </div>
//     );
// };

import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Star, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SecondTitleSections from "./SecondTitleSections";

const GroupedArtisanCarousels = () => {
    const [groupedArtisans, setGroupedArtisans] = useState<
        Record<string, any[]>
    >({});

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/api/artisans`)
            .then((res) => {
                const allArtisans = res.data.artisans ?? res.data;
                const grouped: Record<string, any[]> = {};

                allArtisans.forEach((artisan: any) => {
                    const job = artisan.jobType?.name ?? "Other";
                    if (!grouped[job]) grouped[job] = [];
                    grouped[job].push(artisan);
                });

                setGroupedArtisans(grouped);
            })
            .catch((err) => console.error("Failed to load artisans", err));
    }, []);

    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div className="bg-[#F9F9F9] py-12 px-4 sm:px-6 lg:px-12">
            {Object.entries(groupedArtisans).map(([jobType, artisans]) => (
                <div key={jobType} className="mb-12">
                    <SecondTitleSections title={jobType} />
                    <div className="relative">
                        <Slider {...sliderSettings}>
                            {artisans.map((artisan) => (
                                <div key={artisan._id} className="px-2">
                                    <div className="bg-white rounded-2xl shadow p-6">
                                        {/* Avatar */}
                                        <div className="flex justify-center mb-4">
                                            <img
                                                src={
                                                    artisan.user?.avatar
                                                        ? `http://localhost:5000${artisan.user.avatar}`
                                                        : "/default-avatar.png"
                                                }
                                                alt={artisan.user?.name}
                                                className="w-20 h-20 rounded-full object-cover border"
                                            />
                                        </div>

                                        {/* Name & Job */}
                                        <div className="text-center">
                                            <h3 className="text-lg font-medium">
                                                {artisan.user?.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {artisan.jobType?.name} ·{" "}
                                                {artisan.location}
                                            </p>
                                        </div>

                                        {/* Rating & Verified */}
                                        <div className="flex justify-center gap-2 items-center text-sm mt-3">
                                            <div className="flex items-center text-yellow-500">
                                                <Star
                                                    size={16}
                                                    fill="currentColor"
                                                    className="mr-1"
                                                />
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
                                        <p className="text-sm text-gray-600 mt-3 line-clamp-2 text-center">
                                            {artisan.description}
                                        </p>

                                        {/* Buttons */}
                                        <div className="flex gap-2 mt-4">
                                            <Link
                                                to={`/artisan/${artisan._id}`}
                                                className="w-1/2"
                                            >
                                                <button className="w-full border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-semibold py-2 rounded-full transition">
                                                    View
                                                </button>
                                            </Link>
                                            <Link
                                                to={`/book/${artisan._id}`}
                                                className="w-1/2"
                                            >
                                                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-full transition">
                                                    Book
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        {artisans.length > 6 && (
                            <div className="mt-10 rounded-2xl  p-6 flex items-center justify-center">
                                <Link to="/artisans">
                                    <button className="px-10 w-full border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 font-semibold py-2 rounded-full transition">
                                        See More
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroupedArtisanCarousels;

// Custom Arrows

const NextArrow = ({ onClick }: any) => (
    <div
        className="absolute top-1/2 -translate-y-1/2 right-1 z-20 cursor-pointer"
        onClick={onClick}
    >
        <ChevronRight className="w-8 h-8 text-orange-500 bg-white rounded-full shadow ring-2 ring-orange-200 hover:bg-orange-500 hover:text-white transition" />
    </div>
);

const PrevArrow = ({ onClick }: any) => (
    <div
        className="absolute top-1/2 -translate-y-1/2 left-1 z-20 cursor-pointer"
        onClick={onClick}
    >
        <ChevronLeft className="w-8 h-8 text-orange-500 bg-white rounded-full shadow ring-2 ring-orange-200 hover:bg-orange-500 hover:text-white transition" />
    </div>
);
