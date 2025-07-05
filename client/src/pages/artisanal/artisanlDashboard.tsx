// import { Route, Routes } from "react-router-dom";
// import SideBarArtisanal from "./sidebarArtisanal";
// import MessagesPage from "./messagesPage";
// import ArtisanProfilePage from "@/layout/ArtisanProfilePage";
// import CreateArtisanProfile from "@/layout/CreateArtisanProfile";
// import ArtisanDashboardProfile from "./artisanDashboardProfile";
// import BookingsPage from "./bookingArtisanalPage";

// export default function ArtisanlDashboard() {
//     return (
//         <>
//             <div className="flex">
//                 <SideBarArtisanal />
//                 <main className="ml-64 w-full p-6 bg-gray-100 min-h-screen">
//                     <Routes>
//                         {/* <Route index element={<DashboardHome />} /> */}
//                         <Route path="messages" element={<MessagesPage />} />
//                         <Route path="bookings" element={<BookingsPage />} />
//                         <Route
//                             path="profile"
//                             element={<ArtisanDashboardProfile />}
//                         />
//                         <Route
//                             path="create-profile"
//                             element={<CreateArtisanProfile />}
//                         />
//                     </Routes>
//                 </main>
//             </div>
//             {/* <ArtisanDashboardLayout /> */}
//         </>
//     );
// }

import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import SideBarArtisanal from "./sidebarArtisanal";
import MessagesPage from "./messagesPage";
import ArtisanProfilePage from "@/layout/ArtisanProfilePage";
import CreateArtisanProfile from "@/layout/CreateArtisanProfile";
import ArtisanDashboardProfile from "./artisanDashboardProfile";
import BookingsPage from "./bookingArtisanalPage";
import { Menu } from "lucide-react";
import DashboardHeader from "@/components/HeaderDashboard";
import { AutContext } from "@/context/AuthContext";

export default function ArtisanlDashboard() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useContext(AutContext);

    const notifications = [
        {
            title: "Booking Confirmed",
            message:
                "Your appointment with Ahmed the Electrician is confirmed.",
        },
        {
            title: "New Message",
            message: "You have a new message from Youssef the Plumber.",
        },
        {
            title: "Profile Approved",
            message: "Your artisan profile is now verified.",
        },
    ];

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <SideBarArtisanal
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden ml-0 ">
                {/* Topbar (mobile menu button) */}
                <header className="md:hidden flex items-center justify-between bg-white px-4 py-3 border-b shadow-sm">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        <Menu size={24} />
                    </button>
                    <h1 className="text-lg font-semibold">Artisan Dashboard</h1>
                    <div></div>
                </header>

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-2">
                    <DashboardHeader
                        user={user}
                        unreadCount={3}
                        notifications={notifications}
                    />
                    <Routes>
                        <Route path="messages" element={<MessagesPage />} />
                        <Route path="messages/:id" element={<MessagesPage />} />
                        <Route path="bookings" element={<BookingsPage />} />
                        <Route
                            path="profile"
                            element={<ArtisanDashboardProfile />}
                        />
                        <Route
                            path="create-profile"
                            element={<CreateArtisanProfile />}
                        />
                    </Routes>
                </main>
            </div>
        </div>
    );
}
