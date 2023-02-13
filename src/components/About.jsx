import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import laptopCode from '../assets/images/laptop-code.png';
import mjSmiling from '../assets/images/mj-smile.png';
import laptopDog from '../assets/images/laptop-dog.png';

const About = () => {
    return (
        <div id='about' className='w-full md:h-screen p-2 flex items-center py-16'>
            <div className='mx-w-[1240px] m-auto lg:grid grid-cols-3 gap-8 p-2'>
                <div className='col-span-2'>
                    <div>
                        <p className='uppercase text-xl tracking-widest text-[#4b9084]'>
                            About
                        </p>
                        <h2 className='py-4'>
                            Who Am I?
                        </h2>
                        <p className='text-gray-400 italic py-2'>
                            — I aspire to do the things that I enjoy
                        </p>
                        <p className='py-2 text-gray-300'>
                            I attended Augusta University in 2020 to pursue a degree in Social Work. In 2021, I transferred to the University of Georgia and switched my major to Computer Science. I am currently at Athens Technical college pursuing a degree as a Network Specialist.
                        </p>
                        <p className='py-2 text-gray-300'>
                            I started learning the basics of web development by launching simple static websites through GitHub Pages built with HTML and CSS.
                        </p>
                        <p className='py-2 text-gray-300'>
                            I started learning Python in 2021 and began developing simple Discord bots utilizing discord.py. Then, I started utilizing tools such as Flask to set up the backend of websites.
                        </p>
                        <p className='py-2 text-gray-300'>
                            I&#39;ve currently found myself interested in JavaScript frameworks such as React and Next.js to build appealing and interactive front end websites.
                        </p>
                        <p>
                            <Link href='/readme' className='py-3 text-[#4b9084] hover:cursor-pointer font-bold underline uppercase hover:text-[#65beb0] ease-out duration-150'>
                                Read more
                            </Link>
                        </p>
                    </div>
                </div>
                <div className='w-full sm:max-w-lg h-auto m-auto shadow-xl shadow-gray-600 rounded-xl flex items-center justify-center p-4 hover:scale-105 ease-in duration-300 lg:flex-row'>
                    <Image src={laptopDog} alt='laptop-dog' width={150} height={150}

                        className='rounded-xl p-2'
                    />
                    <Image src={mjSmiling} alt='mj-smiling' width={200} height={200}

                        className='rounded-xl p-2'
                    />
                    <Image src={laptopCode} alt='mj-smiling' width={140} height={200}

                        className='rounded-xl p-2'
                    />
                </div>
            </div>
        </div>
    );
};

export default About;