import React from 'react';

const Main = () => {
    return (
        <div id='articles' className='flex flex-col md:flex-row shadow-xl p-5 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl'>
            <div className='space-y-8'>
                <h1 className='text-xl md:text-2xl uppercase tracking-widest underline-offset-8 underline text-[#4b9084]'>
                    Articles by MJ Anglin
                </h1>
                <div className='text-sm md:text-base max-w-[420px] tracking-wide space-y-4'>
                    <p>
                        If you begin reading, you will realize I have a specific style of writing. I&#39;d like to think all writers do, really. However, I&#39;m just prefacing with...
                    </p>
                    <p className='text-base md:text-lg font-semibold tracking-wider'>
                        I&#39;m not a scholarly writer, I&#39;m just a writer.
                    </p>
                    <p>
                        I write these <span className='italic tracking-wider'>&#34;articles&#34;</span> as an approach to learning about new things that interest me, and to have fun designing a page around it.
                    </p>
                    <ul className='p-2 space-y-2 list-disc text-xs md:text-sm'>
                        <li>
                            The topic may vary.
                        </li>
                        <li>
                            I have an overarching theme in most of them.
                        </li>
                        <li>
                            I always cite other authors I reference as sources.
                        </li>
                        <li className='italic'>
                            This is purely for my enjoyment.
                        </li>
                    </ul>
                </div>
            </div>
            <div className='space-y-8'>

            </div>
        </div>
    )
};

export default Main;