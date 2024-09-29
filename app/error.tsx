"use client";
import { Metadata } from "next";

interface ErrorProps {
    error: {
        message?: string
    },
    reset: () => void
}

export const metadata: Metadata = {
    title: 'lol'
}

export default function Error({ error, reset }: ErrorProps): JSX.Element {

    return <main className="flex flex-col gap-6 justify-center items-center py-12">
        <h1 className="text-2xl">Something went wrong :)</h1>
        <p className="text-red-500 text-xl">{error.message}</p>
        <button className="p-2 bg-accent-400 hover:bg-accent-500 transition-colors text-primary-800" onClick={() => reset()}>try again</button>
    </main>
}
