"use server";
import { Metadata } from "next"


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "hbd discord bot",
        description: "A dynamic Discord birthday bot built with Nextjs, runs using edge runtime",
        keywords: [
            "discord",
            "bot",
            "birthday",
            "nextjs",
            "edge",
            "runtime",
            "oauth2",
            "prisma",
            "vercel",
            "postgres",
            "typescript",
            "react",
            "discord-api-types",
            "prisma-accelerate"
        ],
        openGraph: {
            images: [
                {
                    url: "https://hbd.mjanglin.com/apple-touch-icon.png",
                    width: 180,
                    height: 180,
                    alt: "hbd logo"
                }
            ]
        }
    }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}