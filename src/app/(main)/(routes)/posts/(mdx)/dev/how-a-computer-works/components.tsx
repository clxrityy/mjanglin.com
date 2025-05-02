import Image from "next/image";
import Link from "next/link";

export function Outline() {
    return (
        <ul className="flex flex-col gap-4 items-center justify-center">
            <li>
                <Link href="#cpu" className="link">
                    CPU
                </Link>
            </li>
            <li>
                <Link href="#binary" className="link">
                    Binary
                </Link>
            </li>
        </ul>
    )
}

export function Title() {
    return (
        <h1 className="flex flex-col xl:flex-row gap-5 items-center justify-center">
            How a computer works at it's core
            <Image src={"/assets/desktop.webp"} alt="How a computer works" width={250} height={250} unoptimized className="saturate-0" />
        </h1>
    )
}

export function CPUHeading() {
    return (
        <h2 id="cpu" className="flex flex-row gap-4 items-center justify-center">
            CPU
            <Image src={"/assets/cpu.png"} alt="CPU" width={50} height={50} unoptimized className="saturate-0" />
        </h2>
    )
}

export function BinaryHeading() {
    return (
        <h3 id="binary">
            Binary
        </h3>
    )
}

export function Transistor() {
    return (
        <div className="flex flex-col gap-4 items-center justify-center">
            <Image src={"/assets/transistor.png"} alt="Transistor" width={75} height={75} unoptimized />
            <blockquote>
                <p className="text-sm">A transistor is a semiconductor device used to amplify or switch electronic signals and electrical power.</p>
            </blockquote>
        </div>
    )
}

export function Hexidecimal() {
    return (
        <Image src={"/assets/hexidecimal.png"} alt="Hexidecimal" width={250} height={250} unoptimized className="saturate-0 flex w-full items-center justify-center" />
    )
}