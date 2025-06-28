import { useEffect, useState } from "react";
import axios from "axios";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Users, Briefcase, Calendar, Star } from "lucide-react";

const Analytics = () => {
    const [stats, setStats] = useState({
        clients: 0,
        artisans: 0,
        bookings: 0,
        monthlyBookings: [],
    });

    const token = localStorage.getItem("token"); // or context

    const fetchAnalytics = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/stats", {
                // headers: { Authorization: `Bearer ${token}` },
            });
            setStats(res.data);
        } catch (err) {
            console.error("Analytics error:", err);
        }
    };

    useEffect(() => {
        fetchAnalytics();
        console.log(stats);
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Dashboard Analytics</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
                    <Users className="text-blue-600" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Clients</p>
                        <h4 className="text-xl font-semibold">
                            {stats.clients}
                        </h4>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
                    <Briefcase className="text-green-600" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Artisans</p>
                        <h4 className="text-xl font-semibold">
                            {stats.artisans}
                        </h4>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-4 flex items-center gap-4">
                    <Calendar className="text-purple-600" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Bookings</p>
                        <h4 className="text-xl font-semibold">
                            {stats.bookings}
                        </h4>
                    </div>
                </div>
            </div>

            {/* Bookings Chart */}
            <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Bookings</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.monthlyBookings}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">
                    Top Rated Artisans
                </h3>
                <div className="bg-white shadow rounded-lg p-4">
                    {stats.topRated && stats.topRated.length > 0 ? (
                        <ul>
                            {stats.topRated.map((artisan) => (
                                <li
                                    key={artisan.artisanId}
                                    className="flex justify-between py-2 border-b last:border-none"
                                >
                                    <span>
                                        {artisan.name || "Unnamed Artisan"}
                                    </span>
                                    <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                                        <Star className="w-4 h-4" />{" "}
                                        {artisan.avgRating.toFixed(1)} (
                                        {artisan.reviews} reviews)
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">
                            No artisan ratings available.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
