"use server";

import { createBlogTable } from "@/app/(actions)/_actions/blogs";
import BlogHeader from "@/components/blog/Header";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "MJ Anglin | Blogs",
        description: "Blog posts by MJ Anglin",
    };
}

export default async function BlogLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    try {
        await createBlogTable();
    } catch (e) {
        console.error(e);
        throw e;
    }

    return <div className="h-fit w-full flex flex-col items-center justify-center mx-auto max-w-7xl">
        <BlogHeader />
        {children}
    </div>;
}