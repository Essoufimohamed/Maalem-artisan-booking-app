// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Calendar } from "@/components/ui/calendar";
// import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";
// import { addDays, isSameDay } from "date-fns";

// type BookingModalProps = {
//     isOpen: boolean;
//     onClose: () => void;
//     onBook: (bookingData: {
//         selectedDate: Date;
//         time: string;
//         note: string;
//     }) => void;
// };

// const timeSlots = [
//     { label: "08:00 - 09:00", value: "08:00" },
//     { label: "10:00 - 11:00", value: "10:00" },
//     { label: "12:00 - 13:00", value: "12:00" },
//     { label: "14:00 - 15:00", value: "14:00" },
//     { label: "16:00 - 17:00", value: "16:00" },
//     { label: "18:00 - 19:00", value: "18:00" },
// ];

// const BookingModal = ({ isOpen, onClose, onBook }: BookingModalProps) => {
//     const today = new Date();
//     const tomorrow = addDays(today, 1);

//     const [selectedDate, setSelectedDate] = useState<Date>(today);
//     const [showCalendar, setShowCalendar] = useState<boolean>(false);
//     const [time, setTime] = useState<string>("");
//     const [note, setNote] = useState<string>("");

//     const handleDateOption = (option: "today" | "tomorrow" | "custom") => {
//         if (option === "today") {
//             setSelectedDate(today);
//             setShowCalendar(false);
//         } else if (option === "tomorrow") {
//             setSelectedDate(tomorrow);
//             setShowCalendar(false);
//         } else {
//             setShowCalendar(true);
//         }
//     };

//     const isActiveDate = (date: Date) => isSameDay(date, selectedDate);

//     const handleConfirm = () => {
//         if (!time || !selectedDate) return;

//         onBook({
//             selectedDate,
//             time,
//             note,
//         });

//         onClose();
//     };

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="max-w-md">
//                 <DialogHeader>
//                     <DialogTitle>Book</DialogTitle>
//                 </DialogHeader>

//                 {/* Date Buttons */}
//                 <div className="flex gap-2 mt-2">
//                     <Button
//                         variant={
//                             isActiveDate(today) && !showCalendar
//                                 ? "default"
//                                 : "outline"
//                         }
//                         onClick={() => handleDateOption("today")}
//                     >
//                         Today
//                     </Button>
//                     <Button
//                         variant={
//                             isActiveDate(tomorrow) && !showCalendar
//                                 ? "default"
//                                 : "outline"
//                         }
//                         onClick={() => handleDateOption("tomorrow")}
//                     >
//                         Tomorrow
//                     </Button>
//                     <Button
//                         variant={showCalendar ? "default" : "outline"}
//                         onClick={() => handleDateOption("custom")}
//                     >
//                         Choose Date
//                     </Button>
//                 </div>

//                 {/* Calendar */}
//                 {showCalendar && (
//                     <div className="mt-3">
//                         <Label>Pick a Date</Label>
//                         <Calendar
//                             mode="single"
//                             selected={selectedDate}
//                             onSelect={(date) => date && setSelectedDate(date)}
//                             className="border rounded-md"
//                         />
//                     </div>
//                 )}

//                 {/* Time Slots */}
//                 <div className="mt-4">
//                     <Label>Select Time</Label>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                         {timeSlots.map(({ label, value }) => (
//                             <Button
//                                 key={value}
//                                 variant={time === value ? "default" : "outline"}
//                                 onClick={() => setTime(value)}
//                             >
//                                 {label}
//                             </Button>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Explanation / Note */}
//                 <div className="mt-4">
//                     <Label>More Details</Label>
//                     <Textarea
//                         placeholder="Describe the issue (e.g., leak under kitchen sink)..."
//                         value={note}
//                         onChange={(e) => setNote(e.target.value)}
//                     />
//                 </div>

//                 {/* Confirm Button */}
//                 <Button className="mt-6 w-full" onClick={handleConfirm}>
//                     Confirm Booking
//                 </Button>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default BookingModal;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// interface BookingModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     artisanId: string;
//     tokenUser: string;
// }

