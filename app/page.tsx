import Image from 'next/image';

import bg from "@/public/bg.png";
import Explore from './_components/Explore';

export default function Home(): JSX.Element {
  return (
    <main className='mt-28 pt-28'>
      <Image src={bg} quality={90} fill alt='Mountains and forests with two cabins' className='object-cover object-top' placeholder='blur' />

      <div className='flex flex-col gap-10 items-center justify-center ' >
        <h1 className='text-center text-4xl md:text-6xl lg:text-7xl z-0 '>Welcome to Paradise</h1>
        <Explore />
      </div>
    </main>
  );
}
