export default function Loading() {
    return <main className="max-h-screen w-full z-20 h-full">
        <div className="mx-auto w-full max-h-screen h-full bg-fixed">
            <div className="grid grid-flow-row 2xl:grid-flow-col w-full items-center 2xl:justify-stretch gap-10 lg:gap-20 xl:gap-40 max-h-screen h-full">
                {/* Left Side */}
                <div className="w-full flex flex-col gap-12 items-center justify-center 2xl:border-r px-10 border-r-zinc-800 2xl:z-0 flex-1 border-b border-b-zinc-800 2xl:border-b-0">
                    <div className="flex flex-col gap-10 items-center justify-center w-full">
                        <div className="flex flex-col xl:flex-row w-full gap-0 items-center justify-between lg:gap-5 2xl:gap-10">
                            {/* HeroCard Skeleton */}
                            <div className="w-48 h-48 rounded-2xl bg-zinc-800 animate-pulse mb-6 xl:mb-0" />
                            <div className="flex flex-col w-1/3 items-center justify-start gap-10 2xl:pb-20 lg:pb-20">
                                {/* TimeCard Skeleton */}
                                <div className="w-32 h-16 rounded-lg bg-zinc-800 animate-pulse" />
                                {/* SpotifyProfile Skeleton */}
                                <div className="w-40 h-20 rounded-lg bg-zinc-800 animate-pulse" />
                            </div>
                        </div>
                        {/* DescriptionCard Skeleton */}
                        <div className="flex items-center justify-center mb-10 2xl:my-0 2xl:mb-0 flex-col gap-10">
                            <div className="w-80 h-24 rounded-lg bg-zinc-800 animate-pulse" />
                        </div>
                    </div>
                </div>
                {/* Right Side */}
                <div className="flex flex-col gap-5 items-center justify-center w-full 2xl:w-max 2xl:px-10 mt-5 2xl:z-50">
                    {/* Projects Skeleton */}
                    <div className="w-96 h-60 rounded-lg bg-zinc-800 animate-pulse" />
                    {/* AllProjectsBtn Skeleton */}
                    <div className="w-40 h-12 rounded-full bg-zinc-800 animate-pulse" />
                </div>
            </div>
        </div>
    </main>;
}