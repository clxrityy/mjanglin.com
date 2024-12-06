import { MdxPostCard } from "@/components/cards/MdxPostCard";
import { PostCard } from "@/components/cards/PostCard";
import { getAllPosts } from "@/sanity/lib/queries";
import { mdxPosts } from "@/utils/constants";

export default async function Page() {
    const posts = await getAllPosts();

    return (
        <div className="h-screen w-screen z-50 overflow-y-scroll scroll-smooth mx-auto relative">
            <div className="w-screen h-full flex flex-col items-center justify-center gap-10 lg:gap-12 xl:gap-16 mt-96 sm:mt-80 md:mt-72 lg:mt-0 xl:-mt-20">
                <div className="flex flex-col items-center justify-center mt-28 gap-4 xl:mt-0 mx-20 lg:mx-48 xl:mx-96 2xl:mx-[30rem]">
                    <h2 className="tracking-wider">
                        Posts by MJ Anglin
                    </h2>
                    <p className="text-sm md:text-base tracking-wide text-white/75">
                        These are a collection of all the posts written by MJ Anglin. Posts are written on a variety of topics and categories ranging from <span className="font-semibold">technology</span>, <span className="font-semibold">networking</span>, <span className="font-semibold">development</span>, <span className="font-semibold">music</span>, <span className="font-semibold">psychology</span>, and more.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 xl:gap-10 2xl:gap-12 items-center justify-between">
                    {
                        posts.map((post, idx) => (
                            <PostCard key={idx} post={post} />
                        ))
                    }
                    {
                        mdxPosts.map((mdxPost, idx) => (
                            <MdxPostCard key={idx} post={mdxPost} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}