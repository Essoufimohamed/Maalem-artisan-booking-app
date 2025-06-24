// import { useState } from "react";
// import axios from "axios";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export default function AddCategory() {
//     const [title, setTitle] = useState("");
//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(null);

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//         setPreview(URL.createObjectURL(file));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!title || !image) return alert("Both fields are required");

//         const formData = new FormData();
//         formData.append("title", title);
//         formData.append("image", image);

//         try {
//             const res = await axios.post(
//                 "http://localhost:5000/api/uploads",
//                 formData,
//                 {
//                     headers: { "Content-Type": "multipart/form-data" },
//                 }
//             );
//             alert("Upload successful!");
//             setTitle("");
//             setImage(null);
//             setPreview(null);
//         } catch (err) {
//             console.error(err);
//             alert("Upload failed");
//         }
//     };

//     return (
//         <Card className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-2xl border border-gray-200 bg-white">
//             <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div className="space-y-2">
//                         <Label htmlFor="title">Image Title</Label>
//                         <Input
//                             id="title"
//                             type="text"
//                             placeholder="Enter a catchy title"
//                             value={title}
//                             onChange={(e) => setTitle(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="space-y-2">
//                         <Label htmlFor="image">Upload Image</Label>
//                         <Input
//                             id="image"
//                             type="file"
//                             accept="image/*"
//                             onChange={handleImageChange}
//                             required
//                         />
//                     </div>

//                     {preview && (
//                         <div className="rounded-lg overflow-hidden">
//                             <img
//                                 src={preview}
//                                 alt="Preview"
//                                 className="w-full h-48 object-cover rounded-lg border"
//                             />
//                         </div>
//                     )}

//                     <Button type="submit" className="w-full">
//                         Upload Image
//                     </Button>
//                 </form>
//             </CardContent>
//         </Card>
//     );
// }
import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AddCategory() {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

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
            await axios.post("http://localhost:5000/api/categories", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Category added!");
            setName("");
            setImage(null);
            setPreview(null);
        } catch (err) {
            console.error(err);
            alert("Error adding category.");
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
                        <Label htmlFor="image">Category Image (optional)</Label>
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
                        Add Category
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
