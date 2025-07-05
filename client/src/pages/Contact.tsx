import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact: React.FC = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", form);
        // Add logic to send data to your backend (e.g. email API or server route)
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Contact Us
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Have a question, suggestion, or want to work with us? Send
                    us a message and we'll get back to you as soon as possible.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="bg-white shadow rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-orange-500 mb-4">
                        Get in Touch
                    </h2>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-orange-500" />
                            support@maalem.com
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-orange-500" />
                            +212 6 72 00 00 00
                        </li>
                        <li className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-orange-500" />
                            Agadir, Morocco
                        </li>
                    </ul>
                </div>

                {/* Contact Form */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow rounded-2xl p-6 space-y-4"
                >
                    <h2 className="text-xl font-semibold text-orange-500 mb-2">
                        Send a Message
                    </h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                    ></textarea>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center gap-2 transition"
                    >
                        <Send className="w-4 h-4" />
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
