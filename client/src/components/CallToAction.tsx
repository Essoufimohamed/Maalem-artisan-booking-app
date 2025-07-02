import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CallToAction() {
    return (
        <section className="text-center py-12 bg-gradient-to-r from-[#f9f9f9] to-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Are You an Artisan?
            </h2>
            <p className="mb-6 text-gray-600">
                Join{" "}
                <span className="font-semibold text-orange-500">Maalem+</span>{" "}
                and grow your business.
            </p>

            <Link to="/register">
                <Button className="rounded-full px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white transition">
                    Join as Artisan
                </Button>
            </Link>
        </section>
    );
}
