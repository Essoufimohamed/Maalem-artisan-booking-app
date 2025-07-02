// import React, { useContext } from "react";
// import {
//     Menu,
//     LogIn,
//     UserPlus,
//     LogOut,
//     User,
//     CalendarCheck,
// } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion";

// import { Button } from "@/components/ui/button";
// import {
//     NavigationMenu,
//     NavigationMenuContent,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList,
//     NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import {
//     Sheet,
//     SheetContent,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet";
// import { AutContext } from "@/context/AuthContext";
// import UserDropdown from "./UserDropDown";
// import logoFix from "/public/logo.png";
// interface MenuItem {
//     title: string;
//     url: string;
//     description?: string;
//     icon?: React.ReactNode;
//     items?: MenuItem[];
// }

// interface Navbar1Props {
//     logo?: {
//         url: string;
//         src: string;
//         alt: string;
//     };
//     menu?: MenuItem[];
//     auth?: {
//         login: {
//             title: string;
//             url: string;
//         };
//         signup: {
//             title: string;
//             url: string;
//         };
//     };
// }

// const Navbar1 = ({
//     logo = {
//         url: "/",
//         src: logoFix,
//         // src: "./maalem_logo.png",
//         alt: "logo",
//     },
//     menu = [
//         { title: "Home", url: "/" },
//         { title: "Artisans", url: "/artisans" },
//         { title: "About", url: "/about" },
//         { title: "Contact", url: "/contact" },
//     ],
//     auth = {
//         login: { title: "Login", url: "/login" },
//         signup: { title: "Sign up", url: "/register" },
//     },
// }: Navbar1Props) => {
//     const location = useLocation();
//     const { user } = useContext(AutContext);
//     // #fdf2c3
//     return (
//         <section className="py-4 bg-[#E7E5E1]">
//             <div className="container m-auto">
//                 {/* Desktop Menu */}
//                 <nav className="hidden justify-between lg:flex items-center">
//                     <div className="flex items-center gap-6">
//                         <Link to={logo.url} className="flex items-center gap-2">
//                             <img
//                                 src={logo.src}
//                                 className="max-h-10"
//                                 alt={logo.alt}
//                             />
//                         </Link>
//                     </div>
//                     <div className="flex items-center">
//                         <NavigationMenu>
//                             <NavigationMenuList>
//                                 {menu.map((item) =>
//                                     renderMenuItem(item, location.pathname)
//                                 )}
//                             </NavigationMenuList>
//                         </NavigationMenu>
//                     </div>
//                     <div className="flex gap-3">
//                         {/* <Button
//                             asChild
//                             size="sm"
//                             className="border-[#3D5F44] border hover:bg-[#3d5f4493] hover:text-[#fff] bg-transparent text-black"
//                         >
//                             <Link
//                                 to={auth.login.url}
//                                 className="flex items-center gap-1"
//                             >
//                                 <LogIn className="h-4 w-4" />
//                                 {auth.login.title}
//                             </Link>
//                         </Button>
//                         <Button
//                             asChild
//                             size="sm"
//                             className="rounded-md bg-[#3D5F44] text-white"
//                         >
//                             <Link
//                                 to={auth.signup.url}
//                                 className="inline-flex items-center gap-1"
//                             >
//                                 <UserPlus className="h-4 w-4" />
//                                 {auth.signup.title}
//                             </Link>
//                         </Button> */}
//                         {user ? (
//                             user && (
//                                 <UserDropdown user={user} role={user.role} />
//                             )
//                         ) : (
//                             <div className="flex gap-3">
//                                 <Button
//                                     asChild
//                                     size="sm"
//                                     className="border-[#3D5F44] border hover:bg-[#3d5f4493] hover:text-[#fff] bg-transparent text-black"
//                                 >
//                                     <Link
//                                         to={auth.login.url}
//                                         className="flex items-center gap-1"
//                                     >
//                                         <LogIn className="h-4 w-4" />
//                                         {auth.login.title}
//                                     </Link>
//                                 </Button>
//                                 <Button
//                                     asChild
//                                     size="sm"
//                                     className="rounded-md bg-[#3D5F44] text-white"
//                                 >
//                                     <Link
//                                         to={auth.signup.url}
//                                         className="inline-flex items-center gap-1"
//                                     >
//                                         <UserPlus className="h-4 w-4" />
//                                         {auth.signup.title}
//                                     </Link>
//                                 </Button>
//                             </div>
//                         )}
//                     </div>
//                 </nav>

