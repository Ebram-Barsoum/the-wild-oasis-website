import { FcGoogle } from "react-icons/fc";
import { signInAction } from "@/app/_lib/actions";

export default function SignInButton(): JSX.Element {

    return (
        <form action={signInAction}>
            <button className="flex items-center gap-2 border border-primary-200 p-2 " >
                <FcGoogle className="text-2xl" />
                <span> Continue with google</span>
            </button>
        </form>
    )
}
