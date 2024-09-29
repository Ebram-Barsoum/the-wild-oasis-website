import { Suspense } from "react";
import CabinsHeader from "@/app/_components/CabinsHeader";
import CabinsList from "@/app/_components/CabinsList";
import Spinner from "@/app/_components/Spinner";
import CabinsFilter from "../_components/CabinsFilter";

// this makes the page to be rendered dynamically
//export const revalidate = 0;

// this makes the page that rendered statically to be revalidated within an intereval
//export const revalidate = 600;

export const metadata: { title: String } = {
    title: "Cabins",
};

interface SearchParamsProps {
    searchParams: {
        capacity: string;
    };
}

export interface CapacityFilter {
    type: string;
    text: string;
}

const capacityFilter: CapacityFilter[] = [
    { type: "all", text: "All Cabins" },
    { type: "small", text: "2-3 guests" },
    { type: "medium", text: "4-7 guests" },
    { type: "large", text: "8-12 guests" },
];

export default function Page({ searchParams }: SearchParamsProps): JSX.Element {
    const filter = searchParams?.capacity || 'all';

    return (
        <div className="flex flex-col gap-6 p-4 pt-6">
            <CabinsHeader />
            <CabinsFilter filterBy="capacity" filters={capacityFilter} />
            <Suspense fallback={<Spinner />} key={filter}>
                <CabinsList filter={filter} />
            </Suspense>
        </div>
    );
}
