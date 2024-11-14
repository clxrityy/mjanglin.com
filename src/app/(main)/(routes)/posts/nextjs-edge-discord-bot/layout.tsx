import { mdxPosts } from "@/utils/constants";
import type { Metadata } from "next";

const post = mdxPosts[0];

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: post.title,
        description: post.preview,
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