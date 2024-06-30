import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-screen h-screen relative">
            <div className="absolute flex flex-row justify-stretch">
                <Skeleton className="w-14 h-14 rounded-full top-0 left-0 px-2 py-2" />
            </div>
            <div className="w-screen max-h-screen flex flex-col items-center mx-auto gap-20 justify-center py-20">
                <div className="flex flex-row items-center justify-center gap-5">
                    <Skeleton className="w-20 h-5" />
                    <Skeleton className="w-20 h-20 rounded-full" />
                </div>
                <div className="flex items-center justify-center flex-col gap-2 w-full">
                    <Skeleton className="w-1/2 h-8" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-full max-w-sm md:max-w-xl lg:max-w-4xl gap-8 mx-auto">
                    <Skeleton className="w-40 h-12" />
                    <Skeleton className="w-40 h-12" />
                    <Skeleton className="w-40 h-12" />
                    <Skeleton className="w-40 h-12" />
                </div>
                <div className="flex flex-row items-center justify-center gap-5">
                    <Skeleton className="w-32 h-32 rounded-lg" />
                </div>
            </div>
        </div>
    )
}