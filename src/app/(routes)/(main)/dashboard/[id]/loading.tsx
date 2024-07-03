import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="w-screen h-screen">
            <div className="flex flex-row gap-20 items-center justify-center w-full h-full">
                <Skeleton className="w-30 h-[100vh] opacity-70" />
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-20 h-1/2 items-center justify-center w-2/3">
                    <Skeleton className="w-80 h-40 rounded-md opacity-70" />
                    <Skeleton className="w-80 h-40 rounded-md opacity-70" />
                    <Skeleton className="w-80 h-40 rounded-md opacity-70" />
                </div>
            </div>
        </div>
    )
}