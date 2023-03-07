import React from 'react';
import Image from 'next/image';
import universeGif from '../assets/universe.gif';
import Sparkle from 'react-sparkle';

const Universe = () => {
    return (
        <div className='w-full'>
            <div className='flex justify-center flex-row items-center space-x-3 max-w-[1000px] absolute'>
                <Image src={universeGif} alt='universe-theories' className='w-[100px] md:w-[250px]' />
                <Sparkle
                    count={10}
                    flickerSpeed={'slower'}
                    className='opacity-50'
                />
                <h3 className='text-lg md:text-xl lg:text-2xl opacity-80 animate-pulse'>
                    Theories about the universe fascinate me.
                </h3>
                <Sparkle
                    count={10}
                    flickerSpeed={'slower'}
                    className='opacity-50'
                />
            </div>
            <div>
                
            </div>
        </div>
    );
}

export default Universe;