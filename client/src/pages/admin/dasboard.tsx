import { Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/admin/Dashboard";
import Bookings from "./Bookings";
import Clients from "./clientsList";
import Artisans from "./artisans";
import Analytics from "./analytics";
import SideBar from "./sidebar";
import Category from "@/components/categories";
import DashboardHome from "./home-dash";
import ArtisanProfilePage from "@/layout/ArtisanProfilePage";
import ArtisanProfile from "../clientPages/ArtisanProfile";

export default function Dashboard() {
    return (
        <div className="flex">
            <SideBar />
            <main className="ml-64 w-full p-6 bg-gray-100 min-h-screen">
                <Routes>
                    <Route index element={<DashboardHome />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="category" element={<Category />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="artisans" element={<Artisans />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="artisans/:id" element={<ArtisanProfile />} />
                </Routes>
                {/* <Routes>
                    <Route path="/admin" element={<DashboardHome />} />
                    <Route path="/admin/bookings" element={<Bookings />} />
                    <Route path="/admin/category" element={<Category />} />
                    <Route path="/admin/clients" element={<Clients />} />
                    <Route path="/admin/artisans" element={<Artisans />} />
                    <Route path="/admin/analytics" element={<Analytics />} />
                    <Route
                        path="/admin/artisans/:id"
                        element={<ArtisanProfilePage />}
                    />

                </Routes> */}
            </main>
        </div>
    );
}
