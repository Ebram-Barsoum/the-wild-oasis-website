import Link from "next/link";

import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/services";
import ReservationList from "@/app/_components/ReservationList";

export const metadata = {
    title: 'Reservations'
}

export const revalidate = 0;

export default async function Reservations(): Promise<JSX.Element> {
    const session = await auth();
    const reservations = await getBookings(Number(session?.user?.id));

    return (
        <div>
            <h2 className="text-accent-400 text-2xl font-bold mb-6">Your reservations</h2>

            <ReservationList reservations={reservations} />

            {(!reservations.length) && <p className="flex gap-3">You don&#39;t have any reservations,
                <Link href={'/cabins'} className="flex items-center gap-3 text-accent-400">
                    luxury cabins &rarr;
                </Link>
            </p>}
        </div>
    );
}
