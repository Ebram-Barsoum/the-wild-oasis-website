import { Suspense } from 'react';
import CabinDetails from "@/app/_components/CabinDetails";
import CabinReservation from "@/app/_components/CabinReservation";
import Spinner from "@/app/_components/Spinner";
import { Cabin, getCabin, getCabins } from "@/app/_lib/services";

interface CabinProps {
    params: { cabinId: string };
}

interface Metadata {
    title: string;
}

export async function generateMetadata({
    params,
}: CabinProps): Promise<Metadata | null> {
    const { cabinId } = params;
    const cabin: Cabin | null = await getCabin(Number(cabinId));

    if (!cabin) return null;

    const { name } = cabin;
    return {
        title: `Cabin ${name}`,
    };
}

export async function generateStaticParams(): Promise<any[]> {
    const cabins = await getCabins();

    const IDs = cabins?.map((cabin) => {
        return { cabinId: String(cabin.id) };
    });

    return IDs || [];
}

export default async function page({ params }: CabinProps) {
    const { cabinId } = params;
    const cabin: Cabin | null = await getCabin(Number(cabinId));

    if (!cabin) return null;

    return (
        <>
            <CabinDetails cabin={cabin} />
            <div className="my-16">
                <h1 className="px-2 mt-6 text-accent-400 text-xl text-center sm:text-4xl">
                    Reserve Cabin {cabin.name} today. Pay on Arrival.
                </h1>
                <Suspense fallback={<Spinner />}>
                    <CabinReservation cabin={cabin} />
                </Suspense>
            </div>
        </>
    );
}
