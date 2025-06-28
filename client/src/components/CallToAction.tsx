import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CallToAction() {
    return (
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
    );
}
