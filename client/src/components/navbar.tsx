// import { Link } from "react-router-dom";

// const Navbar = () => {
//     const user = {
//         name: "Mohamed", // replace with dynamic user name
//         avatar: "/assets/avatar.png", // replace with dynamic avatar path
//     };

//     return (
//         <header className="bg-white shadow-sm sticky top-0 z-50">
//             <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
//                 {/* Logo */}
//                 <Link
//                     to="/"
//                     className="flex items-center gap-2 text-xl font-bold text-gray-800"
//                 >
//                     <img src="/logo.svg" alt="Maalem+" className="h-8 w-auto" />
//                     Maalem+
//                 </Link>

//                 {/* Navigation Links */}
//                 <nav className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
//                     <Link to="/" className="hover:text-orange-500 transition">
//                         Home
//                     </Link>
//                     <Link
//                         to="/artisans"
//                         className="hover:text-orange-500 transition"
//                     >
//                         Artisans
//                     </Link>
//                     <Link
//                         to="/about"
//                         className="hover:text-orange-500 transition"
//                     >
//                         About
//                     </Link>
//                     <Link
//                         to="/contact"
//                         className="hover:text-orange-500 transition"
//                     >
//                         Contact
//                     </Link>
//                 </nav>

//                 {/* User Profile */}
//                 <div className="flex items-center gap-3">
//                     <img
//                         src={user.avatar}
//                         alt={user.name}
//                         className="w-8 h-8 rounded-full object-cover border"
//                     />
//                     <span className="text-sm font-medium text-gray-700">
//                         {user.name}
//                     </span>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = {
        name: "Mohamed",
        avatar: "/assets/avatar.png",
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-2 text-xl font-bold text-gray-800"
                >
                    <img src="/logo.svg" alt="Maalem+" className="h-8 w-auto" />
                    Maalem+
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-gray-600 font-medium">
                    <Link to="/" className="hover:text-orange-500 transition">
                        Home
                    </Link>
                    <Link
                        to="/artisans"
                        className="hover:text-orange-500 transition"
                    >
                        Artisans
                    </Link>
                    <Link
                        to="/about"
                        className="hover:text-orange-500 transition"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:text-orange-500 transition"
                    >
                        Contact
                    </Link>
                </nav>

                {/* Profile Dropdown */}
                <div className="relative group">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-8 h-8 rounded-full object-cover border"
                        />
                        <span className="hidden md:block text-sm font-medium text-gray-700">
                            {user.name}
                        </span>
                    </div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-10">
                        <Link
                            to="/profile"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <User size={16} /> Profile
                        </Link>
                        <button
                            onClick={() => console.log("Logout")}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden ml-4 text-gray-700"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
                    <Link
                        to="/"
                        className="block text-gray-700 hover:text-orange-500"
                    >
                        Home
                    </Link>
                    <Link
                        to="/artisans"
                        className="block text-gray-700 hover:text-orange-500"
                    >
                        Artisans
                    </Link>
                    <Link
                        to="/about"
                        className="block text-gray-700 hover:text-orange-500"
                    >
                        About
                    </Link>
                    <Link
                        to="/contact"
                        className="block text-gray-700 hover:text-orange-500"
                    >
                        Contact
                    </Link>
                    <hr />
                    <Link
                        to="/profile"
                        className="block text-gray-700 hover:text-orange-500"
                    >
                        Profile
                    </Link>
                    <button
                        onClick={() => console.log("Logout")}
                        className="block text-left text-gray-700 hover:text-orange-500 w-full"
                    >
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Navbar;
