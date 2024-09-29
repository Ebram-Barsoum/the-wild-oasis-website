import { unstable_noStore as noStore } from "next/cache";
import { getCabins, Cabin } from "@/app/_lib/services";
import CabinCard from "@/app/_components/CabinCard";

interface CabinListProps {
    filter: string;
}

export default async function CabinsList({
    filter,
}: CabinListProps): Promise<JSX.Element | null> {
    // this noStore() for uncaching cabins data
    noStore();

    const cabins: Cabin[] | null = await getCabins();

    if (!cabins) return <p className="text-lg">⚠ No Cabins Found Or Some Error Occured! 🤷‍♂️</p>;

    const filterMap: Record<string, Cabin[]> = {
        all: cabins,
        small: cabins.filter(
            (cabin) => cabin.maxCapacity >= 2 && cabin.maxCapacity <= 3
        ),
        medium: cabins.filter(
            (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
        ),
        large: cabins.filter(
            (cabin) => cabin.maxCapacity >= 8 && cabin.maxCapacity <= 12
        )
    }

    const displayedCabins: Cabin[] = filterMap[filter] || [];

    if (!displayedCabins.length) return <p className="text-lg">⚠ No Cabins Match this filter! 🤷‍♂️</p>;

    return (
        <ul className="flex flex-col  sm:grid md:grid-cols-2 gap-8 py-6">
            {displayedCabins?.map((cabin: Cabin) => (
                <CabinCard key={cabin.id} cabin={cabin} />
            ))}
        </ul>
    );
}
