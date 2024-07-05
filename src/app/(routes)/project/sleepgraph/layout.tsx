"use server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> { 
    return {
        title: "MJ Anglin - sleep graph",
        description: "Calculate and visualize your sleep patterns with this sleep graph application",
        keywords: [
            "sleep",
            "graph",
            "nextjs",
            "edge",
            "runtime",
            "oauth2",
            "prisma",
            "vercel",
            "postgres",
            "typescript",
            "react",
            "prisma-accelerate",
            "recharts",
        ]
    }
}

export default async function Layout({ children }: { children: React.ReactNode }) { 
    return (
        <div>
            {children}
        </div>
    )
}