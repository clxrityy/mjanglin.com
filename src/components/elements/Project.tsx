import Image from "next/image";
import Link from "next/link";
import configurations from "@/config";
import { ProjectParams } from "@/utils/types";
import { TAGS } from "@/utils/constants";


const { icons } = configurations;

export default async function Project({ name, thumbnail, description, link, examples, short_desc, github, tags, demo_link }: ProjectParams) {

    return (
        <div className={`border px-10 py-4 rounded-lg border-opacity-15 border-white bg-gradient-to-tr from-blue-950/20 to-blue-700/15 shadow-lg shadow-white/20 hover:scale-x-95 transition-all duration-700 ease-linear hover:shadow-xl relative`}>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                    {thumbnail && <Link prefetch href={link}>
                        <Image src={thumbnail} alt={name} width={75} height={75} className="rounded-lg flex" />
                    </Link>}
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold text-center hover:underline hover:text-blue-500 transition">
                            <Link prefetch href={link} className="">
                                {name}
                            </Link>
                        </h1>
                        <p className="">
                            {short_desc}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-5 w-full">
                    <span className="max-w-[1/3] flex items-center justify-center flex-auto text-sm xl:text-base">
                        {description && description}
                    </span>
                    <div className="flex flex-col items-center justify-center w-2/3 gap-3">
                        {examples && examples.map((example, idx) => (
                            <Link key={idx} href={example.webm ? example.webm : example.mp4} className="hover:scale-105 transition-transform duration-500 shadow-2xl shadow-black rounded-lg hover:border-2 ease-out focus:ring-blue-500 focus:ring">
                                <video width={500} height={500} className="rounded-lg opacity-100" key={idx} autoPlay muted loop playsInline>
                                    <source src={example.mp4} type="video/mp4" />
                                    <source src={example.webm} type="video/webm" />
                                </video>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4 items-center justify-center w-full py-4">
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-2 items-center justify-around gap-3 w-full lg:w-2/3 xl:w-1/2">
                        {tags?.map((tag, index) => {
                            const icon = (name: string) => {
                                const tag = TAGS.find(tag => tag.name === name);
                                return tag?.icon || icons.star;
                            }
                            const Icon = icon(tag.name);

                            return <span key={index} className={`bg-zinc-950/75 flex flex-row items-center gap-2 text-center rounded-md text-sm justify-center px-2 py-1 hover:scale-105 transition-transform w-fit mx-auto`}>
                                <Icon size={12} />
                                {tag.name}
                            </span>
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-1 justify-self-end w-full text-zinc-300 text-sm">
                    {demo_link && (
                        <Link href={demo_link} className="hover:underline hover:text-blue-500 flex flex-row gap-1 items-center">
                            <icons.star />
                            Demo link
                        </Link>
                    )}
                    {github && (
                        <Link href={github} className="hover:underline hover:text-blue-500 flex flex-row gap-1 items-center">
                            <icons.github />
                            View on GitHub
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

