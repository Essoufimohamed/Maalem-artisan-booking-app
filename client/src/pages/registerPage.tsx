import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import registerImg from "../assets/register_bg.jpg";
const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "client",
        avatar: null,
    });

    const [preview, setPreview] = useState<string | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "avatar" && files?.[0]) {
            const file = files[0];
            setFormData((prev) => ({ ...prev, avatar: file }));
            setPreview(URL.createObjectURL(file));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleRoleChange = (value) => {
        setFormData((prev) => ({ ...prev, role: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) form.append(key, value);
            });

            const res = await axios.post(
                "http://localhost:5000/api/users/register",
                form,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log("success", res);

            // localStorage.setItem("token", res.data.token);
            // navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div
            style={{ backgroundImage: `url(${registerImg})` }}
            className="relative bg-center bg-cover bg-no-repeat min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-indigo-100 px-6 py-12"
        >
            <div className="absolute inset-0 bg-black opacity-20"></div>
            <Card className="relative z-10 w-full max-w-xl shadow-2xl rounded-3xl border border-indigo-200 overflow-hidden">
                <CardContent className="p-10 space-y-8">
                    <h2 className="text-4xl font-extrabold text-black text-center tracking-tight">
                        Create Your Account
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        encType="multipart/form-data"
                        noValidate
                    >
                        <div>
                            <Label
                                htmlFor="name"
                                className="font-semibold text-black"
                            >
                                Full Name
                            </Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 rounded-lg border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor="email"
                                className="font-semibold text-black"
                            >
                                Email Address
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 rounded-lg border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor="phone"
                                className="font-semibold text-black"
                            >
                                Phone Number
                            </Label>
                            <Input
                                type="tel"
                                name="phone"
                                placeholder="+212 6XX XXX XXX"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="mt-1 rounded-lg border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
                            />
                        </div>

                        <div>
                            <Label className="font-semibold text-black">
                                Role
                            </Label>
                            <Select
                                onValueChange={handleRoleChange}
                                defaultValue={formData.role}
                                className="mt-1 rounded-lg"
                            >
                                <SelectTrigger className="border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition rounded-lg">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="client">
                                        Client
                                    </SelectItem>
                                    <SelectItem value="artisan">
                                        Artisan
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label
                                htmlFor="avatar"
                                className="font-semibold text-black"
                            >
                                Profile Picture (optional)
                            </Label>
                            <Input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={handleChange}
                                className="mt-1"
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="avatar preview"
                                    className="mt-3 w-24 h-24 rounded-full object-cover border-2 border-indigo-400 shadow-sm"
                                />
                            )}
                        </div>

                        <div>
                            <Label
                                htmlFor="password"
                                className="font-semibold text-black"
                            >
                                Password
                            </Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 rounded-lg border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
                            />
                        </div>

                        <div>
                            <Label
                                htmlFor="confirmPassword"
                                className="font-semibold text-black"
                            >
                                Confirm Password
                            </Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="mt-1 rounded-lg border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 font-medium mt-2">
                                {error}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
                        >
                            Register
                        </Button>
                        <p className="mt-4 text-center text-sm text-grey">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-green-600 hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default RegisterPage;
