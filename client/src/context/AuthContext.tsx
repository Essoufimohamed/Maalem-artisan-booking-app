import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AutContext = createContext();

export default function AuthContext({ children }) {
    const [role, setRole] = useState("");
    const [userId, setUserId] = useState("");
    const [tokenUser, setTokenUser] = useState(
        localStorage.getItem("token") || ""
    );

    const [user, setuser] = useState(null);

    //user login info
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);

                setRole(decoded.role);

                setUserId(decoded.id);

                setTokenUser(token);

                axios
                    .get(`http://localhost:5000/api/users/${decoded.id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((res) => setuser(res.data))
                    .catch((error) => error);
            } catch (error) {
                console.error("Invalid token");
            }
        }
    }, [tokenUser]);

    return (
        <>
            <AutContext.Provider
                value={{ role, userId, setTokenUser, tokenUser, user }}
            >
                {children}
            </AutContext.Provider>
        </>
    );
}
