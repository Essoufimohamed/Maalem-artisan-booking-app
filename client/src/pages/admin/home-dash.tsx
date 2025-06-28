import { useEffect, useState } from "react";
import axios from "axios";
import {
    Users,
    Hammer,
    ClipboardList,
    Star,
    PlusCircle,
    RefreshCcw,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios("http://localhost:5000/api/stats");
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };

        fetchStats();
    }, []);

    if (!stats) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Admin Dashboard
            </h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    icon={<Users className="text-blue-500 w-6 h-6" />}
                    label="Clients"
                    value={stats.clients}
                    color="blue"
                />
                <StatCard
                    icon={<Hammer className="text-green-500 w-6 h-6" />}
                    label="Artisans"
                    value={stats.artisans}
                    color="green"
                />
                <StatCard
                    icon={<ClipboardList className="text-purple-500 w-6 h-6" />}
                    label="Bookings"
                    value={stats.bookings}
                    color="purple"
                />
            </div>

            {/* Chart + Top Rated */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Monthly Bookings Chart */}
                <div className="col-span-2 bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">
                        Monthly Bookings
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={stats.monthlyBookings}>
                            <XAxis dataKey="month" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar
                                dataKey="count"
                                fill="#4F46E5"
                                radius={[5, 5, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Top Rated Artisans */}
                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center gap-2">
                        <Star className="text-yellow-500" /> Top Rated Artisans
                    </h2>
                    <ul className="space-y-4">
                        {stats.topRated.map((artisan) => (
                            <li
                                key={artisan.artisanId}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <div className="text-gray-800 font-medium capitalize">
                                        {artisan.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {artisan.reviews} reviews
                                    </div>
                                </div>
                                <div className="text-yellow-500 font-semibold text-lg">
                                    ★ {artisan.avgRating.toFixed(1)}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-10">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Quick Actions
                </h2>
                <div className="flex gap-4 flex-wrap">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition">
                        <PlusCircle className="w-5 h-5" /> Add Artisan
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">
                        <PlusCircle className="w-5 h-5" /> Add Category
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition">
                        <RefreshCcw className="w-5 h-5" /> Refresh Stats
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, color }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 flex items-center space-x-4">
            <div className={`bg-${color}-100 p-3 rounded-full`}>{icon}</div>
            <div>
                <div className="text-sm text-gray-500">{label}</div>
                <div className="text-2xl font-bold text-gray-800">{value}</div>
            </div>
        </div>
    );
}
