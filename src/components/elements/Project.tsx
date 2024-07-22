"use client";
import Image from "next/image";
import Link from "next/link";
import configurations from "@/config";
import { ProjectParams } from "@/utils/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TAGS } from "@/utils/constants";


const { icons } = configurations;

export default function Project({ name, thumbnail, description, link, images, short_desc, github, tags, style, demo_link }: ProjectParams) {

    const gradient = style?.gradient_from && style?.gradient_to ? `bg-gradient-to-br from-[${style.gradient_from}] to-[${style.gradient_to}]` : "bg-gradient-to-br from-zinc-950 to-zinc-800";

    return (
        <Card className={`${gradient} px-4 py-4 rounded-xl shadow hover:scale-95 transition cursor-pointer focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-400 relative flex flex-col gap-5 filter grayscale hover:grayscale-0 transition-transform-colors small-shadow`}>
            <CardHeader className="w-full flex items-stretch flex-row max-h-[200px] justify-evenly">
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-3xl font-bold text-center hover:underline">
                        <Link prefetch href={link} className="">
                            {name}
                        </Link>
                    </CardTitle>
                    <CardDescription>
                        {short_desc}
                    </CardDescription>
                </div>
                {thumbnail && <Link href={link}>
                    <Image src={thumbnail} alt={name} width={100} height={100} className="rounded-lg flex" />
                </Link>}
            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-between w-full gap-4 items-center">
                    <span className="opacity-85">
                        {description && description}
                    </span>
                    <Link href={link} className="hover:scale-95 transition-transform grid grid-cols-1 gap-1 items-center">
                        {images && images.map((image, idx) => (
                            <Image src={image} alt={name} width={300} height={300} className="rounded-lg opacity-80" unoptimized key={idx} />
                        ))}
                    </Link>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 items-center">
                    <div className="grid grid-cols-3 items-center gap-2 w-full">
                        {tags?.map((tag, index) => {
                            const icon = (name: string) => {
                                const tag = TAGS.find(tag => tag.name === name);
                                return tag?.icon || icons.star;
                            }
                            const Icon = icon(tag);

                            return <span key={index} className={`bg-zinc-950/75 flex flex-row items-center gap-1 text-center rounded-md text-sm justify-center px-2 py-1 hover:scale-105 transition-transform`}>
                                <Icon />
                                {tag}
                            </span>
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-1 justify-self-end w-full text-zinc-300 text-sm">
                    {demo_link && (
                        <Link href={demo_link} className="hover:underline flex flex-row gap-1 items-center">
                            <icons.star />
                            Demo link
                        </Link>
                    )}
                    {github && (
                        <Link href={github} className="hover:underline flex flex-row gap-1 items-center">
                            <icons.github />
                            View on GitHub
                        </Link>
                    )}
                </div>

            </CardFooter>
        </Card>
    )
}

