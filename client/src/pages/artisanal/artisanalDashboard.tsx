// src/components/layouts/ArtisanDashboardLayout.jsx
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { Home, Calendar, MessageCircle, User } from "lucide-react";
import MessagesPage from "./messagesPage";

export default function ArtisanDashboardLayout() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6 space-y-6">
                <h2 className="text-2xl font-bold">Maalem+</h2>
                <nav className="flex flex-col gap-4">
                    <Link
                        to="/artisanal/"
                        className="flex items-center gap-2 hover:text-yellow-400"
                    >
                        <Home size={20} /> Dashboard
                    </Link>
                    <Link
                        to="/artisanal/bookings"
                        className="flex items-center gap-2 hover:text-yellow-400"
                    >
                        <Calendar size={20} /> Bookings
                    </Link>
                    <Link
                        to="/artisanal/messages"
                        className="flex items-center gap-2 hover:text-yellow-400"
                    >
                        <MessageCircle size={20} /> Messages
                    </Link>
                    <Link
                        to="/artisanal/profile"
                        className="flex items-center gap-2 hover:text-yellow-400"
                    >
                        <User size={20} /> Profile
                    </Link>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                {/* <Outlet /> */}
                <Routes>
                    <Route path="messages" element={<MessagesPage />} />
                </Routes>
            </main>
        </div>
    );
}
