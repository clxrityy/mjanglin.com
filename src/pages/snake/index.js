import React from 'react';
import snakeBg from './assets/snake-bg.png';
import Image from 'next/image';
import { GiSandSnake } from 'react-icons/gi';
import Game from './game/Game';
import keys from './assets/keys.png';
import { MdPhoneIphone } from 'react-icons/md';

const snake = () => {
    return (
        <div className='w-full'>
            <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
                <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/70 z-10' />
                <Image src={snakeBg} alt='music' className='absolute z-1' style={{ objectFit: 'cover' }} fill />
                <div className='absolute top-[70%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2 sm:text-center'>
                    <div className='flex flex-row max-w-[1240px] space-x-2 xl:text-lg'>
                        <h1 className='uppercase opacity-90 tracking-widest hover:blur-sm ease-out duration-300'>
                            Snake
                        </h1>
                        <h1>
                            <GiSandSnake />
                        </h1>
                        <div className='absolute bottom-0 right-0 hidden lg:flex -mb-4 flex-row'>
                            <Image src={keys} alt='keys' width={200} height={100} className='opacity-80 animate-pulse' />
                            <p className='text-sm mt-20 max-w-[200px] text-center'>
                                Click on the game board and use the designated keys to move.
                            </p>
                        </div>
                    </div>
                    <div className='flex py-2'>
                        <p className='text-sm lg:hidden'>
                            This game only works on the computer.
                        </p>
                    </div>
                </div>
            </div>
            <div className='max-w-[1240px] mx-auto p-2 gap-8 pt-8 hidden md:block'>
                <Game />
            </div>
            <div className='max-w-[1240px] mx-auto p-2 gap-8 pt-8 block md:hidden place-content-center'>
                <MdPhoneIphone size={250} className='animate-pulse'
                color='#db7171'
                />
                <h1 className='mt-8 text-xl'>
                    It seems like you&#39;re on a mobile device. This game only works with a keyboard.
                </h1>
            </div>
        </div>
    )
}

export default snake;