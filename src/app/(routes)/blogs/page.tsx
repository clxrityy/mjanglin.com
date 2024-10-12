import configurations from "@/config";
import { BLOGS } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

const { icons } = configurations;

export default async function Page() {


    return (
        <div className="w-screen flex items-center justify-center h-fit mx-10 mt-20">
            <div className="container flex flex-col gap-20 justify-between">
                <div className="flex flex-col gap-2 text-center">
                    <h1>
                        <icons.projectsBlog /> Dev Blogs
                    </h1>
                    <h3>
                        MJ Anglin
                    </h3>
                </div>
                <div className="flex items-center justify-center w-2/3">
                    <ul className="grid gap-5">
                        {BLOGS.map((blog, index) => (
                            <li key={index} className="relative border border-white/25 px-10 py-6 hover:scale-105 hover:border-white/50 transition-all duration-100 ease-linear rounded-md">
                                <div className="grid gap-5 items-center">
                                    <div className="flex flex-row items-center justify-between gap-4">
                                        <h5 className="font-bold">
                                            <Link href={blog.link} className="hover:underline underline-offset-2 hover:text-blue-600 transition duration-100 ease-in">
                                                {blog.title}
                                            </Link>
                                        </h5>
                                        <Image src={blog.thumbnail} alt={blog.title} width={50} height={50} />
                                    </div>
                                    <p className="text-sm text-gray-300 max-w-[400px]">
                                        {blog.description}
                                    </p>
                                    <div className="grid grid-cols-3 gap-2 items-center">
                                        {
                                            blog.tags.map((tag, index) => (
                                                <div key={index} className="flex flex-row items-center gap-1 bg-gray-900 rounded-full px-2 py-1 text-center justify-center text-lg md:text-xs">
                                                    <tag.icon color={tag.color} />
                                                    <span className="hidden md:block">
                                                        {tag.name}
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div className="absolute bottom-0 right-0 px-2 py-1">
                                        <span className="font-thin font-mono text-xs text-gray-400">
                                            {blog.date}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}