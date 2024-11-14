import { HeroCard } from "@/components/Hero";
import { MdxPostCard } from "@/components/cards/MdxPostCard";
import { StackCard } from "@/components/cards/StackCard";
import { TimeCard } from "@/components/cards/TimeCard";
import { getAllPosts } from "@/sanity/lib/queries";
import { mdxPosts } from "@/utils/constants";
import { Clock, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const PostCard = dynamic(() => import("@/components/cards/PostCard").then(mod => mod.PostCard));

export default async function Page() {

    const posts = await getAllPosts();

    return (
        <main className="h-screen w-screen z-50 overflow-y-scroll">
            <div className="container mx-auto w-full h-screen">
                <div className="grid grid-flow-row lg:grid-flow-col lg:h-2/3 w-full items-center justify-center gap-10 lg:gap-20 xl:gap-40">
                    <div className="w-full flex flex-col gap-12 items-center justify-center">
                        <div className="flex flex-col gap-10 items-center justify-center">
                            <div className="flex flex-col w-full gap-0 lg:flex-row items-center justify-center lg:justify-start lg:gap-10 xl:gap-20">
                                <HeroCard />
                                <Suspense fallback={<Clock className="animate-spin" />}>
                                    <TimeCard />
                                </Suspense>
                            </div>
                            <div className="flex items-center justify-center py-10 my-20 mb-24 lg:my-0">
                                <StackCard>
                                    <section className="flex flex-col gap-3 items-center justify-center font-exo mt-3 ml-3 opacity-85">
                                        <p className="text-sm font-light">
                                            Network specialist who loves to code and create.
                                        </p>
                                        <p className="text-sm font-light">
                                            I build websites and applications that interact with the world.
                                        </p>
                                        <div className="flex flex-row items-center justify-center gap-3">
                                            <Link href={"mailto:contact@mjanglin.com"} className="hover:text-[#4996C0] transition-colors focus:text-blue-600">
                                                <Mail />
                                            </Link>
                                        </div>
                                    </section>
                                </StackCard>
                            </div>
                        </div>
                    </div>
                    <div className="w-max grid grid-cols-1 2xl:grid-cols-2 items-center justify-center 2xl:justify-between mb-20 gap-16 2xl:gap-20 lg:mt-10 lg:-mx-10">
                        {
                            posts.map(post => <PostCard key={post._id} post={post} />)
                        }
                        {
                            mdxPosts.map(post => <MdxPostCard key={post.slug} post={post} />)
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}