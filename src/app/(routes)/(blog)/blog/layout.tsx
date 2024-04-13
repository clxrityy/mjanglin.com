"use server";

import { createBlogTable } from "@/app/(actions)/_actions/blogs";
import { Metadata } from "next";


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "MJ Anglin | Blog",
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
    }

    return <div className="h-full w-full">
        {children}
    </div>
}