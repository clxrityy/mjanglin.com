import Line from "../animations/Line";
import configurations from "@/config";
import Image from "next/image";
// import {
//     HoverCard,
//     HoverCardContent,
//     HoverCardTrigger,
// } from "@/components/ui/hover-card";
// import Link from "next/link";

const { icons, colors, img } = configurations;

export default async function Hero() {

    const iconStyle = `border px-2 py-2 rounded-lg hover:bg-white/10 hover:scale-110 border-white/5 transition-all duration-200 cursor-pointer`;

    return (
        <div className="w-full h-full flex items-center justify-center flex-col gap-7 relative">
            <div className="flex flex-col items-center justify-center gap-5">
                <h1 className="hero-title">
                    MJ Anglin
                </h1>
                <div className="flex flex-col justify-center items-start uppercase font-jetbrains font-bold w-full">
                    <h3 className="text-cyan-600 w-full flex items-center flex-row justify-center gap-4 hero-heading">
                        Developer <Line />
                    </h3>
                    <h3 className="text-pink-500 w-full flex flex-row items-center justify-center gap-4 hero-heading">
                        Creator <Line />
                    </h3>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-2 justify-center">
                <p className={iconStyle}>
                    <icons.nodejs size={30} color={colors.nodejs} />
                </p>
                <p className={iconStyle}>
                    <icons.typescript size={30} color={colors.typescript} />
                </p>
                <p className={iconStyle}>
                    <icons.react size={30} color={colors.react} />
                </p>
                <p className={iconStyle}>
                    <Image alt="python" src={img.python} width={30} height={30} />
                </p>
                <p className={iconStyle}>
                    <icons.prisma size={30} color={"#fff"} />
                </p>
                <p className={iconStyle}>
                    <icons.postgresql size={30} color={colors.postgresql} />
                </p>
                <p className={iconStyle}>
                    <Image alt="java" src={img.java} width={30} height={30} />
                </p>
                <p className={iconStyle}>
                    <icons.openai size={30} color={"#fff"} />
                </p>
                <p className={iconStyle}>
                    <Image src={img.cpp} alt="C++" width={30} height={30} />
                </p>
            </div>
        </div>
    );
}