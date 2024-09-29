import Link from "next/link";
import Image from "next/image";

export default function Logo(): JSX.Element {
  return (
    <Link href="/" className="flex items-center gap-4" prefetch={true}>
      <Image src="/logo.png" alt="the wild oasis logo" width={60} height={60} className="h-[3rem] w-[3rem] sm:h-[4rem] sm:w-[4rem]" priority />
      <span className=" font-bold text-lg sm:text-xl">The Wild Oasis</span>
    </Link>
  )
}
