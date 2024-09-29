import Link from "next/link";

export default function Explore(): JSX.Element {
    return (
        <Link href={'/cabins'} className=' w-[fit-content] text-md sm:text-lg px-6 py-3 z-0 text-primary-900 bg-accent-400 hover:bg-accent-500 transition-colors'>Explore the luxury</Link>
    )
}
