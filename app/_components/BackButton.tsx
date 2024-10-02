'use client';
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function BackButton(): JSX.Element {
    const router = useRouter();

    const handleBack = () => {
        if (router) {
            router.back();
        }
    }

    return (
        <button onClick={() => router.back()} className="flex items-center gap-1 text-primary-200">
            <IoIosArrowRoundBack className="text-xl" />
            <span className="text-sm sm:text-base">Go back</span>
        </button>
    )
}
