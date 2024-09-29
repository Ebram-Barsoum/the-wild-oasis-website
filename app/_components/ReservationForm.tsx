"use client";
import { ReactNode, useState, useTransition } from "react";

import { Booking, Cabin } from "@/app/_lib/services";
import { useReservation } from "../_contexts/ReservationContext";
import { createReservationAction } from "../_lib/actions";
import { differenceInDays } from "date-fns";

interface ReservationFormProps {
    cabin: Cabin;
    children: ReactNode;
}

export default function ReservationForm({
    cabin,
    children,
}: ReservationFormProps) {

    const { range } = useReservation();
    const { id, regularPrice, discount } = cabin;
    const [isPending, setIsPending] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const numGuests = Number(formData.get('numGuests'));
        const hasBreakfast = formData.get('hasBreakfast') === 'yes';
        const observations = String(formData.get('observations')).slice(0, 1000);

        if (!numGuests || hasBreakfast === null) {
            return;
        }

        const booking: Partial<Booking> = {
            startDate: range?.from,
            endDate: range?.to,
            numNights: differenceInDays(range?.to as Date, range?.from as Date),
            status: "unconfirmed",
            isPaid: false,
            cabinId: id,
            numGuests,
            hasBreakfast,
            observations,
        }

        booking.cabinPrice = (regularPrice - discount) * (booking.numNights as number);
        booking.totalPrice = (regularPrice - discount) * (booking.numNights as number);
        await createReservationAction(booking);
        setIsPending(false);
    };

    return (
        <div className="flex flex-col flex-1">
            <div className="flex justify-between items-center bg-primary-600 py-3 px-3 md:px-10">
                <span>Logged in as</span>
                {children}
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 bg-primary-900 py-3 px-3 md:px-10">
                <div className="flex flex-col gap-2">
                    <label htmlFor="guests">How many guests ?</label>
                    <select
                        name="numGuests"
                        id="guests"
                        className="p-3 bg-primary-100 text-primary-800 rounded-sm"
                    >
                        <option value="" hidden>
                            Select the number of guests
                        </option>
                        {Array.from({ length: cabin.maxCapacity }).map(
                            (_: unknown, index: number): JSX.Element => (
                                <option key={index} value={index + 1}>
                                    {index + 1} guests
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="flex flex-wrap gap-2 text-primary-100">
                    <p>Has a breakfast (Extra money) ?</p>

                    <div className="flex gap-4 ">
                        <div>
                            <input type="radio" name="hasBreakfast" id="yes" value='yes' />
                            <label htmlFor="yes" className="ml-1">Yes</label>
                        </div>
                        <div>
                            <input type="radio" name="hasBreakfast" id="no" value='no' />
                            <label htmlFor="no" className="ml-1">No</label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="notes">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        id="notes"
                        placeholder="Any pets, allergies, special requirements, ets."
                        className="p-3 h-[100px] bg-primary-100 resize-y rounded-sm text-primary-800"
                    ></textarea>
                </div>

                <div className="flex items-center justify-between">
                    {!range?.from && (
                        <p className="text-end">Start by selecting range of dates!</p>
                    )}
                    {
                        (range?.from && range?.to) &&
                        <button
                            disabled={isPending}
                            className="bg-accent-400 ml-auto text-primary-800 transition-colors hover:bg-accent-500 disabled:bg-gray-300  p-2 ">
                            {isPending ? "loading..." : "Book now"}
                        </button>
                    }
                </div>
            </form>
        </div>
    );
}
