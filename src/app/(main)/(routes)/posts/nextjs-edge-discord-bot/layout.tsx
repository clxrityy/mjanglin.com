import { mdxPosts } from "@/utils/constants";
import type { Metadata, ResolvingMetadata } from "next";

const post = mdxPosts[0];

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: post.title,
        description: post.preview,
        openGraph: {
            images: [post.mainImage, ...previousImages]
        },
        keywords: post.keywords
    }
}

export default async function Layout({children}: {children: React.ReactNode}) {
    return (
        <div className="w-screen h-full text-center">
            <div className="flex items-center justify-center flex-col gap-4 w-full mx-auto">
                <div className="max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}