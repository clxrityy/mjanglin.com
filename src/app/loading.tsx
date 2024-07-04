import { Skeleton } from "@nextui-org/react";

export default async function Loading() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-xl flex flex-col xl:flex-row items-center justify-center mx-auto gap-20">
                <Skeleton className="w-50 h-50 animate-pulse rounded-lg" />
                <Skeleton className="w-30 h-40 animate-pulse rounded-lg" />
            </div>
        </div>
    )
}