import { MdxPostCard } from "@/components/cards/MdxPostCard";
import { PostCard } from "@/components/cards/PostCard";
import { getAllPosts } from "@/sanity/lib/queries";
import { mdxPosts } from "@/utils/constants";

export default async function Page() {
    const posts = await getAllPosts();

    return (
        <div className="h-full w-screen overflow-y-scroll scroll-smooth mx-auto relative">
            <div className="w-screen flex flex-col items-center justify-center gap-10 lg:gap-12 xl:gap-16 mt-96 sm:mt-80 md:mt-72 lg:mt-0 xl:-mt-20 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 xl:gap-10 2xl:gap-12 items-center justify-between h-auto">
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