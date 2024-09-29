import BackButton from "@/app/_components/BackButton";
import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking, getCabin } from "@/app/_lib/services";

interface PageProps {
    params: {
        reservationId: string;
    }
}

export const metadata = {
    title: 'Edit reservation'
}

export default async function Page({ params }: PageProps): Promise<JSX.Element> {
    const { reservationId } = params;
    const reservation = await getBooking(Number(reservationId));
    const cabin = await getCabin(reservation.cabinId);

    return (
        <div className="flex flex-col gap-6 p-2">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl text-accent-400 font-semibold">Edit reservation #{reservation.id}</h2>
                <BackButton />
            </div>
            <UpdateReservationForm key={reservationId} reservation={reservation} maxCapacity={cabin?.maxCapacity} />
        </div>
    )
}
