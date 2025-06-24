import { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

const ArtisanRegistrationChart = () => {
    const [data, setData] = useState([]);
    const [period, setPeriod] = useState("month");

    useEffect(() => {
        axios
            .get(
                `http://localhost:5000/api/stats/artisan-registrations?period=${period}`
            )
            .then((res) => {
                console.log("API response:", res.data);
                const chartData = res.data.map((item: any) => ({
                    label: item._id,
                    count: item.count,
                }));
                setData(chartData);
            })
            .catch((err) => console.error("Chart fetch error:", err));
    }, [period]);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                    Artisan Registrations ({period})
                </h2>
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Daily</SelectItem>
                        <SelectItem value="week">Weekly</SelectItem>
                        <SelectItem value="month">Monthly</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#3b82f6"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ArtisanRegistrationChart;
