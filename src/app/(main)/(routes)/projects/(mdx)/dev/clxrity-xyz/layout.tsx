import MdxPostContainer from "@/components/layout/ProjectContainer";
import { findProject } from "@/utils/findProject";
import type { Metadata } from "next";

const project = findProject("A website for displaying and downloading audio files");


export async function generateMetadata(): Promise<Metadata> {

    return {
        title: project.title,
        description: project.preview,
        keywords: project.keywords
    }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <MdxPostContainer>
            {children}
        </MdxPostContainer>
    );
}