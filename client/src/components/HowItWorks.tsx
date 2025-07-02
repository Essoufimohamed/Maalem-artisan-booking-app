import {
    CalendarDaysIcon,
    EyeIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import MainTitleSections from "./mainTitleSections";

const steps = [
    {
        title: "Search",
        desc: "Find artisans by service and location.",
        icon: <MagnifyingGlassIcon className="h-10 w-10 text-orange-500" />,
    },
    {
        title: "Review",
        desc: "View profiles, reviews, and prices.",
        icon: <EyeIcon className="h-10 w-10 text-orange-500" />,
    },
    {
        title: "Book",
        desc: "Book instantly and get confirmation.",
        icon: <CalendarDaysIcon className="h-10 w-10 text-orange-500" />,
    },
];

export default function HowItWorks() {
    return (
        <section className="text-center  py-12 mx-auto bg-[#fffbf7]">
            <section className="text-center mb-2 px-4 max-w-7xl mx-auto bg-[#fffbf7]">
                <MainTitleSections title={"How It Works"} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {steps.map(({ title, desc, icon }) => (
                        <div
                            key={title}
                            className="bg-white shadow-lg rounded-3xl p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="bg-[#FFF7ED] p-4 rounded-full mb-6">
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
        </section>
    );
}
