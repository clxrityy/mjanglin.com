import Image from "next/image";
import Link from "next/link";

export function Title() {
    return (
        <h1 className="flex flex-col gap-2 items-center justify-center">
            Host a free Minecraft server (Java)
            <Image src={"https://i.gyazo.com/35bc2ea5d62e68ebfdb8a77ac92da660.webp"} alt="Free Minecraft Java server" width={250} height={250} unoptimized />
        </h1>
    )
}

export function DockerHeading() {
    return (
        <h2 id="docker">
            <Link href="#docker">
                Set up Docker
            </Link>
        </h2>
    )
}

export function RunServerHeading() {
    return (
        <h2 id="run-server">
            <Link href="#run-server">
                Run the server
            </Link>
        </h2>
    )
}