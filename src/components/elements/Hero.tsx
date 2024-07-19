import configurations from "@/config";
import Link from "next/link";
import { Button, Chip, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import Image from "next/image";

const { icons, colors } = configurations;

export default function Hero() {

    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <div className="bg-gradient-to-br to-zinc-900 from-zinc-950 rounded-2xl px-12 py-8 backdrop:blur-3xl flex items-center justify-center flex-col gap-5 drop-shadow-xl shadow-md hover:scale-105 transition-all duration-200 filter grayscale hover:grayscale-0 transition-transform-colors cursor-pointer big-shadow">
                <div className="flex justify-end w-full h-fit">
                    <p className="font-mono text-sm">
                        @cl<span className="underline underline-offset-4">x</span>rity
                    </p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-5 lg:gap-7 xl:gap-9 items-center">
                    <Image src="/img/keyboard.gif" alt="keyboard" width={100} height={100} className="backdrop:bg-blend-mulitply bg-blend-hue hidden lg:flex place-self-center opacity-90" fetchPriority="high" unoptimized priority />
                    <Image src="/img/soundwave.gif" alt="soundwave" width={100} height={100} className="backdrop:bg-blend-multiply filter bg-blend-hue flex place-self-center opacity-90" fetchPriority="high" unoptimized priority />
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="text-center">
                            <span className="text-cyan-500">
                                MJ
                            </span>
                            <span className="text-purple-400">
                                Anglin
                            </span>
                        </h1>
                        <h3 className="uppercase text-base text-cyan-500/90">
                            Developer
                        </h3>
                        <h3 className="uppercase text-base text-purple-400/90">
                            Creator
                        </h3>
                    </div>
                </div>
                <div className="flex w-full items-center flex-col lg:flex-row justify-center lg:justify-around gap-5">
                    <Popover placement="right" className="">
                        <PopoverTrigger>
                            <Button variant="bordered" className="hover:bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-semibold tracking-wider uppercase transition-colors duration-250 rounded-md py-1">skills</Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-transparent/50 shadow-xl rounded-md">
                            <div className="px-4 rounded-lg py-2 flex items-center justify-start text-center w-full">
                                <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-center gap-3 items-center grid-flow-dense opacity-90 *:flex *:items-center *:justify-center *:border-opacity-50">
                                    <Chip variant="light"
                                        classNames={{
                                            base: "border border-white text-white"
                                        }}>
                                        <span className="flex flex-row items-center gap-1 text-center">
                                            <icons.nodejs color={colors.nodejs} /> <span>
                                                Node.js
                                            </span>
                                        </span>
                                    </Chip>
                                    <Chip variant="light"
                                        classNames={{
                                            base: "border border-white text-white"
                                        }}>
                                        <span className="flex flex-row items-center gap-1 text-center">
                                            <icons.typescript color={colors.typescript} /> <span>
                                                TypeScript
                                            </span>
                                        </span>
                                    </Chip>
                                    <Chip
                                        variant="light"
                                        classNames={{
                                            base: "border border-white text-white"
                                        }}

                                    >
                                        <span className="flex flex-row items-center gap-1 text-center">
                                            <icons.react color={colors.react} /> <span>
                                                React
                                            </span>
                                        </span>
                                    </Chip>
                                    <Chip
                                        variant="light"
                                        classNames={{
                                            base: "border border-white text-white"
                                        }}

                                    >
                                        <span className="flex flex-row items-center gap-1 text-center">
                                            <icons.python color={colors.python} /> <span>
                                                Python
                                            </span>
                                        </span>
                                    </Chip>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="flex w-full items-center flex-row justify-center lg:justify-end gap-4">
                        <Link href="https://github.com/clxrityy" className="hero-link">
                            <icons.github size={20} className="github" aria-label="github" />
                        </Link>
                        <Link href="https://instagram.com/mjxnglin" className="hero-link">
                            <icons.instagram className="instagram" aria-label="instagram" size={20} />
                        </Link>
                        <Link href="https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV" className="hero-link">
                            <icons.spotify className="spotify" aria-label="spotify" size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}