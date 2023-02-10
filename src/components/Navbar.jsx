import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineClose, AiOutlineMail, AiOutlineMenu } from 'react-icons/ai';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Navbar = () => {

    const [nav, setNav] = useState(false);

    const [shadow, setShadow] = useState(false);

    const handleNav = () => {
        setNav(!nav)
    };

    useEffect(() => {
        const handleShadow = () => {
            if (window.scrollY >= 90) {
                setShadow(true)
            } else {
                setShadow(false)
            }
        }
        window.addEventListener('scroll', handleShadow);
    }, [])

    return (
        <div className={shadow ? 'fixed w-full h-20 shadow-xl z-[100]' : 'fixed w-full h-20 z-[100]'}>
            <div className='flex justify-between items-center w-full h-full px-2 2xl:px-16'>
                <Link href='/#home' scroll={false}>
                    <Image
                        src='/../public/assets/images/signature.png' alt='signature-ma'
                        width='200'
                        height='100'
                        className='cursor-pointer hover:scale-110 ease-in duration-500'
                    />
                </Link>
                <div>
                    <ul className='hidden md:flex'>
                        <Link href='/#home' scroll={false}>
                            <li className='ml-10 text-sm uppercase hover:border-b'>
                                Home
                            </li>
                        </Link>
                        <Link href='/#about' scroll={false}>
                            <li className='ml-10 text-sm uppercase hover:border-b'>
                                About
                            </li>
                        </Link>
                        <Link href='/#skills' scroll={false}>
                            <li className='ml-10 text-sm uppercase hover:border-b'>
                                Skills
                            </li>
                        </Link>
                        <Link href='/#projects' scroll={false}>
                            <li className='ml-10 text-sm uppercase hover:border-b'>
                                Projects
                            </li>
                        </Link>
                        <Link href='/#contact' scroll={false}>
                            <li className='ml-10 text-sm uppercase hover:border-b'>
                                Contact
                            </li>
                        </Link>
                    </ul>
                    <div className='md:hidden' onClick={handleNav}>
                        <AiOutlineMenu size={25} />
                    </div>
                </div>
            </div>

            <div className={
                nav
                    ? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70'
                    : ''}>
                <div className={
                    nav
                        ? 'fixed left-0 top-0 w-[75%%] sm:w-[60%] md:w-[45%] h-screen bg-[#7c7c7c] p-10 ease-in duration-500'

                        : 'fixed left-[-100%] top-0 ease-in p-10 duration-500'}>
                    <div>
                        <div className='flex w-full items-center justify-between'>
                            <Link href='/'>
                                <Image src='/../public/assets/images/clxrity.png' alt='mj-circle-gazing-off' width='87' height='34' />
                            </Link>
                            <div className='rounded-full shadow-lg shadow-gray-600 cursor-pointer p-3'
                                onClick={handleNav}
                            >
                                <AiOutlineClose />
                            </div>
                        </div>
                        <div className='border-b border-gray-800 my-4'>
                            <p className='text-gray-100 font-semibold w-[85%] md:w-[90%] py-4'>
                                Let&#39;s create something cool and have fun in the process.
                            </p>
                        </div>
                        <div className='py-4 flex flex-col'>
                            <ul className='uppercase'>
                                <Link href='/#home' scroll={false}>
                                    <li onClick={() => setNav(false)} className='py-4 text-sm'>
                                        Home
                                    </li>
                                </Link>
                                <Link href='/#about' scroll={false}>
                                    <li onClick={() => setNav(false)} className='py-4 text-sm'>
                                        About
                                    </li>
                                </Link>
                                <Link href='/#projects' scroll={false}>
                                    <li onClick={() => setNav(false)} className='py-4 text-sm'>
                                        Projects
                                    </li>
                                </Link>
                                <Link href='/#contact' scroll={false}>
                                    <li onClick={() => setNav(false)} className='py-4 text-sm'>
                                        Contact
                                    </li>
                                </Link>
                            </ul>
                            <div className='pt-40'>
                                <p className='uppercase tracking-widest font-extrabold pb-4 text-[#0f443b]'>
                                    Connect with me
                                </p>
                                <div className='flex items-center justify-between my-4 w-full sm:w-[80%]'>
                                    <div className='rounded-full shadow-lg shadow-gray-600 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                                        <FaTwitter

                                            color='#0f443b'
                                        />
                                    </div>
                                    <div className='rounded-full shadow-lg shadow-gray-600 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                                        <FaInstagram

                                            color='#0f443b'
                                        />
                                    </div>
                                    <div className='rounded-full shadow-lg shadow-gray-600 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                                        <FaGithub

                                            color='#0f443b'
                                        />
                                    </div>
                                    <div className='rounded-full shadow-lg shadow-gray-600 p-3 cursor-pointer hover:scale-105 ease-in duration-300'>
                                        <AiOutlineMail

                                            color='#0f443b'

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Navbar;