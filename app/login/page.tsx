import SignInButton from "@/app/_components/SigninButton";

export const metadata = {
    title: 'Login'
}

export default function page(): JSX.Element {
    return (
        <div className="flex flex-col justify-center items-center gap-6 py-12">
            <h2 className="text-xl font-semibold text-primary-200 sm:text-2xl">Sign in to access guest area</h2>
            <SignInButton />
        </div>
    )
}
