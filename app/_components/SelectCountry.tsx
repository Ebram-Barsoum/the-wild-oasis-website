import { Country, getCountries } from "@/app/_lib/services";
import Image from "next/image";

interface SelectCountryProps {
    className?: string;
    name?: string;
    id?: string;
    defaultCountry?: string | undefined;
    countryFlag?: string
}

export default async function SelectCountry({
    name,
    id,
    defaultCountry,
    countryFlag,
    className,
}: SelectCountryProps): Promise<JSX.Element> {
    const countries = await getCountries();

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="flex items-center justify-between">
                <span>Where are you from ?</span>
                <Image src={countryFlag || ''} alt={defaultCountry || ''} width={30} height={20} className="aspect-video" />
            </label>

            <select
                name={name}
                id={id}
                defaultValue={`${defaultCountry}%${countryFlag}` || ""}
                className={className}
            >
                <option value="">Select Your Country ...</option>
                {countries.map((country: Country) => (
                    <option key={country.name} value={`${country.name}%${country.flag}`}>
                        {country.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
