import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/homePage";
// import DashboardAdmin from "./layout/dashboard-admin";

import HomePageLayout from "./layout/homePageLayout";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
// import ArtisanRegistrationChart from "./components/ArtisanRegistrationChart";
import Dashboard from "./pages/admin/dasboard";
import ArtisanDashboard from "./pages/artisanal/ArtisanlDashboard";
import ArtisanProfile from "./pages/clientPages/ArtisanProfile";
import MessagesPage from "./pages/artisanal/messagesPage";
import ClientMessagesPage from "./pages/clientPages/ClientMessagesPage";
import ClientBookingsPage from "./pages/clientPages/ClientBookingsPage";
import AllArtisansPage from "./pages/AllArtisansPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
    return (
        <>
            {/* <ArtisanProfilePage /> */}
            {/* <RegisterForm /> */}
            <Routes>
                <Route path="/" element={<HomePageLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="artisan/:id" element={<ArtisanProfile />} />
                    <Route
                        path="/chat/:artisanId?"
                        element={<MessagesPage />}
                    />

                    <Route
                        path="clientmessage"
                        // element={<ClientMessagesPage />}
                        element={<MessagesPage />}
                    />
                    <Route
                        path="clientbooking"
                        element={<ClientBookingsPage />}
                    />
                    <Route path="/artisans" element={<AllArtisansPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
                {/* <Route path="/dashboard/admin" element={<DashboardAdmin />}>
                    <Route index element={<ArtisanRegistrationChart />} />
                    <Route
                        path="/dashboard/admin/category"
                        element={<AddCategory />}
                    />
                    <Route
                        path="/dashboard/admin/category_list"
                        element={<CategoryManager />}
                    />
                </Route> */}
                <Route path="/admin/*" element={<Dashboard />} />
                <Route path="/artisanal/*" element={<ArtisanDashboard />} />

                {/* <Route path="/artisanal/" element={<ArtisanProfilePage />} /> */}
            </Routes>

            <Toaster position="top-right" />
        </>
    );
}

export default App;
