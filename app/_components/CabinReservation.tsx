import { Cabin, getBookedDatesByCabin, getSettings } from '@/app/_lib/services';
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { ReservationProvider } from '@/app/_contexts/ReservationContext';
import User from './User';
import { auth } from '@/app/_lib/auth';
import Link from 'next/link';

interface CabinReservationProps {
    cabin: Cabin,
}


export default async function CabinReservation({
    cabin,
}: CabinReservationProps): Promise<JSX.Element> {
    const [settings, bookedDates, session] = await Promise.all([getSettings(), getBookedDatesByCabin(cabin.id), auth()]);

    return (
        <div className="flex flex-col mt-10 mx-auto max-w-[90%] border border-primary-800 sm:max-w-[85%] lg:grid lg:grid-cols-2">
            <ReservationProvider>
                <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates} />
                {session && <ReservationForm cabin={cabin}>
                    <User />
                </ReservationForm>}

                {!session && <div className='bg-primary-800 flex flex-wrap justify-center items-center py-12 text-xl'>
                    Please <Link href={'/account'} className='mx-2 text-accent-500 font-semibold border-b border-accent-500'> Login</Link> So You Can Reserve This Cabin.
                </div>}
            </ReservationProvider>
        </div>
    );
}
