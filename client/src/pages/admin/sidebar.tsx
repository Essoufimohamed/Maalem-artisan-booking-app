import { Link, useLocation } from "react-router-dom";
import {
    Home,
    ClipboardCheck,
    Users,
    BarChart2,
    Boxes,
    Settings,
    LogOut,
} from "lucide-react";
import logo from "../../../public/maalem_logo.png";

const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <Home size={18} /> },
    { name: "Categories", path: "/admin/category", icon: <Boxes size={18} /> },
    {
        name: "Bookings",
        path: "/admin/bookings",
        icon: <ClipboardCheck size={18} />,
    },
    { name: "Artisans", path: "/admin/artisans", icon: <Users size={18} /> },
    { name: "Clients", path: "/admin/clients", icon: <Users size={18} /> },
    {
        name: "Analytics",
        path: "/admin/analytics",
        icon: <BarChart2 size={18} />,
    },
];

export default function SideBar() {
    const location = useLocation();

    return (
        <aside className="md:fixed w-64 h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">
            <section className=" px-6 py-5 border-b">
                <Link to={"/"} className="flex items-center">
                    <img src={logo} alt="Maalem+ Logo" className="w-10 h-8" />
                    <h2 className="ml-3 text-xl font-bold text-gray-800">
                        Maalem+
                    </h2>
                </Link>
            </section>

            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 p-4">
                    {menuItems.map(({ name, path, icon }) => {
                        const isActive = location.pathname === path;
                        return (
                            <li key={name}>
                                <Link
                                    to={path}
                                    className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                                        isActive
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {icon}
                                    <span className="font-medium">{name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <ul className="border-t px-4 py-3 space-y-1 bg-gray-50">
                <li>
                    <Link
                        to="/admin/settings"
                        className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>
                </li>
                <li>
                    <button
                        onClick={() => {
                            console.log("Logging out...");
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-red-100 text-red-600"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </li>
            </ul>
        </aside>
    );
}
