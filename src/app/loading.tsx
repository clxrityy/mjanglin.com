import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return <div className="w-screen h-screen">
        <div className="w-full h-full flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col my-10 items-center">
                <div className="flex flex-col items-center gap-5">
                    <Skeleton className="w-40 h-10" />
                    <Skeleton className="w-20 h-5" />
                </div>
            </div>
            <div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <Skeleton className="w-60 h-14 rounded-lg" />
                </div>
            </div>
        </div>
        <div className="w-full h-full flex items-center justify-center">
            <Skeleton className="w-96 h-96 rounded-full" />
        </div>
    </div>
}