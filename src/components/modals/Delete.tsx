"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import BigButton from "@/components/ui/bigButton";
import { FaTrashAlt } from "react-icons/fa";
import { db } from "@/lib/db";
import { toast } from "react-hot-toast";
import axios from "axios";

type Props = {
    userId: string;
}

export const DeleteModal = ({ userId }: Props) => {
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "delete";

    const { value, date } = data;

    const handleDelete = async () => {
        const body = {
            userId: userId,
            date: date,
            duration: value
        }
        await axios.post(`/api/delete-record`, JSON.stringify(body)).then(() => {
            toast.success("Data entry deleted");
        }).catch((e) => {
            console.error(e);
            toast.error("An error occurred");
        }).finally(() => {
            onClose();
        })
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogDescription className="flex flex-col gap-2">
                        <span className="font-mono tracking-widest text-base">
                            {date?.toDateString()}
                        </span>
                        <span className="uppercase">
                            {value} hours
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <BigButton variant={"destructive"} onClick={handleDelete}>
                    <FaTrashAlt size={20} /> <span className="hidden md:flex">
                        Delete
                    </span>
                </BigButton>
            </DialogContent>
        </Dialog>
    )
}