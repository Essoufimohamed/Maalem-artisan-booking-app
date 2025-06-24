import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import DashboardAdmin from "./layout/dashboard-admin";
import AddCategory from "./components/addCategory";
import CategoryManager from "./components/listCategory";
import ArtisanProfilePage from "./layout/ArtisanProfilePage";
import CreateArtisanProfile from "./layout/CreateArtisanProfile";
import HomePageLayout from "./layout/homePageLayout";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import ArtisanRegistrationChart from "./components/ArtisanRegistrationChart";
function App() {
    return (
        <>
            {/* <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard/admin" element={<DashboardAdmin />}>
                    <Route
                        path="/dashboard/admin/category"
                        element={<AddCategory />}
                    />
                    <Route
                        path="/dashboard/admin/category_list"
                        element={<CategoryManager />}
                    />
                </Route>
            </Routes> */}
            {/* <ArtisanProfilePage /> */}
            {/* <RegisterForm /> */}
            <Routes>
                <Route path="/" element={<HomePageLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>

                <Route path="/dashboard/admin" element={<DashboardAdmin />}>
                    <Route index element={<ArtisanRegistrationChart />} />
                    {/* <Route
                        path="/dashboard/admin/category"
                        element={<AddCategory />}
                    />
                    <Route
                        path="/dashboard/admin/category_list"
                        element={<CategoryManager />}
                    /> */}
                </Route>

                <Route path="create" element={<CreateArtisanProfile />} />
            </Routes>
        </>
    );
}

export default App;
