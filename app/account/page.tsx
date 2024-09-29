import { auth } from "@/app/_lib/auth";

export const metadata: { title: String } = {
  title: 'Guest Area'
};

export default async function Page(): Promise<JSX.Element> {
  const session = await auth();

  return (
    <h1 className="text-accent-400 text-2xl">Welcome, {session?.user?.name}</h1>
  )
}
