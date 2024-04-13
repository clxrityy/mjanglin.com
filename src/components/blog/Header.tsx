import Link from "next/link";
import { ComponentProps } from "react";
import configurations from "@/config";
import { Divider } from "@nextui-org/react";

type Props = ComponentProps<"header">;

const { icons } = configurations;


export default function BlogHeader({ ...props }: Props) {
    return <header {...props} className="w-full h-full flex flex-row items-center justify-between relative">
        <nav className="flex items-start absolute top-0 left-0 px-4 py-5 flex-row gap-4">
            <Link href="/" aria-label="home" className="hover:text-blue-500 transition-colors">
                <icons.home size={40} />
            </Link>
            <Link href="/blogs" aria-label="blogs" className="hover:text-blue-500 transition-colors hover:underline underline-offset-2">
                <h2>
                    MJ Anglin | Blogs
                </h2>
            </Link>
        </nav>
    </header>
}