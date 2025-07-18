export default function Loading() {
    // Number of skeleton cards to show (matches grid layout)
    const skeletonCount = 6;
    return (
        <div className="h-full mx-auto relative w-max xl:mt-10">
            <div className="flex flex-col items-center justify-center gap-10 lg:gap-12 xl:gap-16 mt-40 sm:mt-50 md:mt-72 lg:mt-0 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 xl:gap-14 2xl:gap-16 items-center justify-center h-auto w-full mx-auto">
                    {Array.from({ length: skeletonCount }).map((_, i) => (
                        <div
                            key={i}
                            className="w-80 h-60 rounded-2xl bg-zinc-800 animate-pulse shadow-lg border border-zinc-700 flex flex-col justify-between p-6"
                        >
                            <div className="w-2/3 h-6 bg-zinc-700 rounded mb-4" />
                            <div className="w-full h-4 bg-zinc-700 rounded mb-2" />
                            <div className="w-1/2 h-4 bg-zinc-700 rounded mb-6" />
                            <div className="flex gap-2 mt-auto">
                                <div className="w-16 h-8 bg-zinc-700 rounded" />
                                <div className="w-16 h-8 bg-zinc-700 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