//                 {/* Mobile Menu */}
//                 <div className="block lg:hidden">
//                     <div className="flex items-center justify-between">
//                         <Link to={logo.url} className="flex items-center gap-2">
//                             <img
//                                 src={logo.src}
//                                 className="max-h-8"
//                                 alt={logo.alt}
//                             />
//                         </Link>
//                         <Sheet>
//                             <SheetTrigger asChild>
//                                 <Button variant="outline" size="icon">
//                                     <Menu className="h-6 w-6" />
//                                 </Button>
//                             </SheetTrigger>

//                             <SheetContent className="overflow-y-auto">
//                                 <SheetHeader>
//                                     <SheetTitle>
//                                         <Link
//                                             to={logo.url}
//                                             className="flex items-center gap-2"
//                                         >
//                                             <img
//                                                 src={logo.src}
//                                                 className="max-h-8"
//                                                 alt={logo.alt}
//                                             />
//                                         </Link>
//                                     </SheetTitle>
//                                 </SheetHeader>

//                                 <div className="flex flex-col gap-6 p-4">
//                                     <Accordion
//                                         type="single"
//                                         collapsible
//                                         className="flex w-full flex-col gap-4"
//                                     >
//                                         {menu.map((item) =>
//                                             renderMobileMenuItem(item)
//                                         )}
//                                     </Accordion>

//                                     <div className="flex flex-col gap-3">
//                                         <Button asChild variant="outline">
//                                             <Link to={auth.login.url}>
//                                                 {auth.login.title}
//                                             </Link>
//                                         </Button>
//                                         <Button asChild>
//                                             <Link to={auth.signup.url}>
//                                                 {auth.signup.title}
//                                             </Link>
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </SheetContent>
//                         </Sheet>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// const renderMenuItem = (item: MenuItem, currentPath: string) => {
//     if (item.items) {
//         return (
//             <NavigationMenuItem key={item.title}>
//                 <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
//                 <NavigationMenuContent className="bg-popover text-popover-foreground">
//                     {item.items.map((subItem) => (
//                         <NavigationMenuLink
//                             asChild
//                             key={subItem.title}
//                             className="w-80"
//                         >
//                             <SubMenuLink item={subItem} />
//                         </NavigationMenuLink>
//                     ))}
//                 </NavigationMenuContent>
//             </NavigationMenuItem>
//         );
//     }

//     const isActive = currentPath === item.url;

//     return (
//         <NavigationMenuItem key={item.title}>
//             <NavigationMenuLink
//                 href={item.url}
//                 className={`group inline-flex h-10 w-max items-center justify-center rounded-md border-b-2 px-4 py-2 text-sm font-medium transition-colors hover:bg-[#D68C53] hover:text-[#fff] ${
//                     isActive
//                         ? "border-b-[#3D5F44] text-[#3D5F44]"
//                         : "border-b-[#3D5F44]"
//                 }`}
//             >
//                 {item.title}
//             </NavigationMenuLink>
//         </NavigationMenuItem>
//     );
// };

// const renderMobileMenuItem = (item: MenuItem) => {
//     if (item.items) {
//         return (
//             <AccordionItem
//                 key={item.title}
//                 value={item.title}
//                 className="border-b-0"
//             >
//                 <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
//                     {item.title}
//                 </AccordionTrigger>
//                 <AccordionContent className="mt-2">
//                     {item.items.map((subItem) => (
//                         <SubMenuLink key={subItem.title} item={subItem} />
//                     ))}
//                 </AccordionContent>
//             </AccordionItem>
//         );
//     }

//     return (
//         <Link key={item.title} to={item.url} className="text-md font-semibold">
//             {item.title}
//         </Link>
//     );
// };

// const SubMenuLink = ({ item }: { item: MenuItem }) => {
//     return (
//         <Link
//             to={item.url}
//             className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
//         >
//             <div className="text-foreground">{item.icon}</div>
//             <div>
//                 <div className="text-sm font-semibold">{item.title}</div>
//                 {item.description && (
//                     <p className="text-sm leading-snug text-muted-foreground">
//                         {item.description}
//                     </p>
//                 )}
//             </div>
//         </Link>
//     );
// };

// export { Navbar1 };

