import axios from "axios";
import { useEffect, useState } from "react";
import MainTitleSections from "./mainTitleSections";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/categories/with-count")
            .then((res) => {
                setCategories(res.data);
            })
            .catch((error) => {
                console.log("Failed to fetch", error);
            });
    }, []);
    console.log(categories);

    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <MainTitleSections title={"Categories"} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {categories.map((category, idx) => (
                    <button
                        key={idx}
                        className="bg-white hover:bg-orange-50 text-gray-800 border rounded-xl p-4 flex flex-col items-center gap-2 transition shadow-sm"
                    >
                        <div className="bg-orange-50 p-2 rounded-full">
                            <img
                                src={`http://localhost:5000/${category.image}`}
                                alt={category.name}
                                className="w-20 bg-orange-50 p-2 rounded-full"
                            />
                        </div>

                        <span className="text-sm font-medium">
                            {category.name.charAt(0).toUpperCase() +
                                category.name.slice(1).toLowerCase()}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
