import MdxPostContainer from "@/components/layout/MdxPostContainer";
import { findPost } from "@/utils/findPost";
import type { Metadata } from "next";

const post = findPost("How to host a Discord bot on Vercel");

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: post.title,
        description: post.preview,
        keywords: post.keywords
    }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <MdxPostContainer>
            {children}
        </MdxPostContainer>
    );
}