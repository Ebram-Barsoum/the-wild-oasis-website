import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Not-found',

}

export default function NotFound(): JSX.Element {
    return (
        <main className="flex flex-col gap-6 justify-center items-center py-12">
            <h1 className="text-2xl">This page is Not found</h1>
            <Link className="p-2 bg-accent-400 hover:bg-accent-500 transition-colors text-primary-800" href='/'>Back to home</Link>
        </main >
    )
}
