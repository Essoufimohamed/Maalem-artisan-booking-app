// components/BookingModal.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type BookingModalProps = {
    open: boolean;
    onClose: () => void;
    artisanName: string;
    onSubmit: (data: any) => void;
};

export default function BookingModal({
    open,
    onClose,
    artisanName,
    onSubmit,
}: BookingModalProps) {
    const [date, setDate] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        onSubmit({ date, message });
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Book {artisanName}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Select date"
                    />
                    <Textarea
                        placeholder="Additional details..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Submit Booking</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
