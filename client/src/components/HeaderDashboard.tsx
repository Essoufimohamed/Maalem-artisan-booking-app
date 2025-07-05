// import { Bell, Settings } from "lucide-react";

// const DashboardHeader = ({ user, unreadCount = 0 }) => {
//     return (
//         <header className="rounded-xl w-full px-6 py-4 bg-gray-50 shadow-sm border-b flex flex-col sm:flex-row items-center justify-between gap-4">
//             {/* Left: Welcome Message */}
//             <div className="flex items-center gap-3">
//                 <img
//                     src={
//                         `http://localhost:5000${user?.avatar}` ||
//                         "/default-avatar.png"
//                     }
//                     alt="avatar"
//                     className="w-10 h-10 rounded-full object-cover border border-orange-200"
//                 />
//                 <div>
//                     <p className="text-sm text-gray-500">Welcome back,</p>
//                     <h2 className="text-lg font-semibold text-orange-900">
//                         {user?.name || "User"}
//                     </h2>
//                 </div>
//             </div>

//             {/* Right: Actions */}
//             <div className="flex items-center gap-4">
//                 <div className="relative">
//                     <button className="p-2 rounded-full hover:bg-orange-100 transition">
//                         <Bell className="w-5 h-5 text-orange-600" />
//                     </button>
//                     {unreadCount > 0 && (
//                         <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
//                             {unreadCount > 9 ? "9+" : unreadCount}
//                         </span>
//                     )}
//                 </div>
//                 <button className="p-2 rounded-full hover:bg-orange-100 transition">
//                     <Settings className="w-5 h-5 text-orange-600" />
//                 </button>
//                 <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition shadow">
//                     Upgrade Plan
//                 </button>
//             </div>
//         </header>
//     );
// };

// export default DashboardHeader;

import { useState, useEffect, useRef } from "react";
import { Bell, Settings, X } from "lucide-react";

const DashboardHeader = ({ user, unreadCount = 0, notifications = [] }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="rounded-md w-full px-6 py-4 bg-white shadow-sm border-b flex flex-col sm:flex-row items-center justify-between gap-4 z-10 relative">
            {/* Left: User info */}
            <div className="flex items-center gap-3">
                <img
                    src={user?.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border border-orange-200"
                />
                <div>
                    <p className="text-sm text-gray-500">Welcome back,</p>
                    <h2 className="text-lg font-semibold text-orange-900">
                        {user?.name || "User"}
                    </h2>
                </div>
            </div>

            {/* Right: Notifications and actions */}
            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                {/* 🔔 Notification bell */}
                <div className="relative">
                    <button
                        className="p-2 rounded-full hover:bg-orange-100 transition relative"
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                    >
                        <Bell className="w-5 h-5 text-orange-600" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        )}
                    </button>

                    {/* 🔽 Notification Dropdown */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white border border-orange-100 rounded-lg shadow-md z-20 overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2 bg-orange-50 border-b text-orange-800 font-semibold">
                                <span>Notifications</span>
                                <button
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="hover:text-orange-600 transition"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {notifications.length === 0 ? (
                                <div className="p-4 text-sm text-gray-500">
                                    No new notifications.
                                </div>
                            ) : (
                                <ul className="divide-y divide-orange-100 max-h-80 overflow-y-auto">
                                    {notifications.map(
                                        (notification, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-3 text-sm hover:bg-orange-50 transition"
                                            >
                                                <p className="text-orange-900 font-medium">
                                                    {notification.title}
                                                </p>
                                                <p className="text-gray-600 text-xs mt-1">
                                                    {notification.message}
                                                </p>
                                            </li>
                                        )
                                    )}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                {/* ⚙️ Settings */}
                <button className="p-2 rounded-full hover:bg-orange-100 transition">
                    <Settings className="w-5 h-5 text-orange-600" />
                </button>

                {/* 🔼 Upgrade CTA */}
                <button className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition shadow">
                    Upgrade Plan
                </button>
            </div>
        </header>
    );
};

export default DashboardHeader;
