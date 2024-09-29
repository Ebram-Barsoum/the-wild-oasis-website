import { auth } from "@/app/_lib/auth"

export default async function User(): Promise<JSX.Element | null> {
    const session = await auth();
    if (!session) return null;

    return (
        <div className="flex justify-center items-center gap-2">
            <img src={session?.user?.image || ''} alt={session?.user?.name || ''} width={50} height={50} className="rounded-full h-6 w-6" />
            <span>{session?.user?.name}</span>
        </div>
    )
}
