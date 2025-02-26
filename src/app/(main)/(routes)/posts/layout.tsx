import "@/styles/css/post.css";
import { Metadata } from "next";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export const metadata: Metadata = {
    title: "MJ Anglin | Posts",
    description: "A collection of posts written by MJ Anglin",
}


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen w-full mx-auto">
            <Link href="/posts" className="fixed top-0 left-0 px-3 py-4 link" aria-label="back">
                <MdArrowBack size={30} className="relative z-50" />
            </Link>
            <div className="flex items-center justify-center w-full">
                <div className="w-full lg:w-2/3 xl:w-1/2">
                    <div className="py-10 markdown-body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}