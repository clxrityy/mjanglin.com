import { AllPostsBtn } from "@/components/AllPostsBtn";
import { HeroCard } from "@/components/Hero";
import { DescriptionCard } from "@/components/cards/DescriptionCard";
import { SpotifyProfile } from "@/components/cards/SpotifyProfile";
// import { TimeCard } from "@/components/cards/TimeCard";
import { spotifyProfile } from "@/lib/spotifyApi";
import { mdxPosts } from "@/config";
import { Clock } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Posts = dynamic(() => import("@/components/Posts").then(mod => mod.Posts), {
    loading: () => <div className="w-full bg-gray-500 h-full rounded-lg animate-pulse" />,
})

const TimeCard = dynamic(() => import("@/components/cards/TimeCard").then(mod => mod.TimeCard), {
    loading: () => <Clock className="animate-spin" />,
});

export default async function Page() {

    // const posts = await getAllPosts();
    const spotifyData = await spotifyProfile();

    return (
        <main className="max-h-screen w-screen z-20 h-full">
            <div className="mx-auto w-full max-h-screen h-full bg-fixed">
                <div className="grid grid-flow-row 2xl:grid-flow-col w-full items-center 2xl:justify-stretch gap-10 lg:gap-20 xl:gap-40 max-h-screen h-full">
                    <div className="w-full flex flex-col gap-12 items-center justify-center 2xl:border-r px-10 border-r-zinc-800 2xl:z-0 flex-1 border-b border-b-zinc-800 2xl:border-b-0">
                        <div className="flex flex-col gap-10 items-center justify-center w-full">
                            <div className="flex flex-col xl:flex-row w-full gap-0 items-center justify-between lg:gap-5 2xl:gap-10">
                                <HeroCard />
                                <div className="flex flex-col w-max items-center justify-start gap-10 2xl:pb-20">
                                    <Suspense fallback={<Clock className="animate-spin" />}>
                                        <TimeCard />
                                    </Suspense>
                                    {
                                        spotifyData && <SpotifyProfile data={spotifyData} />
                                    }
                                </div>
                            </div>
                            <div className="flex items-center justify-center mb-10 2xl:my-0 2xl:mb-0 flex-col gap-10">
                                <DescriptionCard />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 items-center justify-center w-full 2xl:w-max 2xl:px-10 mt-5 2xl:z-50">
                        <Suspense fallback={<div className="w-full bg-gray-500 h-full rounded-lg animate-pulse" />}>
                            <Posts mdxPosts={mdxPosts} />
                        </Suspense>
                        <AllPostsBtn />
                    </div>
                </div>
            </div>
        </main>
    )
}