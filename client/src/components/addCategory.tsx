import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
export default function AddCategory({ editCategory, onSuccess }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    // Prefill form if editing
    useEffect(() => {
        if (editCategory) {
            setName(editCategory.name);
            setPreview(`http://localhost:5000/${editCategory.image}`);
        } else {
            setName("");
            setImage(null);
            setPreview(null);
        }
    }, [editCategory]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("image", image);

        try {
            if (editCategory) {
                // PUT for update
                await axios.put(
                    `http://localhost:5000/api/categories/${editCategory._id}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                toast.success("Category updated!");
                // alert("Category updated!");
            } else {
                // POST for add
                await axios.post(
                    "http://localhost:5000/api/categories",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                toast.success("Category added!");
                // alert("Category added!");
            }

            setName("");
            setImage(null);
            setPreview(null);
            onSuccess?.(); // refresh + close
        } catch (err) {
            console.error(err);
            toast.error("Operation failed.");
            // alert("Operation failed.");
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl border bg-white">
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <Label htmlFor="name">Category Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Plumbing, Electrician"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="image">
                            Category Image {editCategory ? "(optional)" : ""}
                        </Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {preview && (
                        <div className="mt-2 rounded overflow-hidden border">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    )}

                    <Button type="submit" className="w-full">
                        {editCategory ? "Update Category" : "Add Category"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
