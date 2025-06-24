import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import registerImg from "../assets/register_bg.jpg";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(
                "http://localhost:5000/api/users/login",
                formData
            );
            console.log(res);

            // localStorage.setItem("token", res.data.token);
            // navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${registerImg})` }}
            className="relative bg-center bg-cover bg-no-repeat min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4"
        >
            <div className="absolute inset-0 bg-black opacity-20"></div>
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
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                        >
                            Log In
                        </Button>

                        <p className="mt-4 text-center text-sm text-grey">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-green-600 hover:underline"
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
