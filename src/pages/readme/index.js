import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import banner from './assets/aboutbanner.jpg';
import Main from './components/Main';


const readme = () => {
    return (
        <div className='w-full'>
            <Head>
                <title>
                    MJ Anglin | About Me
                </title>
            </Head>
            <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
                <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-[#000]/80 z-10' />
                <Image src={banner} alt='music' className='absolute z-1' style={{ objectFit: 'cover' }} fill />
                <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2 sm:text-center'>
                    <div className='space-y-4'>
                        <h1 className='text-2xl lg:text-6xl'>
                            About Me
                        </h1>
                        <h2 className='text-xl lg:text-4xl text-[#4b9084]'>
                            MJ Anglin
                        </h2>
                    </div>
                </div>
            </div>
            <div className='max-w-[1240px] mx-auto p-2 pt-8 flex'>
                <Main />
            </div>
        </div>
    );
};

export default readme;