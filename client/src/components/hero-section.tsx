import { MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

import heroImage from "../assets/hero.jpg";

export default function HeroSection() {
    return (
        <div
            className="relative bg-cover bg-center py-20"
            style={{ backgroundImage: `url(${heroImage})` }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-0" />

            {/* Main Content */}
            <section className="relative z-10 text-center mb-24 px-4">
                <h1 className="text-5xl font-extrabold text-white leading-tight">
                    Find Verified <span className="text-yellow">Artisans</span>{" "}
                    Near You
                </h1>
                <p className="text-xl text-white mt-4">
                    Trusted plumbers, electricians, carpenters & more — book in
                    minutes.
                </p>

                <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                    <Input
                        placeholder="What do you need? (e.g., Plumber)"
                        className="w-full md:w-1/3 rounded-2xl shadow-md bg-white"
                    />
                    <div className="relative w-full md:w-1/4">
                        <Input
                            placeholder="Your location"
                            className="rounded-2xl shadow-md pl-10 bg-white"
                        />
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <Button className="rounded-2xl px-6 shadow-md text-white">
                        Search
                    </Button>
                </div>
            </section>
        </div>
    );
}
