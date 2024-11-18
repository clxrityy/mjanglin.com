import { GithubRepo } from "@birdgg/react-github";
import Image from "next/image";
import Link from "next/link";

export function SleepgraphHeader() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4">
            <h2>#5:{" "}
                <Link href={"https://sleepgraph.mjanglin.com"}>
                    sleepgraph.mjanglin.com
                </Link>
            </h2>
            <Image src={"https://i.gyazo.com/37c394c8aa8018be4bc7643e8c9c6d53.gif"} unoptimized alt="Sleepgraph" width={50} height={50} className="rounded-full w-16" />
        </div>
    )
}

export function SleepgraphAuthExampleImage() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-5">
            <Image src={"https://i.gyazo.com/f4b8f3e6478f866883fec5674a16ed5e.png"} alt="Sleepgraph Auth Example" width={250} height={250} className="rounded-md w-96" />
            <Image src={"https://i.gyazo.com/6c5113737b3660853ccf65fdb6ab9f79.png"} alt="Sleepgraph Auth Example" width={250} height={250} className="rounded-md w-96" />
        </div>
    )
}

export function SleepgraphDashboardImage() {
    return (
        <div className="flex flex-col 2xl:flex-row items-center justify-around w-full gap-5">
            <Image src={"https://i.gyazo.com/bb4debe0781b9a010b10ae0fd4414585.png"} alt="Sleepgraph Dashboard" width={500} height={500} className="rounded-md w-full" />
            <Image src={"https://i.gyazo.com/dd79bc4b2eb4934c9905b560027baa7a.gif"} unoptimized alt="Sleepgraph Dashboard" width={500} height={500} className="rounded-md w-1/2 mx-auto xl:h-1/6" />
        </div>
    )
}

export function SleepgraphGraphExample() {
    return (
        <div className="flex items-center justify-center w-full">
            <Image src={"https://i.gyazo.com/6d3896788440b18ad84cae3d3a39cd02.gif"} unoptimized alt="Sleepgraph Graph Example" width={500} height={500} className="rounded-md w-3/4" />
        </div>
    )
}
