import Image from "next/image";
import Link from "next/link";
import configurations from "@/config";
import { ProjectParams } from "@/utils/types";

const { icons } = configurations;

export default function Project({ name, description, link, image, footer, github, tags }: ProjectParams) {
    return (
        <Link href={link} className="bg-gradient-to-br from-emerald-600/25 to-cyan-600/50 px-4 py-4 rounded-md shadow hover:scale-95 transition cursor-pointer focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-400 relative flex flex-col gap-5">
            <div className="flex flex-row md:flex-col lg:flex-row items-center justify-center gap-2">
                <div className="flex flex-col items-center justify-center w-full gap-4">
                    <Link href={link} className="hover:scale-95 transition-all">
                        <Image src={image} alt={name} width={150} height={150} className="rounded-lg" unoptimized />
                    </Link>
                    <footer className="flex flex-col items-center w-full justify-between gap-2">
                        {footer && <p className="text-sm text-gray-300">{footer}</p>}
    
                        {github &&
                            <Link href={github} className="text-xs text-zinc-300 hover:underline flex flex-row gap-1 items-center">
                            <icons.github />
                            View on GitHub
                        </Link>}
                    </footer>
                </div>
                <section className="flex flex-col gap-2 justify-center px-1 py-2 w-full">
                    <h3>
                        <Link href={link} className="text-2xl font-bold text-center hover:underline">
                            {name}
                        </Link>
                    </h3>
                    <p className="text-sm w-full">
                        {description}
                    </p>
                </section>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-3 items-center w-fit">
                {tags?.map((tag, index) => (
                    <span key={index} className="bg-gray-900/50 text-xs px-2 py-1 rounded-md w-fit">{tag}</span>
                ))}
            </div>
        </Link>
    )
}