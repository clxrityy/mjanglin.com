import Image from "next/image";
import { GithubRepo } from "@birdgg/react-github";

export function Title() {
    return (
        <div className="flex flex-col gap-2 items-center justify-center w-full">
            <h1>
                Displaying and downloaading audio files with React & Next.js
            </h1>
            <Image src={"https://clxrity.xyz/apple-touch-icon.png"} alt="clxrity logo" width={50} height={50} />
        </div>
    )
}

export function Example() {
    return (
        <div className="flex w-full items-center justify-center">
            <video autoPlay loop muted playsInline className="w-2/3 lg:w-1/3"> 
            <source src="/assets/waveform-example.webm" type="video/webm" />
            <source src="/assets/waveform-example.mp4" type="video/mp4" />
        </video>
        </div>
    )
}

function AnalyserNodeImg() {

    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-fit bg-white/90 hover:scale-125 transition-all duration-300 ease-in-out rounded-lg hover:bg-white">
            <Image src={"https://i.gyazo.com/74b92d3122d9686b2ce0704c092a359c.png"} alt="AnalyserNode" width={500} height={500} className="w-fit sm:w-96" />
            </div>
        </div>
    )
}

function AudioContextImg() {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-fit bg-white/90 hover:scale-125 transition-all duration-300 ease-in-out rounded-lg hover:bg-white">
            <Image src={"https://i.gyazo.com/9e1ae8ccb12a32ef447f4fed47ab45f0.png"} alt="AnalyserNode" width={500} height={500} className="w-fit sm:w-96" />
            </div>
        </div>
    )
}

export function WebAudioAPIImgs() {
    return (
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-center w-full">
            <AudioContextImg />
            <AnalyserNodeImg />
        </div>
    )
}

export function ReactAudioRepo() {
    return (
        <div className="hover:scale-105 cursor-pointer rounded-lg hover:drop-shadow-2xl transition-all w-full flex items-center justify-center">
            <GithubRepo repo="clxrityy/react-audio" />
        </div>
    )
}

