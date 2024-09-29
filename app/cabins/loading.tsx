import Spinner from "@/app/_components/Spinner";

export default function Loading() {
    return (
        <div className="grid items-center justify-center">
            <Spinner />
            <p className="text-2xl text-primary-500">Loading cabins ...</p>
        </div>
    )
}
