import MdxPostContainer from "@/components/layout/MdxPostContainer";
import { findPost } from "@/utils/findPost";
import type { Metadata } from "next";

const post = findPost("Host a Minecraft server for free");

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