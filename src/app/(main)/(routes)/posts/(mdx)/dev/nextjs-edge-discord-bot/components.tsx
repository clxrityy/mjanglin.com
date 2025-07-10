import Image from "next/image";
import { GithubRepo } from "@birdgg/react-github";
import Link from "next/link";


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
            <GithubRepo repo="clxrityy/nextjs-discord-bot-with-oauth" />
        </div>
    )
}

export function TemplateRepository() {
    return (
        <div className="hover:scale-105 cursor-pointer rounded-lg hover:drop-shadow-2xl transition-all duration-300 ease-out flex w-full items-center justify-center">
            <GithubRepo repo="jzxhuang/nextjs-discord-bot" />
        </div>
    )
}

export function ExampleDashboardGif() {
    return (
        <div className="flex flex-col gap-4 w-full items-center justify-center">
            <Image priority src={"https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcbeolsdvgqp06okcij8j.gif"} alt="Example of the dashboard" width={400} height={400} className="rounded-lg hover:scale-110 transition-all duration-300 ease-out" />
            <blockquote>
                <p className="text-sm font-light">
                    Dashboard example from <Link href={"https://hbd.mjanglin.com"}>
                        hbd.mjanglin.com
                    </Link>
                </p>
            </blockquote>
        </div>
    )
}