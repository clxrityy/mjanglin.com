import { MdxPostContainer } from "@/components/layout/MdxPostContainer";
import { mdxPosts } from "@/utils/constants";
import type { Metadata } from "next";

const post = mdxPosts[2];

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: post.title,
        description: post.preview,
        keywords: post.keywords
    }
};

export default async function Layout({children}: {children: React.ReactNode}) {
    return (
        <MdxPostContainer>
            {children}
        </MdxPostContainer>
    );
}