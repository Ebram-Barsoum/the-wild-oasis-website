"use client";

import { useState } from "react";
import { Booking } from "../_lib/services";
import { updateReservationAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

interface UpdateReservationFormProps {
    reservation: Booking;
    maxCapacity?: number;
}

export default function UpdateReservationForm({
    reservation,
    maxCapacity,
}: UpdateReservationFormProps) {
    const { numGuests, observations } = reservation;
    const [newData, setNewData] = useState({
        numGuests: numGuests,
        observations: observations,
    });

    return (
        <form
            action={() => {
                if (
                    numGuests === newData.numGuests &&
                    observations === newData.observations
                )
                    return;

                updateReservationAction(reservation.id, newData);
            }}
        >
            <div className="flex flex-col gap-3 bg-primary-900 py-3 px-3 md:px-10">
                <div className="flex flex-col gap-2">
                    <label htmlFor="guests">How many guests ?</label>
                    <select
                        name="guests"
                        id="guests"
                        className="p-3 bg-primary-100 text-primary-800 rounded-sm"
                        value={newData.numGuests}
                        onChange={(e) =>
                            setNewData({ ...newData, numGuests: Number(e.target.value) })
                        }
                    >
                        <option value="" hidden>
                            Select the number of guests
                        </option>
                        {Array.from({ length: maxCapacity || 0 }).map(
                            (_: unknown, index: number): JSX.Element => (
                                <option
                                    key={index}
                                    value={index + 1}
                                >
                                    {index + 1} guests
                                </option>
                            )
                        )}
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="notes">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="notes"
                        id="notes"
                        className="p-3 h-[100px] bg-primary-100 resize-y rounded-sm text-primary-800"

                        value={newData.observations || ""}
                        onChange={(e) =>
                            setNewData({ ...newData, observations: e.target.value })
                        }
                    ></textarea>
                </div>

                <SubmitButton
                    pendingLabel="Updating ..."
                    className="bg-accent-400 ml-auto text-primary-800 transition-colors hover:bg-accent-500 disabled:bg-gray-300  p-2 ">
                    Update
                </SubmitButton>
            </div>
        </form>
    );
}
