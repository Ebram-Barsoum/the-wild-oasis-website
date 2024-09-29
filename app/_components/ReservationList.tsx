import { Booking } from "../_lib/services";
import ReservationCard from "./ReservationCard";

interface ReservationListProps {
    reservations: Partial<Booking>[];
}

export default function ReservationList({
    reservations,
}: ReservationListProps): JSX.Element {
    // const [optimisticReservation, optimisticDelete] = useOptimistic(
    //     reservations,
    //     (currentReservations, bookingId) =>
    //         currentReservations.filter((reservation) => reservation.id !== bookingId)
    // );

    // async function handleDelete(bookingId: number) {
    //     // optimisticDelete(bookingId);
    //     await deleteReservationAction(bookingId);
    // }

    return (
        <ul className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:flex md:flex-col">
            {reservations.map((booking: Partial<Booking>) => (
                <ReservationCard
                    key={booking.id}
                    booking={booking}
                />
            ))}
        </ul>
    );
}