// const BookingModal: React.FC<BookingModalProps> = ({
//     isOpen,
//     onClose,
//     artisanId,
//     tokenUser,
// }) => {
//     const [selectedDate, setSelectedDate] = useState<string>("");
//     const [time, setTime] = useState<string>("");
//     const [note, setNote] = useState<string>("");
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!selectedDate || !time) {
//             toast.error("Please select both date and time");
//             return;
//         }

//         setLoading(true);

//         try {
//             await axios.post(
//                 `${import.meta.env.VITE_API_URL}/api/bookings`,
//                 {
//                     artisanId,
//                     selectedDate: new Date(selectedDate).toISOString(),
//                     time,
//                     note,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${tokenUser}`,
//                     },
//                 }
//             );

//             toast.success("Booking request sent!");
//             setSelectedDate("");
//             setTime("");
//             setNote("");
//             onClose();
//         } catch (error) {
//             toast.error("Failed to send booking. Please try again.");
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 mx-4 animate-fadeIn">
//                 <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-center">
//                     Book an Appointment
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                         Select Date <span className="text-orange-500">*</span>
//                     </label>
//                     <input
//                         type="date"
//                         value={selectedDate}
//                         onChange={(e) => setSelectedDate(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
//                         required
//                     />

//                     <label className="block text-sm font-medium text-gray-700">
//                         Select Time <span className="text-orange-500">*</span>
//                     </label>
//                     <input
//                         type="time"
//                         value={time}
//                         onChange={(e) => setTime(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
//                         required
//                     />

//                     <label className="block text-sm font-medium text-gray-700">
//                         Note (optional)
//                     </label>
//                     <textarea
//                         value={note}
//                         onChange={(e) => setNote(e.target.value)}
//                         rows={3}
//                         placeholder="Additional details or requests"
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
//                     />

//                     <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             disabled={loading}
//                             className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50"
//                         >
//                             {loading ? "Booking..." : "Book Now"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default BookingModal;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// // Example unavailable dates — you can fetch this from API or set dynamically
// const unavailableDates = [
//     new Date("2025-07-04"),
//     new Date("2025-07-10"),
//     new Date("2025-07-15"),
// ];

// // Helper to disable weekends and specific unavailable dates
// const isDateAvailable = (date: Date) => {
//     // Disable weekends (Sat=6, Sun=0)
//     if (date.getDay() === 0 || date.getDay() === 6) return false;

//     // Disable specific dates
//     for (const d of unavailableDates) {
//         if (
//             d.getFullYear() === date.getFullYear() &&
//             d.getMonth() === date.getMonth() &&
//             d.getDate() === date.getDate()
//         ) {
//             return false;
//         }
//     }

//     return true;
// };

// interface BookingModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     artisanId: string;
//     tokenUser: string;
// }

// const BookingModal: React.FC<BookingModalProps> = ({
//     isOpen,
//     onClose,
//     artisanId,
//     tokenUser,
// }) => {
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//     const [time, setTime] = useState<string>("");
//     const [note, setNote] = useState<string>("");
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!selectedDate || !time) {
//             toast.error("Please select both date and time");
//             return;
//         }

//         setLoading(true);

//         try {
//             await axios.post(
//                 `${import.meta.env.VITE_API_URL}/api/bookings`,
//                 {
//                     artisanId,
//                     selectedDate: selectedDate.toISOString(),
//                     time,
//                     note,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${tokenUser}`,
//                     },
//                 }
//             );

//             toast.success("Booking request sent!");
//             setSelectedDate(null);
//             setTime("");
//             setNote("");
//             onClose();
//         } catch (error) {
//             toast.error("Failed to send booking. Please try again.");
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
//             <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 mx-4 animate-fadeIn">
//                 <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-center">
//                     Book an Appointment
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                         Select Date <span className="text-orange-500">*</span>
//                     </label>
//                     <DatePicker
//                         selected={selectedDate}
//                         onChange={(date) => setSelectedDate(date)}
//                         filterDate={isDateAvailable}
//                         minDate={new Date()}
//                         placeholderText="Select available date"
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
//                         dateFormat="MMMM d, yyyy"
//                         required
//                     />

//                     <label className="block text-sm font-medium text-gray-700">
//                         Select Time <span className="text-orange-500">*</span>
//                     </label>
//                     <input
//                         type="time"
//                         value={time}
//                         onChange={(e) => setTime(e.target.value)}
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
//                         required
//                     />

//                     <label className="block text-sm font-medium text-gray-700">
//                         Note (optional)
//                     </label>
//                     <textarea
//                         value={note}
//                         onChange={(e) => setNote(e.target.value)}
//                         rows={3}
//                         placeholder="Additional details or requests"
//                         className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
//                     />

//                     <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             disabled={loading}
//                             className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50"
//                         >
//                             {loading ? "Booking..." : "Book Now"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default BookingModal;

import "react-datepicker/dist/react-datepicker.css";
import "../../datepicker-custom.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    artisanId: string;
    tokenUser: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
    isOpen,
    onClose,
    // artisanId,
    tokenUser,
}) => {
    const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [time, setTime] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch unavailable dates from backend when modal opens
    useEffect(() => {
        if (!isOpen) return;

        const fetchUnavailableDates = async () => {
            try {
                const { data } = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/api/bookings/unavailable-dates`,
                    {
                        headers: { Authorization: `Bearer ${tokenUser}` },
                    }
                );

                const dates = data.unavailableDates.map(
                    (dateStr: string) => new Date(dateStr + "T00:00:00")
                );
                setUnavailableDates(dates);
            } catch (error) {
                console.error("Failed to fetch unavailable dates", error);
            }
        };

        fetchUnavailableDates();
    }, [isOpen, tokenUser]);

    // Disable weekends and unavailable dates from backend
    const isDateAvailable = (date: Date) => {
        if (date.getDay() === 0 || date.getDay() === 6) return false;

        return !unavailableDates.some(
            (d) =>
                d.getFullYear() === date.getFullYear() &&
                d.getMonth() === date.getMonth() &&
                d.getDate() === date.getDate()
        );
    };
    const { id } = useParams();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDate || !time) {
            toast.error("Please select both date and time");
            return;
        }

        setLoading(true);

        console.log(selectedDate.toISOString(), id, time, note);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/bookings`,
                {
                    artisanId: id,
                    selectedDate: selectedDate.toISOString(),
                    time,
                    note,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenUser}`,
                    },
                }
            );

            toast.success("Booking request sent!");
            setSelectedDate(null);
            setTime("");
            setNote("");
            onClose();
        } catch (error) {
            toast.error("Failed to send booking. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 mx-4 animate-fadeIn">
                <h2 className="text-2xl font-semibold text-orange-600 mb-4 text-center">
                    Book an Appointment
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Select Date <span className="text-orange-500">*</span>
                    </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        filterDate={isDateAvailable}
                        minDate={new Date()}
                        placeholderText="Select available date"
                        // className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                        className="w-full border border-orange-500 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
                        dateFormat="MMMM d, yyyy"
                        required
                    />

                    <label className="block text-sm font-medium text-gray-700">
                        Select Time
                    </label>

                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full rounded-xl border border-orange-300 bg-white px-4 py-2 text-orange-700 focus:ring-2 focus:ring-orange-400 shadow-sm"
                        required
                    >
                        <option value="">Select time</option>
                        {[
                            "09:00",
                            "10:00",
                            "11:00",
                            "12:00",
                            "14:00",
                            "15:00",
                            "16:00",
                            "17:00",
                            "18:00",
                        ].map((slot) => (
                            <option key={slot} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>

                    <label className="block text-sm font-medium text-gray-700">
                        Note (optional)
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        placeholder="Additional details or requests"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition resize-none"
                    />

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition disabled:opacity-50"
                        >
                            {loading ? "Booking..." : "Book Now"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;
