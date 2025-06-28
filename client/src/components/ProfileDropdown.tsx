import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = ({
    user,
}: // onLogout,
{
    user: any;
    onLogout: () => void;
}) => {
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                    My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/bookings")}>
                    My Bookings
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ProfileDropdown;
