import { format, formatDistance, isPast, isToday, } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { Booking, getCabin } from "../_lib/services";
import DeleteReservation from "./DeleteReservation";

interface ReservatioCardProps {
    booking: Partial<Booking>;
}

export default async function ReservationCard({
    booking,

}: ReservatioCardProps): Promise<JSX.Element> {

    const { id, created_at, startDate, endDate, numNights, numGuests, totalPrice, cabinId } =
        booking;
    const cabin = await getCabin(cabinId as number);

    const formatDistanceFromNow = (date: Date) => {
        return formatDistance(date, new Date(), {
            addSuffix: true,
        }).replace("about ", "");
    }

    return (
        <div className="border border-primary-800 flex flex-col gap-2 lg:flex-row">
            <div className="relative aspect-square h-48 lg:h-32">
                <Image
                    src={cabin?.image || ""}
                    alt={cabin?.description || ""}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div className="px-6 py-2 flex flex-col gap-3 flex-1 ">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">
                        {numNights} nights in Cabin {cabin?.name}
                    </h3>
                    {isPast(new Date(startDate as Date)) ? (
                        <span className="bg-yellow-800 py-1 px-2 text-xs font-bold rounded-sm">
                            PAST
                        </span>
                    ) : (
                        <span className="bg-green-800 py-1 px-2 text-xs font-bold rounded-sm">
                            UPCOMING
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between flex-wrap text-primary-300 text-sm md:text-base">
                    {format(new Date(startDate as Date), "EEE, MMM dd yyyy")}{' '}
                    ({isToday(new Date(startDate as Date)) ? "Today" : formatDistanceFromNow(new Date(startDate as Date))})
                    &rarr; {format(new Date(endDate as Date), "EEE, MMM dd yyyy")}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-accent-400 text-xl">
                            ${totalPrice}
                        </span>

                        <span className="text-primary-400 text-xl">
                            {numGuests} guests
                        </span>
                    </div>

                    <p className="text-primary-400 text-xs">
                        Booked {format(new Date(created_at as Date), "EEE, MMM dd yyyy, p")}
                    </p>
                </div>
            </div>

            {!isPast(new Date(startDate as Date)) && <div className="flex flex-row lg:flex-col border-t border-primary-800 transition-colors lg:border-l ">
                <Link href={`/account/reservations/edit/${id}`} className="flex items-center flex-1 gap-2 font-bold p-4 md:h-[50%] text-primary-400 hover:text-primary-900 hover:bg-accent-500 border-r border-primary-800">
                    <FaRegEdit />
                    <span className="text-xs uppercase mt-1">Edit</span>
                </Link>

                <DeleteReservation id={id as number} />
            </div>}
        </div>
    );
}
