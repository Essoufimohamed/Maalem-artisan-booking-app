import * as React from "react";
import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const data = {
    user: {
        name: "Admin",
        email: "admin@maalem.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Category",
            url: "/category",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "Add category",
                    url: "/dashboard/admin/category",
                },
                {
                    title: "All gategory",
                    url: "/dashboard/admin/category_list",
                },
            ],
        },
        {
            title: "Artisanls",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Latest artisanals",
                    url: "#",
                },
                {
                    title: "All artisanals",
                    url: "#",
                },
            ],
        },
        {
            title: "Platform Ads",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Add ads",
                    url: "#",
                },
                {
                    title: "List of ads",
                    url: "#",
                },
            ],
        },
        {
            title: "Statistics",
            url: "#",
            icon: Settings2,
            // items: [
            //     {
            //         title: "General",
            //         url: "#",
            //     },
            //     {
            //         title: "Team",
            //         url: "#",
            //     },
            //     {
            //         title: "Billing",
            //         url: "#",
            //     },
            //     {
            //         title: "Limits",
            //         url: "#",
            //     },
            // ],
        },
    ],
    // navSecondary: [
    //     {
    //         title: "Support",
    //         url: "#",
    //         icon: LifeBuoy,
    //     },
    //     {
    //         title: "Feedback",
    //         url: "#",
    //         icon: Send,
    //     },
    // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link to="/">
                                {/* <img src="/public/maalem_logo.png" /> */}
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">
                                        Acme Inc
                                    </span>
                                    <span className="truncate text-xs">
                                        Enterprise
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
