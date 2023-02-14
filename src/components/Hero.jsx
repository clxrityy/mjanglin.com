import React from 'react'
import { AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import Image from 'next/image';
import webDevGif from '../assets/images/web-dev.gif';

const Hero = () => {
    return (
        <div id='home' className='w-full h-screen text-center flex flex-row'>
            <div className='max-w-[1240px] w-full h-full max-auto p-2 flex justify-center items-center sm:p-28 mt-40 md:mt-0'>
                <div>
                    <p className='uppercase text-sm tracking-widest text-gray-300'>
                        LET&#39;S HAVE SOME FUN
                    </p>
                    <h1 className='py-4 text-gray-300'>
                        Hi, my name is  <span className='text-[#4b9084]'>
                            MJ
                        </span>
                    </h1>
                    <h2 className='py-2 text-gray-300
                    font-semibold'>
                        Front-End Web Developer
                    </h2>
                    <p className='py-4 text-gray-400 max-w-[70%] m-auto'>
                        I&#39;m an aspiring web & game developer while I pursue my degree as a Network Specialist. I am currently working on front-end design techniques and learning the ins and outs of back-end structuring.
                    </p>
                    <p className='py-4 text-gray-400 max-w-[70%] m-auto'>
                        In addition, I am drawn to research about quantum mechanics and artificial intelligence technologies.
                    </p>
                    <div className='flex items-center justify-between max-w-[330px] m-auto py-4'>
                        <div className='rounded-full shadow-md shadow-gray-600 p-6 cursor-pointer hover:scale-110 ease-in duration-300'>
                            <a href='https://twitter.com/yourclxrity' target='_blank' rel="noreferrer">
                                <FaTwitter />
                            </a>
                        </div>
                        <div className='rounded-full shadow-md shadow-gray-600 p-6 cursor-pointer hover:scale-110 ease-in duration-300'>
                            <a href='https://instagram.com/mjxnglin' target='_blank' rel='noreferrer'>
                                <FaInstagram />
                            </a>
                        </div>
                        <div className='rounded-full shadow-md shadow-gray-600 p-6 cursor-pointer hover:scale-110 ease-in duration-300'>
                            <a href='https://github.com/clxrityy' target='_blank' rel='noreferrer'>
                                <FaGithub />
                            </a>
                        </div>
                        <div className='rounded-full shadow-md shadow-gray-600 p-6 cursor-pointer hover:scale-110 ease-in duration-300'>
                            <a href='mailto:mj@mjanglin.com'>
                                <AiOutlineMail />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden 2xl:block max-w-[1240px] w-full h-full mt-28 p-2'>
                <div className='rounded-full opacity-80 max-w-fit'>
                    <Image src={webDevGif} alt='web development' className='opacity-90' />
                </div>
            </div>
        </div>
    );
};

export default Hero;