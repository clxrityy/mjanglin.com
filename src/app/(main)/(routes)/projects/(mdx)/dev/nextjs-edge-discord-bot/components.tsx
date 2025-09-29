import Image from "next/image";
import { GithubRepo } from "@birdgg/react-github";
import { Suspense } from "react";
import { TiWarning } from "react-icons/ti";


export function MainImage() {
    return (
        <div className="flex flex-col w-full items-center justify-center gap-2">
            <ExampleDashboardGif />
        </div>
    )
}

export function DemoRespository() {
    return (
        <div className="hover:scale-105 cursor-pointer rounded-lg hover:drop-shadow-2xl transition-all duration-300 ease-out flex w-full items-center justify-center">
            <Suspense fallback={<div className="w-full h-10 bg-gray-500 rounded-lg animate-pulse" />}>
                <GithubRepo repo="clxrityy/nextjs-discord-bot-with-oauth" />
            </Suspense>
        </div>
    )
}

export function TemplateRepository() {
    return (
        <div className="hover:scale-105 cursor-pointer rounded-lg hover:drop-shadow-2xl transition-all duration-300 ease-out flex w-full items-center justify-center">
            <Suspense fallback={<div className="w-full h-10 bg-gray-500 rounded-lg animate-pulse" />}>
                <GithubRepo repo="jzxhuang/nextjs-discord-bot" />
            </Suspense>
        </div>
    )
}

export function ExampleDashboardGif() {
    return (
        <div className="flex flex-col gap-6 w-full items-center justify-center">
            <Image priority src={"https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcbeolsdvgqp06okcij8j.gif"} alt="Example of the dashboard" width={400} height={400} className="rounded-lg hover:scale-110 transition-all duration-300 ease-out" />
            <blockquote className="text-center flex flex-col gap-4 items-center justify-center max-w-xs">
                <p className="text-sm font-light">
                    Dashboard example from <a href="https://hbd.clxrity.xyz" target="_blank" rel="noopener noreferrer">
                        hbd.mjanglin.com
                    </a>
                </p>
                <p className="text-sm flex flex-col gap-2 pt-3 border-l-3 border-red-500/25 items-start justify-center bg-gradient-to-b from-red-700/10 to-red-950/5 p-2 rounded-md w-fit shadow-lg">
                    <span className="font-medium">
                        <TiWarning className="inline mr-1 text-red-400/65 mb-1" size={20} />
                        Note: project moved to <a href="https://hbd.clxrity.xyz" target="_blank" rel="noopener noreferrer">hbd.clxrity.xyz</a> <span className="text-xs font-light">
                            (September 2025)
                        </span>
                    </span>
                    <span className="text-xs">
                        View the updated repository <a href="https://github.com/clxrityy/clxrity.xyz/tree/hbd" target="_blank" rel="noopener noreferrer">
                            clxrityy/clxrity.xyz/hbd
                        </a>
                    </span>
                </p>
            </blockquote>
        </div>
    )
}