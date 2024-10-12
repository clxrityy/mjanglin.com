"use server";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Nextjs Templates",
        description: "A collection of my handcrafted Nextjs templates",
        keywords: [
            "nextjs",
            "templates",
            "react",
            "typescript",
            "tailwindcss",
            "prisma",
            "postgres",
            "vercel",
            "edge",
            "runtime",
            "prisma-accelerate",
            "mongodb",
            "oauth2",
            "supabase",
            "firebase",
            "flask",
        ],
    }
}

export default async function Layout({children}: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}