// Modern, Styled Navbar UI (React + Tailwind + Shadcn + Lucide Icons)
// Updated with modern color palette: #FF6B00 (Primary), #1E1E1E (Title), #F0A500 (Accent), #F9F9F9 (Background), #4D4D4D (Text)

import React, { useContext } from "react";
import { Menu, LogIn, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AutContext } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import UserDropdown from "./UserDropDown";
import logoFix from "/public/logo.png";

const Navbar1 = ({
    logo = { url: "/", src: logoFix, alt: "logo" },
    menu = [
        { title: "Home", url: "/" },
        { title: "Artisans", url: "/artisans" },
        { title: "About", url: "/about" },
        { title: "Contact", url: "/contact" },
    ],
    auth = {
        login: { title: "Login", url: "/login" },
        signup: { title: "Sign up", url: "/register" },
    },
}) => {
    const location = useLocation();
    const { user } = useContext(AutContext);

    return (
        <header className="bg-white shadow-sm py-3 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-4 lg:px-0">
                {/* Logo */}
                <Link to={logo.url} className="flex items-center gap-2">
                    <img src={logo.src} alt={logo.alt} className="h-10" />
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center gap-10">
                    <NavigationMenu>
                        <NavigationMenuList>
                            {menu.map((item) =>
                                renderMenuItem(item, location.pathname)
                            )}
                        </NavigationMenuList>
                    </NavigationMenu>
                </nav>

                {/* Auth Buttons / User Dropdown */}
                <div className="hidden lg:flex items-center gap-4">
                    {user ? (
                        <UserDropdown user={user} role={user.role} />
                    ) : (
                        <>
                            <Button
                                asChild
                                variant="outline"
                                className="border-[#FF6B00] text-[#1E1E1E] hover:bg-[#FF6B00] hover:text-white"
                            >
                                <Link
                                    to={auth.login.url}
                                    className="flex items-center gap-1"
                                >
                                    <LogIn className="h-4 w-4" />{" "}
                                    {auth.login.title}
                                </Link>
                            </Button>
                            <Button
                                asChild
                                className="bg-[#FF6B00] text-white hover:bg-[#F0A500]"
                            >
                                <Link
                                    to={auth.signup.url}
                                    className="flex items-center gap-1"
                                >
                                    <UserPlus className="h-4 w-4" />{" "}
                                    {auth.signup.title}
                                </Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-[#FF6B00] text-[#1E1E1E]"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-64 bg-[#F9F9F9]"
                        >
                            <SheetHeader>
                                <SheetTitle>
                                    <Link
                                        to={logo.url}
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            className="h-8"
                                        />
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="mt-4 space-y-6">
                                <Accordion type="single" collapsible>
                                    {menu.map((item) =>
                                        renderMobileMenuItem(item)
                                    )}
                                </Accordion>
                                <div className="space-y-2">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full border-[#FF6B00] text-[#1E1E1E] hover:bg-[#FF6B00] hover:text-white"
                                    >
                                        <Link to={auth.login.url}>
                                            {auth.login.title}
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        className="w-full bg-[#FF6B00] text-white hover:bg-[#F0A500]"
                                    >
                                        <Link to={auth.signup.url}>
                                            {auth.signup.title}
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

const renderMenuItem = (item, currentPath) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className="text-[#1E1E1E] hover:text-[#FF6B00]">
                    {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title}>
                            <SubMenuLink item={subItem} />
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    const isActive = currentPath === item.url;

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[#FF6B00] hover:text-white ${
                    isActive ? "text-[#FF6B00] font-semibold" : "text-[#4D4D4D]"
                }`}
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title}>
                <AccordionTrigger className="text-[#1E1E1E]">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent>
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <Link
            key={item.title}
            to={item.url}
            className="block py-2 text-sm text-[#4D4D4D]"
        >
            {item.title}
        </Link>
    );
};

const SubMenuLink = ({ item }) => (
    <Link
        to={item.url}
        className="flex gap-3 rounded-md p-2 text-sm hover:bg-[#F0A500] hover:text-white"
    >
        <div>{item.icon}</div>
        <div>
            <div className="font-medium text-[#1E1E1E]">{item.title}</div>
            {item.description && (
                <div className="text-xs text-[#4D4D4D]">{item.description}</div>
            )}
        </div>
    </Link>
);

export { Navbar1 };
