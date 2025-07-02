// // components/BookingModal.tsx
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useContext, useState } from "react";

// import axios from "axios";
// import toast from "react-hot-toast";
// import { AutContext } from "@/context/AuthContext"; // adjust based on your project structure

// interface BookingModalProps {
//     open: boolean;
//     onClose: () => void;
//     artisanId: string;
//     artisanName: string;
// }

// export default function BookingModal({
//     open,
//     onClose,
//     artisanId,
//     artisanName,
// }: BookingModalProps) {
//     const [date, setDate] = useState("");
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);

//     const { tokenUser } = useContext(AutContext);

//     const handleSubmit = async () => {
//         if (!date) return toast.error("Please select a date");

//         try {
//             setLoading(true);
//             await axios.post(
//                 "http://localhost:5000/api/bookings",
//                 {
//                     artisanId,
//                     date,
//                     message,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${tokenUser}`,
//                     },
//                 }
//             );
//             toast.success("Booking request sent successfully");
//             onClose();
//             setDate("");
//             setMessage("");
//         } catch (err: any) {
//             toast.error(err.response?.data?.message || "Booking failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={onClose}>
//             <DialogContent>
//                 <DialogHeader>
//                     <DialogTitle>Book {artisanName}</DialogTitle>
//                 </DialogHeader>

//                 <div className="space-y-4">
//                     <Input
//                         type="date"
//                         value={date}
//                         onChange={(e) => setDate(e.target.value)}
//                         placeholder="Select date"
//                     />
//                     <Textarea
//                         placeholder="Additional details..."
//                         value={message}
//                         onChange={(e) => setMessage(e.target.value)}
//                     />
//                 </div>

//                 <DialogFooter>
//                     <Button
//                         variant="outline"
//                         onClick={onClose}
//                         disabled={loading}
//                     >
//                         Cancel
//                     </Button>
//                     <Button onClick={handleSubmit} disabled={loading}>
//                         {loading ? "Submitting..." : "Submit Booking"}
//                     </Button>
//                 </DialogFooter>
//             </DialogContent>
//         </Dialog>
//     );
// }

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { addDays, isSameDay } from "date-fns";
import { Wrench, Droplet, Zap, Hammer, DoorOpen, Monitor } from "lucide-react";

type BookingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onBook: (bookingData: {
        selectedDate: Date;
        time: string;
        task: string;
        note: string;
    }) => void;
    // artisanCategory: "plumber" | "electrician" | "carpenter";
};

// Task options with icons (using lucide-react icons)
// const taskOptions = {
//     plumber: [
//         { value: "leak_fix", label: "Fix Leak", icon: Droplet },
//         { value: "pipe_install", label: "Install Pipes", icon: Wrench },
//         { value: "unclog_drain", label: "Unclog Drain", icon: Wrench },
//     ],
//     electrician: [
//         { value: "install_lights", label: "Install Lights", icon: Zap },
//         { value: "repair_wiring", label: "Repair Wiring", icon: Zap },
//         { value: "replace_socket", label: "Replace Socket", icon: Zap },
//     ],
//     carpenter: [
//         { value: "furniture_repair", label: "Furniture Repair", icon: Hammer },
//         { value: "door_install", label: "Install Doors", icon: DoorOpen },
//         {
//             value: "window_frame",
//             label: "Fix Window Frame",
//             icon: Monitor,
//         },
//     ],
// };

const timeSlots = [
    { label: "08:00 - 09:00", value: "08:00" },
    { label: "10:00 - 11:00", value: "10:00" },
    { label: "12:00 - 13:00", value: "12:00" },
    { label: "14:00 - 15:00", value: "14:00" },
    { label: "16:00 - 17:00", value: "16:00" },
    { label: "18:00 - 19:00", value: "18:00" },
];

const BookingModal = ({
    isOpen,
    onClose,
    onBook,
}: // artisanCategory = "plumber",
BookingModalProps) => {
    const today = new Date();
    const tomorrow = addDays(today, 1);

    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [time, setTime] = useState<string>("");
    const [task, setTask] = useState<string>("");
    const [note, setNote] = useState<string>("");

    // const availableTasks = taskOptions[artisanCategory] || [];

    const handleDateOption = (option: "today" | "tomorrow" | "custom") => {
        if (option === "today") {
            setSelectedDate(today);
            setShowCalendar(false);
        } else if (option === "tomorrow") {
            setSelectedDate(tomorrow);
            setShowCalendar(false);
        } else {
            setShowCalendar(true);
        }
    };

    const isActiveDate = (date: Date) => isSameDay(date, selectedDate);

    const handleConfirm = () => {
        if (!task || !time || !selectedDate) return;
        onBook({ selectedDate, time, task, note });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md  ">
                <DialogHeader>
                    {/* <DialogTitle>Book a {artisanCategory}</DialogTitle> */}
                    <DialogTitle>Book </DialogTitle>
                </DialogHeader>

                {/* Date Buttons */}
                <div className="flex gap-2 mt-2">
                    <Button
                        variant={
                            isActiveDate(today) && !showCalendar
                                ? "default"
                                : "outline"
                        }
                        onClick={() => handleDateOption("today")}
                    >
                        Today
                    </Button>
                    <Button
                        variant={
                            isActiveDate(tomorrow) && !showCalendar
                                ? "default"
                                : "outline"
                        }
                        onClick={() => handleDateOption("tomorrow")}
                    >
                        Tomorrow
                    </Button>
                    <Button
                        variant={showCalendar ? "default" : "outline"}
                        onClick={() => handleDateOption("custom")}
                    >
                        Choose Date
                    </Button>
                </div>

                {/* Calendar */}
                {showCalendar && (
                    <div className="mt-3">
                        <Label>Pick a Date</Label>
                        <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => date && setSelectedDate(date)}
                            className="border rounded-md"
                        />
                    </div>
                )}

                {/* Time Slots */}
                <div className="mt-4">
                    <Label>Select Time</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {timeSlots.map(({ label, value }) => (
                            <Button
                                key={value}
                                variant={time === value ? "default" : "outline"}
                                onClick={() => setTime(value)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Task Cards */}
                {/* <div className="mt-4">
                    <Label>Select Task</Label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        {availableTasks.map(({ value, label, icon: Icon }) => (
                            <button
                                key={value}
                                onClick={() => setTask(value)}
                                className={`cursor-pointer flex flex-col items-center justify-center border rounded-lg p-4 transition
                    ${
                        task === value
                            ? "border-blue-600 bg-blue-100"
                            : "border-gray-300 hover:border-blue-400"
                    }
                  `}
                                type="button"
                            >
                                <Icon className="w-8 h-8 mb-2 text-blue-600" />
                                <span className="text-center text-sm">
                                    {label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div> */}

                {/* Explanation / Note */}
                <div className="mt-4">
                    <Label>More Details</Label>
                    <Textarea
                        placeholder="Describe the issue (e.g., leak under kitchen sink)..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                {/* Confirm Button */}
                <Button className="mt-6 w-full" onClick={handleConfirm}>
                    Confirm Booking
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default BookingModal;
