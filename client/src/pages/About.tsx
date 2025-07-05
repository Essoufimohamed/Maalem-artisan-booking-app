import React from "react";
import { Target, Hammer, Star, Globe } from "lucide-react";

const About: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                    About Us
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Learn more about our mission, what we offer, and why we're
                    committed to connecting artisans with the people who need
                    them.
                </p>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mission Card */}
                <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-2 mb-3 text-orange-500">
                        <Target className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Our Mission</h2>
                    </div>
                    <p className="text-gray-700">
                        We aim to empower local artisans by giving them a
                        trusted platform to showcase their work, build their
                        reputation, and connect with people looking for
                        reliable, skilled services.
                    </p>
                </div>

                {/* What We Offer Card */}
                <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-2 mb-3 text-orange-500">
                        <Hammer className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">What We Offer</h2>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>
                            Verified artisan profiles with portfolios and
                            ratings
                        </li>
                        <li>Transparent pricing and direct bookings</li>
                        <li>Responsive support for clients and artisans</li>
                        <li>
                            Trusted platform for local jobs and long-term
                            projects
                        </li>
                    </ul>
                </div>

                {/* Why Choose Us Card */}
                <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-2 mb-3 text-orange-500">
                        <Star className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">
                            Why Choose Us?
                        </h2>
                    </div>
                    <p className="text-gray-700">
                        Our platform is built for trust. All artisans go through
                        a verification process, and clients can view real
                        reviews, work samples, and availability before making a
                        booking.
                    </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
                    <div className="flex items-center gap-2 mb-3 text-orange-500">
                        <Globe className="w-5 h-5" />
                        <h2 className="text-xl font-semibold">Our Vision</h2>
                    </div>
                    <p className="text-gray-700">
                        We see a future where every artisan in Morocco and
                        beyond has the tools and visibility to grow, and where
                        clients can find talent they trust — instantly, locally,
                        and reliably.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
