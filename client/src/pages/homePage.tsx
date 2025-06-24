import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero-section";
import Category from "@/components/categories";
import { Link } from "react-router-dom";

const artisans = [
    {
        name: "Mohamed El Maalem",
        job: "Electrician",
        rating: 4.8,
        location: "Agadir",
        image: "/uploads/mohamed.jpg",
    },
];

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <div className="px-6 py-16 max-w-7xl mx-auto font-sans">
                {/* Categories */}
                <Category />

                {/* How It Works */}
                <section className="text-center mb-24">
                    <h2 className="text-3xl font-bold mb-10">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-6 rounded-2xl">
                            <CardContent>
                                <h3 className="font-semibold text-lg mb-2">
                                    1. Search
                                </h3>
                                <p className="text-gray-600">
                                    Find artisans by service and location.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="p-6 rounded-2xl">
                            <CardContent>
                                <h3 className="font-semibold text-lg mb-2">
                                    2. Review
                                </h3>
                                <p className="text-gray-600">
                                    View profiles, reviews, and prices.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="p-6 rounded-2xl">
                            <CardContent>
                                <h3 className="font-semibold text-lg mb-2">
                                    3. Book
                                </h3>
                                <p className="text-gray-600">
                                    Book instantly and get confirmation.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Featured Artisans */}
                <section className="mb-24">
                    <h2 className="text-3xl font-bold mb-8 text-center">
                        Featured Artisans
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {artisans.map((artisan, i) => (
                            <Card
                                key={i}
                                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition"
                            >
                                <img
                                    src={artisan.image}
                                    alt={artisan.name}
                                    className="w-full h-48 object-cover"
                                />
                                <CardContent className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {artisan.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {artisan.job} • {artisan.location}
                                    </p>
                                    <p className="text-sm mt-1 text-yellow-500">
                                        ⭐ {artisan.rating}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center py-12 bg-gradient-to-r from-[#f9f9f9] to-white rounded-2xl">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        Are You an Artisan?
                    </h2>
                    <p className="mb-4 text-gray-600">
                        Join Maalem+ and grow your business
                    </p>
                    <Button className="rounded-full px-6 py-2 text-white">
                        <Link to={"/register"}>Join as Artisan</Link>
                    </Button>
                </section>
            </div>
        </>
    );
}
