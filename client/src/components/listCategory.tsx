import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Category = {
    _id: string;
    name: string;
    image?: string;
};

export default function CategoryManager() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<{
        name: string;
        image: File | null;
    }>({
        name: "",
        image: null,
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await axios.get<Category[]>(
            "http://localhost:5000/api/categories"
        );
        setCategories(res.data);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        fetchCategories();
    };

    const handleEdit = (category: Category) => {
        setEditingId(category._id);
        setEditData({ name: category.name, image: null });
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", editData.name);
        if (editData.image) formData.append("image", editData.image);

        await axios.put(
            `http://localhost:5000/api/categories/${editingId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        setEditingId(null);
        fetchCategories();
    };

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
                <Card
                    key={cat._id}
                    className="shadow rounded-xl overflow-hidden"
                >
                    {editingId === cat._id ? (
                        <CardContent className="space-y-3">
                            <form onSubmit={handleUpdate} className="space-y-3">
                                <Label htmlFor={`name-${cat._id}`}>
                                    Category Name
                                </Label>
                                <Input
                                    id={`name-${cat._id}`}
                                    value={editData.name}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) =>
                                        setEditData({
                                            ...editData,
                                            image: e.target.files?.[0] ?? null,
                                        })
                                    }
                                />
                                <div className="flex gap-2">
                                    <Button type="submit">Save</Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => setEditingId(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    ) : (
                        <>
                            {cat.image && (
                                <img
                                    src={`http://localhost:5000/${cat.image}`}
                                    alt={cat.name}
                                    className="w-full h-40 object-cover"
                                />
                            )}
                            <CardContent className="space-y-2 p-4">
                                <h2 className="text-lg font-semibold">
                                    {cat.name}
                                </h2>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(cat)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(cat._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </CardContent>
                        </>
                    )}
                </Card>
            ))}
        </div>
    );
}
