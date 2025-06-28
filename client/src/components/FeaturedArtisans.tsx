import ArtisanCard from "./ArtisanCard";
import type { Artisan } from "@/types";

interface Props {
    artisans: Artisan[];
}

export default function FeaturedArtisans({ artisans }: Props) {
    return (
        <section className="mb-24">
            <h2 className="text-3xl font-bold mb-8 text-center">
                Featured Artisans
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {artisans.map((artisan) => (
                    <ArtisanCard key={artisan._id} artisan={artisan} />
                ))}
            </div>
        </section>
    );
}
