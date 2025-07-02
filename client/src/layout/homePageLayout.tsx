import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Navbar1 } from "@/components/navbar1";

import { Outlet } from "react-router-dom";

export default function HomePageLayout() {
    return (
        <>
            <Navbar1 />
            {/* <Navbar /> */}
            <Outlet />
            <Footer />
        </>
    );
}
