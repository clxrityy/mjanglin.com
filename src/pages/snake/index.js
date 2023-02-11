import React from 'react';
import snakeBg from './assets/snake-bg.png';
import Image from 'next/image';
import { GiSandSnake } from 'react-icons/gi';

const snake = () => {
    return (
        <div className='w-full'>
            <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
                <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/70 z-10' />
                <Image src={snakeBg} alt='music' className='absolute z-1' style={{ objectFit: 'cover' }} fill />
                <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2 sm:text-center'>
                    <div className='flex flex-row max-w-[1240px] space-x-2 hover:blur-sm ease-out duration-300'>
                        <h1 className='uppercase opacity-90 tracking-widest'>
                            Snake
                        </h1>
                        <h1>
                            <GiSandSnake />
                        </h1>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
            <div className='max-w-[1240px] mx-auto p-2 grid md:grid-cols-5 gap-8 pt-8'>
                
            </div>
        </div>
    )
}

export default snake;