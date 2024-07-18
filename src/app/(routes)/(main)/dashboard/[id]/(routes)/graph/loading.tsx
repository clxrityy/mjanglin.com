import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return <div className="w-full h-full">
        <div className="flex items-center justify-evenly w-full mx-auto flex-col xl:flex-row gap-20">
            <div className="w-full flex items-center justify-center min-h-[20rem] max-h-[50rem]">
                <Skeleton className="w-full h-full" />
            </div>
            <div className="w-full flex-1 items-center justify-center">
                <Skeleton className="w-full" />
            </div>
        </div>
    </div>
}