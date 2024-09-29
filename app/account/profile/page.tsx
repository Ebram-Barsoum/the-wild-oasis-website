import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/services";

export const metadata = {
    title: "Update profile",
};

export default async function Profile(): Promise<JSX.Element> {
    const session = await auth();
    const guest = await getGuest(session?.user?.email);

    return (
        <div className="">
            <h2 className="text-2xl text-accent-400 font-semibold">
                Update your guest profile
            </h2>
            <p className="text-primary-200 text-lg mt-4">
                Providing the following information will make your check-in process
                faster and smoother. See you soon!
            </p>

            <UpdateProfileForm guest={guest}>
                <SelectCountry
                    name="nationality"
                    id="nationality"
                    defaultCountry={guest?.nationality || ''}
                    countryFlag={guest?.countryFlag || ''}
                    className="p-2 sm:p-4 w-[100%] text-primary-800 bg-primary-100 shadow-sm "
                />
            </UpdateProfileForm>
        </div>
    );
}
