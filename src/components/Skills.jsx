import React from 'react';
import Image from 'next/image';


const Skills = () => {
    return (
        <div id='skills' className='w-full lg:h-screen p-2 sm:mt-4'>
            <div className='max-w-[1240px] mx-auto flex flex-col justify-center h-full'>
                <p className='text-xl tracking-widest uppercase text-[#4b9084]'>
                    Skills
                </p>
                <h2 className='py-4'>
                    What Can I Do?
                </h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>


                    <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-400'>
                        <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                            <div className='m-auto'>
                                <Image
                                    src='/../public/assets/skills/html.png'
                                    width='64'
                                    height='64'
                                    alt='HTML'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h3>
                                    HTML
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-400'>
                        <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                            <div className='m-auto'>
                                <Image
                                    src='/../public/assets/skills/javascript.png'
                                    width='64'
                                    height='64'
                                    alt='JavaScript'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h3>
                                    JavaScript
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-400'>
                        <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                            <div className='m-auto'>
                                <Image
                                    src='/../public/assets/skills/css.png'
                                    width='64'
                                    height='64'
                                    alt='CSS'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h3>
                                    CSS
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-400'>
                        <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                            <div className='m-auto'>
                                <Image
                                    src='/../public/assets/skills/react.png'
                                    width='64'
                                    height='64'
                                    alt='React'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h3>
                                    React
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-400'>
                        <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                            <div className='m-auto'>
                                <Image
                                    src='/../public/assets/skills/python.png'
                                    width='64'
                                    height='64'
                                    alt='Python'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h3>
                                    Python
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-400'>
                        <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                            <div className='m-auto'>
                                <Image
                                    src='/../public/assets/skills/java.png'
                                    width='64'
                                    height='64'
                                    alt='Java'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h3>
                                    Java
                                </h3>
                            </div>
                        </div>
                    </div>
                    
                    <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-400'>
                        <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                            <div className='m-auto'>
                                <Image
                                    src='/../public/assets/skills/typescript.png'
                                    width='64'
                                    height='64'
                                    alt='TypeScript'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h3>
                                    TypeScript
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-400'>
                        <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                            <div className='m-auto'>
                                <Image
                                    src='/../public/assets/skills/cpp.png'
                                    width='64'
                                    height='64'
                                    alt='C++'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h3>
                                    C++
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className='p-6 shadow-xl rounded-xl hover:scale-105 ease-in duration-400'>
                        <div className='grid grid-cols-2 gap-4 justify-center items-center'>
                            <div className='m-auto'>
                                <Image
                                    src='/../public/assets/skills/php.png'
                                    width='64'
                                    height='64'
                                    alt='php'
                                />
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <h3>
                                    PHP
                                </h3>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Skills;