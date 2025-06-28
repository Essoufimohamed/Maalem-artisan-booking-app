import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const UserDropdown = ({ user, role }) => {
    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="group flex items-center gap-3 px-3 py-1.5 rounded-lg bg-transparant hover:bg-[#e6e6e6]   transition-all">
                    <img
                        src={
                            `http://localhost:5000${user.avatar}` ||
                            "/default-avatar.png"
                        }
                        alt="avatar"
                        className="w-9 h-9 rounded-md object-cover border border-gray-300"
                    />
                    <div className="text-left hidden sm:block">
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-[#3D5F44] transition">
                            {user.name?.split(" ")[0] || "User"}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                            {role}
                        </p>
                    </div>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56 mt-2 rounded-xl shadow-lg bg-white border"
            >
                <DropdownMenuLabel className="text-[#3D5F44] text-sm font-medium">
                    Welcome, {user.name?.split(" ")[0]}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link
                        to={`/${role}/dashboard`}
                        className="flex items-center gap-2 text-sm"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        to={`/${role}/profile`}
                        className="flex items-center gap-2 text-sm"
                    >
                        <User className="w-4 h-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        to={`/${role}/settings`}
                        className="flex items-center gap-2 text-sm"
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 text-sm text-red-600 cursor-pointer"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
