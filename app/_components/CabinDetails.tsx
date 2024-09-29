import Image from "next/image";
import { EyeSlashIcon, MapPinIcon, UserIcon } from "@heroicons/react/16/solid";
import TextExpander from "./TextExpander";
import { Cabin } from "../_lib/services";

interface CabinDetailsProps {
    cabin: Cabin
}

export default function CabinDetails({ cabin }: CabinDetailsProps): JSX.Element {
    const { image, name, maxCapacity, description } = cabin;
    return (
        <div className="flex flex-col border border-primary-800 text-primary-200  my-10 mx-auto max-w-[90%] sm:text-lg lg:grid lg:grid-cols-[3fr_4fr] sm:max-w-[85%]">
            <div className="relative aspect-square scale-[1.07]  lg:translate-y-0 md:translate-x-3 lg:aspect-auto">
                <Image src={image} alt={description} fill className="object-cover" />
            </div>

            <div className="flex flex-col gap-4 p-4 md:p-12 ">
                <h2 className="p-4 bg-primary-900 rounded-lg text-2xl text-accent-400 translate-x-0 translate-y-[-60%] sm:text-xl md:text-4xl lg:translate-y-0 lg:translate-x-[-50%] max-w-fit">
                    Cabin {name}
                </h2>
                <TextExpander text={description} />

                <p className="flex gap-2">
                    <UserIcon className="h-5 w-5 text-primary-500" />
                    <span>For up to {maxCapacity} guests.</span>
                </p>

                <p className="flex gap-2">
                    <MapPinIcon className="h-5 w-5 text-primary-500" />
                    <span>
                        Located in the heart of the{" "}
                        <span className="font-bold">Dolomites</span> (Italy).
                    </span>
                </p>

                <p className="flex gap-2">
                    <EyeSlashIcon className="h-5 w-5 text-primary-500" />
                    <span>
                        Privacy <span className="font-bold">100%</span> guaranteed.
                    </span>
                </p>
            </div>
        </div>
    )
}
