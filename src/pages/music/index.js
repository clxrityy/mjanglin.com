import Image from 'next/image';
import React from 'react';
import Equipment from './components/Equipment';
import SoundCloudIcon from './components/SoundCloudIcon';
import musicBg from './assets/music-bg.jpg';
import SpotifyIcon from './components/SpotifyIcon';
import Head from 'next/head';

const music = () => {
    return (
        <div className='w-full'>
            <Head>
                <title>
                    MJ Anglin | Music
                </title>
            </Head>
            <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
                <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/80 z-10' />
                <Image src={musicBg} alt='music' className='absolute z-1' style={{ objectFit: 'cover' }} fill />
                <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2 sm:text-center'>
                    <h2 className='py-2 text-lg uppercase sm:text-3xl xl:tracking-wider'>
                        Producer <span className='opacity-80 shadow-md text-slate-100 font-serif'>/</span> Singer <span className='opacity-80 shadow-md text-slate-100 font-serif'>/</span> Songwriter
                    </h2>
                    <h3 className='sm:text-2xl xl:p-5 shadow-sm'>
                        cl
                        <span className='animate-spin w-6 h-6 duration-400 font-black opacity-95 shadow-lg text-[#ffffffd0] p-[1px] font-mono'>
                            x
                        </span>
                        rity
                    </h3>
                    <div className='sm:absolute xl:absolute right-15 bottom-0 lg:right-50 p-5 2xl:right-10 xl:right-40'>
                        <div className='grid grid-cols-2 right-0 space-x-4'>
                            <SoundCloudIcon />
                            <SpotifyIcon />
                        </div>
                    </div>
                </div>
            </div>


            <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
                <div className='col-span-4'>
                    <p className='uppercase tracking-widest py-4 text-[#4b9084]'>
                        Music
                    </p>
                    <h2 className='py-2'>Recording Equipment</h2>
                    <div className='rounded-xl max-w-[1240px]w-auto shadow-gray-600 p-4 mt-4'>
                        <div>
                            <Equipment />
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    );
};

export default music;