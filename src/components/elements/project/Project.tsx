"use client";
import Image from "next/image";
import Link from "next/link";
import configurations from "@/config";
import { ProjectParams } from "@/utils/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TAGS } from "@/utils/constants";

const { icons } = configurations;

export default function Project({ name, thumbnail, description, link, image, short_desc, github, tags, style }: ProjectParams) {

    const gradient = style?.gradient_from && style?.gradient_to ? `bg-gradient-to-br from-${style.gradient_from} to-${style.gradient_to}` : "bg-gradient-to-br from-purple-900/85 to-pink-950/60";

    return (
        <Card className={`${gradient} px-4 py-4 rounded-xl shadow hover:scale-95 transition cursor-pointer focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-400 relative flex flex-col gap-5 filter grayscale hover:grayscale-0 transition-transform-colors`}>
            <CardHeader className="w-full flex items-stretch flex-row max-h-[200px] justify-evenly">
                <div className="flex flex-col gap-2">
                    <CardTitle className="text-3xl font-bold text-center hover:undline">
                        <Link href={link}>
                            {name}
                        </Link>
                    </CardTitle>
                    <CardDescription>
                        {short_desc}
                    </CardDescription>
                </div>
                {thumbnail && <Image src={thumbnail} alt={name} width={100} height={100} className="rounded-lg flex" />}
            </CardHeader>
            <CardContent>
                <div className="flex flex-col justify-between w-full gap-4">
                    <span className="opacity-85">
                        {description && description}
                    </span>
                    <Link href={link} className="hover:scale-95 transition-transform">
                        {image && <Image src={image} alt={name} width={100} height={100} className="rounded-lg" />}
                    </Link>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-5">
                <div className="flex flex-col gap-4 items-center">
                    <div className="grid grid-cols-3 items-center gap-2 w-full">
                        {tags?.map((tag, index) => {

                            const color = (name: string) => {
                                const tag = TAGS.find(tag => tag.name === name);
                                return tag?.color || "#ffffff";
                            }

                            const icon = (name: string) => {
                                const tag = TAGS.find(tag => tag.name === name);
                                return tag?.icon || icons.star;
                            }
                            const Icon = icon(tag);

                            return <span key={index} className={`bg-zinc-950/75 flex flex-row items-center gap-1 text-center rounded-md text-sm justify-center px-2 py-1`}>
                                <Icon />
                                {tag}
                            </span>
                        })}
                    </div>
                </div>
                {github && (
                    <Link href={github} className="text-xs text-zinc-300 hover:underline flex flex-row gap-1 items-center">
                        <icons.github />
                        View on GitHub
                    </Link>
                )}
            </CardFooter>
        </Card>
    )
}

