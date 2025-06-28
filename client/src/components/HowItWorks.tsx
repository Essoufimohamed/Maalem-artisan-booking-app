import {
    CalendarDaysIcon,
    EyeIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const steps = [
    {
        title: "Search",
        desc: "Find artisans by service and location.",
        icon: <MagnifyingGlassIcon className="h-10 w-10 text-[#3D5F44]" />,
    },
    {
        title: "Review",
        desc: "View profiles, reviews, and prices.",
        icon: <EyeIcon className="h-10 w-10 text-[#3D5F44]" />,
    },
    {
        title: "Book",
        desc: "Book instantly and get confirmation.",
        icon: <CalendarDaysIcon className="h-10 w-10 text-[#3D5F44]" />,
    },
];

export default function HowItWorks() {
    return (
        <section className="text-center mb-24 px-4 max-w-7xl mx-auto">
            <h2 className="text-4xl font-extrabold mb-12 text-gray-900 relative inline-block after:block after:w-16 after:h-1 after:bg-yellow-700 after:mt-2 after:mx-auto">
                How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {steps.map(({ title, desc, icon }) => (
                    <div
                        key={title}
                        className="bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="bg-yellow-100 p-4 rounded-full mb-6">
                            {icon}
                        </div>
                        <h3 className="font-semibold text-xl mb-3 text-gray-900">
                            {title}
                        </h3>
                        <p className="text-gray-600 max-w-xs">{desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
