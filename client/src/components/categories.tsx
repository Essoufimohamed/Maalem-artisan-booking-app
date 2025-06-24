import { Card } from "@/components/ui/card";
import plumberImg from "../assets/plumber.png";
import electricianImg from "../assets/electrician.png";
import carpenterImg from "../assets/carpenter.png";
import painterImg from "../assets/painter.png";
import { useEffect, useState } from "react";
import axios from "axios";

// const categories = [
//     { title: "Plumber", icon: plumberImg },
//     { title: "Electrician", icon: electricianImg },
//     { title: "Carpenter", icon: carpenterImg },
//     { title: "Painter", icon: painterImg },
// ];
export default function Category() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/categories")
            .then((res) => setCategories(res.data));
    }, []);
    return (
        <>
            <section className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-24">
                {categories.map((cat) => (
                    <Card
                        key={cat._id}
                        className="p-5 flex flex-col items-center rounded-2xl hover:shadow-xl transition"
                    >
                        {/* <div className="text-4xl mb-2">{cat.icon}</div> */}
                        <img
                            className="w-[120px]"
                            src={`http://localhost:5000/${cat.image}`}
                            alt={cat.title}
                        />
                        <div className="text-lg capitalize font-medium text-gray-700">
                            {cat.name}
                        </div>
                    </Card>
                ))}
            </section>
        </>
    );
}
