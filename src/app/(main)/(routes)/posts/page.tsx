import { MdxPostCard } from "@/components/cards/MdxPostCard";
import { mdxPosts } from "@/config";

export default async function Page() {

    return (
        <div className="h-full mx-auto relative w-max xl:mt-10">
            <div className="flex flex-col items-center justify-center gap-10 lg:gap-12 xl:gap-16 mt-96 sm:mt-80 md:mt-72 lg:mt-0 h-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 xl:gap-10 2xl:gap-12 items-center justify-center h-auto w-full mx-auto">
                    {mdxPosts.map((mdxPost) => (
                        <MdxPostCard key={mdxPost.slug} post={mdxPost} />
                    ))}
                </div>
            </div>
        </div>
    )
}