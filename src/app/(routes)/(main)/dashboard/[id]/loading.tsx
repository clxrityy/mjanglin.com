import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="w-screen h-screen">
            <div className="flex flex-row">
                <Skeleton className="w-20 h-50 opacity-70" />
            </div>
        </div>
    )
}