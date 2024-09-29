"use client";

import { differenceInDays, isPast, isWithinInterval } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { Cabin, Settings } from "@/app/_lib/services";
import { useReservation } from "@/app/_contexts/ReservationContext";

interface DateSelectorProps {
    cabin: Cabin;
    settings: Settings;
    bookedDates: Date[];
}

function isAlreadyBooked(range: DateRange, dates: Date[]) {
    return range.from && range.to && dates.some((date) => {
        isWithinInterval(date, { start: range.from || '', end: range.to || '' });
    });
}

export default function DateSelector({
    settings,
    cabin,
    bookedDates,
}: DateSelectorProps) {

    const { regularPrice, discount } = cabin;
    const { minBookingLength, maxBookingLength } = settings;
    const { range, setRange } = useReservation();

    const displayedRange = isAlreadyBooked(range as DateRange, bookedDates) ? {} : range;

    const numNights = (range?.from && range?.to) ? differenceInDays(range?.to, range?.from) : 0;
    const totalPrice = numNights * (regularPrice - discount);

    const resetDateRange = () => {
        setRange({ from: undefined, to: undefined });
    };

    return (
        <div className="flex flex-col justify-between">
            <DayPicker
                className="p-3 sm:p-8 place-self-center "
                mode="range"
                min={minBookingLength}
                max={maxBookingLength}
                selected={displayedRange as DateRange}
                onSelect={(newRange) => setRange(newRange)}
                disabled={[...bookedDates, (curDate) => isPast(curDate)]}
                fromMonth={new Date()}
                fromDate={new Date()}
                toYear={new Date().getFullYear() + 3}
                numberOfMonths={2}
                captionLayout="dropdown"
            />

            <div className="bg-accent-500 p-3 flex items-center justify-between ">
                <div className="text-xl text-primary-800">
                    {discount > 0 ? (
                        <>
                            {" "}
                            <span>${regularPrice - discount}</span>{" "}
                            <del className="">{regularPrice}</del>
                        </>
                    ) : (
                        <span>${regularPrice}</span>
                    )}
                    <span> / night</span>
                </div>
                {
                    numNights !== 0 &&
                    <div className="flex items-center gap-4 text-primary-900">
                        <span className="bg-accent-600 px-2 py-1 text-xl">x {numNights}</span>
                        <p className="font-semibold text-lg">Total payment : <span className="text-xl"> ${totalPrice}</span></p>
                    </div>
                }
                {range?.from && (
                    <button
                        className="px-2 py-1 text-primary-900 border border-primary-800"
                        onClick={resetDateRange}
                    >
                        Reset
                    </button>
                )}
            </div>
        </div>
    );
}
