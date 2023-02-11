import React from 'react';
import contactImg from '/public/assets/images/contact.png';
import Image from 'next/image';
import { AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import Link from 'next/link';
import SnakePreview from './SnakePreview';

const Contact = () => {
    return (
        <div id='connect' className='w-full lg:h-screen'>
            <div className='max-w-[1240px] m-auto px-2 py-16 w-full'>
                <p className='text-xl tracking-widest uppercase text-[#4b9084]'>
                    Contact
                </p>
                <h2 className='py-4'>
                    Reach Out
                </h2>
                <div className='grid lg:grid-cols-5 gap-8'>

                    {/* left */}

                    <div className='col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-500 rounded-xl p-4'>
                        <div className='lg:p-4 h-full'>
                            <div>
                                <Image src={contactImg} alt='Connect'

                                    className='rounded-xl hover:scale-105 ease-in-out duration-[10s] animate-pulse opacity-60 hover:opacity-100'
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <div>
                                <h2 className='py-2'>
                                    MJ Anglin
                                </h2>
                                <p>
                                    Web Developer
                                </p>
                                <p className='py-4'>
                                    Reach out - see if I can be useful for your project.
                                </p>
                            </div>
                            <div>
                                <p className='uppercase pt-8'>
                                    Connect With Me
                                </p>
                                <div className='flex items-center justify-between py-4'>
                                    <div className='rounded-full shadow-md shadow-gray-600 p-6 cursor-pointer hover:scale-110 ease-in duration-300'>
                                        <FaTwitter />
                                    </div>
                                    <div className='rounded-full shadow-md shadow-gray-600 p-6 cursor-pointer hover:scale-110 ease-in duration-300'>
                                        <FaInstagram />
                                    </div>
                                    <div className='rounded-full shadow-md shadow-gray-600 p-6 cursor-pointer hover:scale-110 ease-in duration-300'>
                                        <FaGithub />
                                    </div>
                                    <div className='rounded-full shadow-md shadow-gray-600 p-6 cursor-pointer hover:scale-110 ease-in duration-300'>
                                        <AiOutlineMail />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* right */}

                    <div className='col-span-3 w-full h-auto shadow-xl shadow-gray-500 rounded-xl lg:p-4'>
                        <div className='p-4'>

                            <SnakePreview />
                            
                        </div>
                    </div>
                </div>

                

            </div>
        </div>
    );
};

export default Contact;