import { UsersIcon } from "@heroicons/react/16/solid";
import { Cabin } from "../_lib/services";
import Image from "next/image";
import Link from "next/link";

interface CabinCardProps {
    cabin: Cabin
}

export default function CabinCard({ cabin }: CabinCardProps) {
    const { id, image, name, maxCapacity, regularPrice, discount, description } = cabin;

    return (
        <li className="flex flex-col  sm:flex-row text-primary-100 border-[1px] border-primary-800" data-aos="zoom-in">
            <Image src={`${image}`} alt={description} width={160} height={100} quality={100} className="w-full h-auto sm:w-[6rem] md:w-[10rem] lg:w-[16rem] flex-1 object-cover" />

            <div className="flex-grow flex flex-col text-primary-200">
                <h2 className="text-accent-400 text-2xl p-2 ">Cabin {name}</h2>
                <p className="flex items-center gap-2 text-md lg:text-xl p-2 ">
                    <UsersIcon className="h-5 w-5 text-primary-500 " />
                    For Up to {maxCapacity} guests
                </p>

                <p className="flex items-center justify-end gap-2  border-b border-primary-800 p-2">
                    <span className="text-3xl text-primary-400 flex items-center gap-2">${regularPrice - discount} {discount !== 0 && <del className="text-sm text-primary-600">${regularPrice}</del>}</span>/ night
                </p>

                <Link href={`/cabins/${id}`} className="self-end p-3  border-l text-sm border-primary-800 hover:bg-accent-400 hover:text-primary-800 transition-all">Details & Reservation &rarr;</Link>
            </div>
        </li>
    )
}
