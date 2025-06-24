import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type Category = {
    _id: string;
    name: string;
};

type AvailabilityItem = {
    day: string;
    available: boolean;
};

export default function CreateArtisanProfile() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState({
        // user: "685357b7ba1d8dd0fd14d71f",
        jobType: "",
        description: "",
        experienceYears: "",
        location: "",
        pricingEstimate: "",

        portfolio: [] as File[],
    });

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/categories")
            .then((res) => setCategories(res.data));
    }, []);

    const handleInput = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePortfolioUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFormData((prev) => ({ ...prev, portfolio: Array.from(files) }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const submitData = new FormData();

        // submitData.append("user", formData.user);
        submitData.append("jobType", formData.jobType);
        submitData.append("description", formData.description);
        submitData.append("experienceYears", formData.experienceYears);
        submitData.append("location", formData.location);
        submitData.append("pricingEstimate", formData.pricingEstimate);

        formData.portfolio.forEach((file) => {
            submitData.append("portfolio", file);
        });

        try {
            await axios
                .post("http://localhost:5000/api/artisans", submitData, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then((res) => console.log(res.data));
            // navigate("/dashboard");
        } catch (error) {
            console.error("Error creating artisan profile:", error);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto p-6 mt-6">
            <CardContent>
                <h1 className="text-xl font-bold mb-4">
                    Create Artisan Profile
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Job Category</Label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInput}
                            className="w-full border rounded p-2"
                            required
                        >
                            <option value="">Select</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div>
                        <Label>Experience (years)</Label>
                        <Input
                            type="number"
                            name="experienceYears"
                            value={formData.experienceYears}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div>
                        <Label>Location</Label>
                        <Input
                            name="location"
                            value={formData.location}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div>
                        <Label>Pricing Estimate</Label>
                        <Input
                            name="pricingEstimate"
                            value={formData.pricingEstimate}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div>
                        <Label>Portfolio Images</Label>
                        <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePortfolioUpload}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Create Profile
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
