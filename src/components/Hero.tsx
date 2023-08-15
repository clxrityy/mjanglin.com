'use client';
import AnimatedTitle from "./AnimatedTitle";
import Loading from "./Loading";
import { Mesh } from "./Mesh";
import Navbar from "./Navbar";
import { Suspense } from "react";

const Hero = () => {
    return (
        <div className="h-[100vh] snap-center flex flex-col justify-between items-center">
            <Navbar />
            <div className="h-[100%] snap-center w-[100%] 2xl:w-[1400px] flex justify-center 2xl:justify-between flex-col lg:flex-row items-center p-2">

                {/* LEFT */}
                <div className="flex flex-1 xl:flex-[2] flex-col justify-center gap-[20px] p-4 hero-left">

                    <div className='text-center 2xl:text-left text-7xl'>
                        <AnimatedTitle text="MJ Anglin" className="" />
                    </div>

                    <div className="flex items-center gap[10px]">
                        <AnimatedTitle text="Web Developer" className="text-[rgb(72,145,116)] text-2xl" />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex-1 md:flex-[3] xl:flex-[2] relative w-[100%] lg:w-auto">
                    <Suspense fallback={<Loading />}>
                        <Mesh />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default Hero;