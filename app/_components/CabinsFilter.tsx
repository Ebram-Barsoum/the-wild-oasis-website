"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { CapacityFilter } from "@/app/cabins/page";

interface CabinsFilterProps {
    filterBy: string;
    filters: CapacityFilter[];
}

export default function CabinsFilter({
    filterBy,
    filters,
}: CabinsFilterProps): JSX.Element {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const filterType = searchParams.get(filterBy) || "all";

    const setSearchParam = (newSearchParam: string): void => {
        const params = new URLSearchParams(searchParams);
        params.set(filterBy, newSearchParam);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex ml-auto border border-primary-800">
            {filters.map((filter: CapacityFilter): JSX.Element => {
                return (
                    <button
                        key={filter.text}
                        onClick={() => setSearchParam(filter.type)}
                        className={`py-1 px-3 text-sm ${filterType === filter.type && "bg-primary-700"
                            } hover:bg-primary-700 sm:text-base`}
                    >
                        {filter.text}
                    </button>
                );
            })}
        </div>
    );
}
