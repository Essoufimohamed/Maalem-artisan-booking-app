import React from "react";

const projects = [
    {
        id: 1,
        title: "Handcrafted Jewelry",
        imageUrl:
            "https://images.unsplash.com/photo-1506748686217-7b4b1e9f4f9f",
        description: "Delicate silver jewelry pieces crafted with precision.",
    },
    {
        id: 2,
        title: "Pottery Making",
        imageUrl:
            "https://images.unsplash.com/photo-1506748686217-7b4b1e9f4f9f",
        description: "Hand-thrown pottery showcasing traditional techniques.",
    },
    {
        id: 3,
        title: "Leather Crafting",
        imageUrl:
            "https://images.unsplash.com/photo-1506748686217-7b4b1e9f4f9f",
        description: "Custom leather goods made with quality materials.",
    },
    {
        id: 4,
        title: "Woodworking",
        imageUrl:
            "https://images.unsplash.com/photo-1506748686217-7b4b1e9f4f9f",
        description:
            "Bespoke wooden furniture crafted with attention to detail.",
    },
    {
        id: 5,
        title: "Metalworking",
        imageUrl:
            "https://images.unsplash.com/photo-1506748686217-7b4b1e9f4f9f",
        description: "Artistic metal sculptures and functional items.",
    },
    {
        id: 6,
        title: "Textile Weaving",
        imageUrl:
            "https://images.unsplash.com/photo-1506748686217-7b4b1e9f4f9f",
        description: "Handwoven textiles using traditional methods.",
    },
];

export default function GalleryOfWork() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-semibold mb-8 text-center">
                Gallery of Work
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {projects.map(({ id, title, imageUrl, description }) => (
                    <div
                        key={id}
                        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                    >
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h3 className="text-lg font-semibold">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm">{description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
