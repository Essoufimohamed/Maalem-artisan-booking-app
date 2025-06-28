import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { CirclePlus } from "lucide-react";
import AddCategory from "./addCategory";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [addCategory, setAddCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(
                "http://localhost:5000/api/categories/with-count"
            );
            setCategories(res.data);
        } catch (err) {
            console.error("Failed to fetch", err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDeleteCategory = async (id) => {
        if (!confirm("Are you sure you want to delete this category?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/categories/${id}`);
            setCategories(categories.filter((cat) => cat._id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const handleAddCategory = () => {
        setAddCategory(!addCategory);
        setEditCategory(null);
        fetchCategories();
    };

    return (
        <>
            <Button className="mb-3 bg-blue-800" onClick={handleAddCategory}>
                <CirclePlus className="mr-2" />{" "}
                {addCategory ? "Close" : "Add Category"}
            </Button>

            {addCategory && (
                <AddCategory
                    editCategory={editCategory}
                    onSuccess={() => {
                        fetchCategories();
                        setEditCategory(null);
                        setAddCategory(false);
                    }}
                />
            )}

            <div className="overflow-x-auto mb-24">
                <table className="min-w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-3 text-left">Image</th>
                            <th className="px-6 py-3 text-left">
                                Category Name
                            </th>
                            <th className="px-6 py-3 text-left">
                                Artisan Count
                            </th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {categories.map((cat) => (
                            <tr
                                key={cat._id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">
                                    <img
                                        src={`http://localhost:5000/${cat.image}`}
                                        alt={cat.name}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 capitalize font-medium">
                                    {cat.name}
                                </td>
                                <td className="px-6 py-4">
                                    {cat.artisanCount || 0}
                                </td>
                                <td className="px-6 py-4 space-x-2">
                                    <button
                                        onClick={() => {
                                            setEditCategory(cat);
                                            setAddCategory(true);
                                        }}
                                        className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDeleteCategory(cat._id)
                                        }
                                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
