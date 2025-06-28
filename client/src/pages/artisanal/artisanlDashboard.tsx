import { Route, Routes } from "react-router-dom";
import ArtisanDashboardLayout from "./artisanalDashboard";
import SideBarArtisanal from "./sidebarArtisanal";
import MessagesPage from "./messagesPage";
import ArtisanProfilePage from "@/layout/ArtisanProfilePage";
import CreateArtisanProfile from "@/layout/CreateArtisanProfile";
import ArtisanDashboardProfile from "./artisanDashboardProfile";
import BookingsPage from "./bookingArtisanalPage";

export default function artisanlDashboard() {
    return (
        <>
            <div className="flex">
                <SideBarArtisanal />
                <main className="ml-64 w-full p-6 bg-gray-100 min-h-screen">
                    <Routes>
                        {/* <Route index element={<DashboardHome />} /> */}
                        <Route path="messages" element={<MessagesPage />} />
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
            {/* <ArtisanDashboardLayout /> */}
        </>
    );
}
