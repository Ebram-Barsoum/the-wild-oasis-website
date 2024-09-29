"use client";

import { useTransition } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

import SmallSpinner from "./SmallSpinner";
import { deleteReservationAction } from "../_lib/actions";

interface DeleteReservationProps {
    id: number;
}

export default function DeleteReservation({ id }: DeleteReservationProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this reservation?')) {
            startTransition(() => deleteReservationAction(id));
        }
    }

    return (
        <button
            onClick={handleDelete}
            className="flex items-center flex-1 gap-2 font-bold p-4 md:h-[50%] text-primary-400 hover:text-primary-900 hover:bg-accent-500  md:border-t md:border-primary-800"
        >
            {
                isPending ?
                    <span className="mx-auto text-xs"> <SmallSpinner /></span>
                    :
                    <>
                        <RiDeleteBin5Line />
                        <span className="text-xs uppercase mt-1">Delete</span>
                    </>
            }
        </button>
    );
}
