import React from 'react';
import Image from 'next/image';
import aiSideGif from './images/ai-side-img.gif';
import gifOne from './images/gif1.gif';
import { HiLightBulb } from 'react-icons/hi';
import Internet from './components/Internet';
import internetGif from './images/internet.gif';
const ai = () => {
    return (
        <div className='w-full p-10'>
            <div className='w-full text-center space-y-4'>
                <h1 className='text-3xl lg:text-4xl uppercase tracking-widest text-[#4b9084]'>
                    Artificial Intelligence
                </h1>
                <h2 className='text-lg lg:text-2xl italic opacity-80'>
                    Human nature, the internet, and the dangers of A.I.
                </h2>
            </div>
            <div className='mt-10 flex flex-row justify-center items-center space-x-4 align-middle'>
                <div className='float-left text-center space-y-2 font-semibold shadow-lg shadow-black rounded-full p-9 text-xs md:text-sm opacity-90 hover:shadow-gray-600 ease-out animate-pulse hover:animate-none'>
                    <Image src={aiSideGif} alt='artificial-intelligence-animation' className='max-w-[100px] md:max-w-[200px] ml-2 hover:animate-bounce duration-1000 ease-out delay-100' />
                    <p className='text-[#4b9084] font-bold'>
                        MJ Anglin
                    </p>
                    <p className='text-[#4b9084] font-bold'>
                        February 16th, 2023
                    </p>
                </div>
                <div className='p-3 space-y-4 mt-10 md:mt-0 shadow-md shadow-black rounded-md max-w-[1000px]'>
                    <p className='text-sm md:text-base'>
                        With the growth of technology, artificial intelligence, and even talk of the new popular A.I. chat application <a className='text-[#4b9084] hover:font-bold ease-out cursor-pointer'>ChatGPT</a>, the same questions always arise within me.
                    </p>
                    <div className='space-y-8'>
                        <h3 className='rounded-full w-fit shadow-inner shadow-[#4b9084] p-4 md:p-2 tracking-wider text-lg md:text-xl italic hover:shadow-lg ease-out hover:not-italic'>
                            ❝Is A.I. dangerous?❞
                        </h3>
                        <h3 className='rounded-full w-fit shadow-inner shadow-[#4b9084] p-4 md:p-2 tracking-wider text-lg md:text-xl italic hover:shadow-lg ease-out hover:not-italic'>
                            ❝What all can it be capable of?❞
                        </h3>
                    </div>
                </div>
            </div>
            <div className='space-y-8 w-fit'>
                <div className='text-center mt-4 shadow-black rounded-md p-3 shadow-md'>
                    <p className='text-lg md:text-xl font-semibold'>
                        It’s important to understand the fundamentals of A.I. before I begin to question it’s intelligent nature.
                    </p>
                </div>
                <div className='flex flex-col lg:flex-row space-x-7'>
                    <div className='shadow-md shadow-black rounded-md p-3 max-w-[1000px] space-y-3'>
                        <div className='flex flex-col lg:flex-row'>
                            <p className='indent-10 text-sm md:text-base'>
                                The abbreviation “A.I.” stands for, as we know, <b>Artificial Intelligence</b>. There lies it’s definition in plain site. It is a software built in one way or another to replicate human intelligence. A common misconception thrown around about A.I. (often portrayed in movies as well), would be it’s ability to “think” on it’s own. Plenty of those who’ve worked extensively in machine learning and general A.I. technologies will argue that it isn’t dangerous. Which, inherently, I would agree with. A chat bot simply programmed to learn how to respond to you can’t possibly be capable of, say, spontaneously gaining a consciousness and deciding to take over the internet. It has it’s own neural network, yes, and it’s programmed to learn; but it has it’s limits. Maybe, after you exit the chat room (in this example, anyway), everything it learned about you goes into oblivion, as if it never even happened. The extents of it’s neural network and learning capabilities lie within how much information you feed it.
                            </p>
                            <Image src={gifOne} alt='artificial-intelligence-feeding-info' width={350} height={300} className='p-2 mt-2 lg:-mt-10' />
                        </div>
                        <div>
                            <p className='indent-10 text-sm md:text-base'>
                                I believe another misconception surrounding A.I. would be the idea that it doesn’t already make up a large percentage of how we perceive the world today. We use a GPS on our phone nowadays just to reach a destination. We use our phone to look up questions that we don’t already know the answer to. We click “like” and “follow” on topics that interest us through social media. We take pictures, videos, and document our thoughts all on our phone. All of these things circle back to artificial intelligent softwares that are programmed to do what we need and to filter out the things we don’t.
                            </p>
                        </div>
                    </div>
                    <div className='hidden lg:block shadow-md shadow-[#4b9084] rounded-md p-3 max-w-[250px] h-fit'>
                        <div className='flex flex-col space-y-5'>
                            <h4 className='uppercase flex flex-row justify-center items-center'>
                                A.I. FUN FACTS <HiLightBulb size={20} className='ml-2' />
                            </h4>
                            <ul className='list-disc space-y-4 list-inside text-sm'>
                                <li className='italic cursor-default'>
                                    &#34;Already approximately 77% of the devices that we use feature AI in one form or another.&#34;
                                    <p className='text-xs not-italic'>
                                        (<a href='https://creativestrategies.com/' className='text-[#4b9084]'>https://creativestrategies.com/</a>)
                                    </p>
                                </li>
                                <li className='italic cursor-default'>
                                    Google CEO <b>Sundar Pichai</b> claimed that artificial intelligence (AI) would be more transformative to humanity as a species than electricity and fire.
                                    <p className='text-xs not-italic'>
                                        (<a href='https://www.forbes.com/sites/bernardmarr/2021/09/24/the-7-biggest-artificial-intelligence-ai-trends-in-2022/?sh=514f839e2015' className='text-[#4b9084]'>https://forbes.com/</a>)
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='shadow-md shadow-white rounded-md p-3 max-w-[750px] space-y-3 mt-12'>
                    <Internet />
                </div>
                <div className='hidden lg:flex items-center justify-center ml-10'>
                    <Image src={internetGif} alt='internet' width={500} />
                </div>
            </div>
        </div>
    );
};

export default ai; 