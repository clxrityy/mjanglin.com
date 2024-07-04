import configurations from "@/config";
import Link from "next/link";
import { Button, Chip, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import Image from "next/image";

const { icons, colors } = configurations;

export default function Hero() {

    return (
        <div className="w-full h-1/2 flex items-center justify-center">
            <div className="w-full h-1/3 flex items-center justify-center">
                <div className="bg-gradient-to-br from-zinc-500/30 to-zinc-300/20 rounded-2xl px-12 py-8 backdrop:blur-3xl flex items-center justify-center flex-col gap-5 drop-shadow-xl shadow-inner">
                    <div className="flex justify-end w-full">
                        <p className="font-mono text-sm">
                            @cl<span className="underline underline-offset-4">x</span>rity
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-5 lg:gap-7 xl:gap-9 items-center">
                        <Image src="/img/keyboard.gif" alt="keyboard" width={100} height={100} className="backdrop:bg-blend-mulitply filter bg-blend-hue hidden lg:flex place-self-center opacity-90" fetchPriority="high" unoptimized priority />
                        <Image src="/img/soundwave.gif" alt="soundwave" width={100} height={100} className="backdrop:bg-blend-multiply filter bg-blend-hue flex place-self-center opacity-90" fetchPriority="high" unoptimized priority />
                        <div className="flex flex-col items-start justify-center">
                            <h1 className="text-center">
                                MJ Anglin
                            </h1>
                            <h3 className="uppercase text-base opacity-85">
                                Developer
                            </h3>
                            <h3 className="uppercase text-base opacity-85">
                                Creator
                            </h3>
                        </div>
                    </div>
                    <div className="flex w-full items-center flex-col lg:flex-row justify-center lg:justify-around gap-5">
                        <Popover placement="right" className="">
                            <PopoverTrigger>
                                <Button variant="bordered" className="bg-gradient-to-tr from-blue-500 to-purple-500 text-white font-semibold tracking-wider">skills</Button>
                            </PopoverTrigger>
                            <PopoverContent className="bg-transparent/50 shadow-xl">
                                <div className="px-4 rounded-lg py-2 flex items-center justify-start text-center w-full">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-center gap-1 items-center grid-flow-dense">
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
                                <icons.github color={colors.github} aria-label="github" />
                            </Link>
                            {/* <Link href="" className="hero-link">
                                <icons.spotify color={colors.spotify} />
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}