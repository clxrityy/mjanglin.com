import { AllPostsBtn } from "@/components/AllPostsBtn";
import { HeroCard } from "@/components/Hero";
import { ReadMore } from "@/components/cards/ReadMore";
import { SpotifyProfile } from "@/components/cards/SpotifyProfile";
import { StackCard } from "@/components/cards/StackCard";
import { TimeCard } from "@/components/cards/TimeCard";
import { spotifyProfile } from "@/lib/spotifyApi";
import { getAllPosts } from "@/sanity/lib/queries";
import { mdxPosts } from "@/utils/constants";
import { Clock } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";



const Posts = dynamic(() => import("@/components/Posts").then(mod => mod.Posts));
// const PostCard = dynamic(() => import("@/components/cards/PostCard").then(mod => mod.PostCard));

export default async function Page() {

    const posts = await getAllPosts();
    const spotifyData = await spotifyProfile();

    return (
        <main className="h-screen w-screen z-50 overflow-y-scroll">
            <div className="container mx-auto w-full h-screen">
                <div className="grid grid-flow-row lg:grid-flow-col lg:h-2/3 w-full items-center justify-center gap-10 lg:gap-20 xl:gap-40">
                    <div className="w-full flex flex-col gap-12 items-center justify-center">
                        <div className="flex flex-col gap-10 items-center justify-center w-full">
                            <div className="flex flex-col w-full gap-0 items-center justify-center 2xl:justify-start lg:gap-5">
                                <HeroCard />
                                <div className="flex flex-col w-full items-center justify-center gap-10 2xl:pb-20">
                                    <Suspense fallback={<Clock className="animate-spin" />}>
                                        <TimeCard />
                                    </Suspense>
                                    {
                                        spotifyData && <SpotifyProfile data={spotifyData} />
                                    }
                                </div>
                            </div>
                            <div className="flex items-center justify-center py-8 my-20 mb-24 lg:my-0 flex-col gap-10">
                                <StackCard>
                                    <section className="flex flex-col gap-3 items-center justify-center font-exo mt-3 ml-3 opacity-85">
                                        <p className="text-sm font-light">
                                            Network specialist who loves to code and create.
                                        </p>
                                        <p className="text-sm font-light">
                                            I build websites and applications that interact with the world.
                                        </p>
                                        {/* <div className="flex flex-row items-center justify-center gap-3">
                                            <Link href={"mailto:contact@mjanglin.com"} className="hover:text-[#4996C0] transition-colors focus:text-blue-600" aria-label="contact@mjanglin.com">
                                                <Mail />
                                            </Link>
                                            <Link href={"/about"} className="hover:text-[#4996C0] transition-colors focus:text-blue-600" aria-label="about">
                                                <MdReadMore size={20} />
                                            </Link>
                                        </div> */}
                                        <ReadMore>
                                            Read more
                                        </ReadMore>
                                    </section>
                                </StackCard>
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-max grid grid-cols-1 2xl:grid-cols-2 items-center justify-center 2xl:justify-between mb-20 gap-16 2xl:gap-20 lg:mt-10 lg:-mx-10">
                        {
                            posts.map(post => <PostCard key={post._id} post={post} />)
                        }
                        {
                            mdxPosts.map(post => <MdxPostCard key={post.slug} post={post} />)
                        }
                    </div> */}
                    <div className="flex flex-col gap-5 items-center justify-center w-full">
                         <Suspense fallback={<div className="w-full bg-gray-500 h-full rounded-lg animate-pulse" />}>
                            <Posts posts={posts} mdxPosts={mdxPosts} />
                        </Suspense> 
                        {/* <button className="z-50 mb-10 bg-blue-500 px-4 py-4 rounded-xl font-semibold hover:scale-95 hover:bg-blue-600/50 transition-all duration-100 ease-in-out focus:ring focus:ring-offset-2 focus:bg-blue-600 w-1/2 md:w-4/5 2xl:w-1/3 border-2 border-blue-950/40 hover:border-blue-300/25">
                            <Link href={"/posts"} className="text-inherit hover:text-inherit flex flex-row lg:flex-col 2xl:flex-row gap-1 items-center justify-center w-full text-xl">
                                View all posts <LuGalleryHorizontalEnd />
                            </Link>
                        </button> */}
                        <AllPostsBtn />
                    </div>
                </div>
            </div>
        </main>
    )
}