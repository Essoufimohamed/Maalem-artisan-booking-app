import React, { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    CheckBadgeIcon,
} from "@heroicons/react/24/solid";

type Artisan = {
    id: number;
    name: string;
    specialty: string;
    location: string;
    verified: boolean;
    available: boolean;
    image: string;
    rating: number;
};

const artisans: Artisan[] = [
    {
        id: 1,
        name: "Ahmed Benyahia",
        specialty: "Woodworking",
        location: "Agadir",
        verified: true,
        available: true,
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.9,
    },
    {
        id: 2,
        name: "Fatima Zahra",
        specialty: "Pottery",
        location: "Marrakech",
        verified: true,
        available: false,
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.7,
    },
    {
        id: 3,
        name: "Youssef El Amrani",
        specialty: "Plumbing",
        location: "Casablanca",
        verified: false,
        available: true,
        image: "https://randomuser.me/api/portraits/men/41.jpg",
        rating: 4.8,
    },
    {
        id: 4,
        name: "Salma Bouzid",
        specialty: "Electrician",
        location: "Rabat",
        verified: true,
        available: true,
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 4.6,
    },
    {
        id: 5,
        name: "Hamza Lahlou",
        specialty: "Masonry",
        location: "Essaouira",
        verified: true,
        available: false,
        image: "https://randomuser.me/api/portraits/men/78.jpg",
        rating: 4.9,
    },
];

const FeaturedArtisansCarousel: React.FC = () => {
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 1,
            spacing: 16,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 2, spacing: 16 },
            },
            "(min-width: 1024px)": {
                slides: { perView: 3, spacing: 20 },
            },
        },
    });

    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
                🌟 Featured Artisans
            </h2>

            <div className="relative">
                <div ref={sliderRef} className="keen-slider">
                    {artisans.map((artisan) => (
                        <div key={artisan.id} className="keen-slider__slide">
                            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition duration-300">
                                <div className="relative w-24 h-24 mx-auto mb-4">
                                    <img
                                        src={artisan.image}
                                        alt={artisan.name}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                    {artisan.verified && (
                                        <CheckBadgeIcon className="w-6 h-6 text-blue-500 absolute -bottom-1 -right-1 bg-white rounded-full shadow" />
                                    )}
                                </div>

                                <h3 className="text-lg font-semibold">
                                    {artisan.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {artisan.specialty}
                                </p>

                                <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                        📍 {artisan.location}
                                    </span>
                                    <span
                                        className={`px-2 py-1 rounded-full ${
                                            artisan.available
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {artisan.available
                                            ? "Available"
                                            : "Unavailable"}
                                    </span>
                                </div>

                                <p className="mt-3 text-yellow-500 font-medium">
                                    ⭐ {artisan.rating}
                                </p>

                                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                {instanceRef.current && (
                    <>
                        <button
                            onClick={() => instanceRef.current?.prev()}
                            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                        >
                            <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                        </button>
                        <button
                            onClick={() => instanceRef.current?.next()}
                            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                        >
                            <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                        </button>
                    </>
                )}
            </div>
        </section>
    );
};

export default FeaturedArtisansCarousel;
