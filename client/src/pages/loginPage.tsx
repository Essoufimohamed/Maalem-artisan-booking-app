import { useContext, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { jwtDecode } from "jwt-decode";
import axios, { AxiosError } from "axios";
import registerImg from "../assets/register_bg.jpg";
import toast from "react-hot-toast";
import { AutContext } from "@/context/AuthContext";

interface LoginForm {
    email: string;
    password: string;
}

interface DecodedToken {
    id: string;
    role: "admin" | "artisan" | "client";
    // Add more fields if your token includes them
}

const LoginPage = () => {
    const { setTokenUser } = useContext(AutContext);
    const [formData, setFormData] = useState<LoginForm>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post<{ token: string }>(
                "http://localhost:5000/api/users/login",
                formData
            );

            const token = res.data.token;
            localStorage.setItem("token", token);
            setTokenUser(token);

            const decoded = jwtDecode<DecodedToken>(token);
            localStorage.setItem("userId", decoded.id);

            toast.success("Logged in successfully!");

            if (decoded.role === "admin") {
                navigate("/admin");
            } else if (decoded.role === "artisan") {
                const artisanRes = await axios.get(
                    `http://localhost:5000/api/artisans/me/${decoded.id}`
                );
                const artisanProfile = artisanRes.data;
                console.log(artisanProfile);

                if (
                    !artisanProfile ||
                    !artisanProfile.jobType ||
                    !artisanProfile.location
                ) {
                    navigate("/artisanal/create-profile");
                } else {
                    navigate("/artisanal");
                }
            } else if (decoded.role === "client") {
                navigate("/");
            }
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            setError(axiosError.response?.data?.message || "Login failed");
            toast.error("Email or password is incorrect.");
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${registerImg})` }}
            className="relative bg-center bg-cover bg-no-repeat min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4"
        >
            <div className="absolute inset-0 bg-black opacity-20" />
            <Card className="relative z-10 w-full max-w-md shadow-xl rounded-2xl">
                <CardContent className="p-8 space-y-6">
                    <h2 className="text-3xl font-semibold text-center">
                        Welcome Back
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full mt-6 bg-orange-500 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                        >
                            Log In
                        </Button>

                        <p className="mt-4 text-center text-sm text-gray-500">
                            Don&apos;t have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-orange-600 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
