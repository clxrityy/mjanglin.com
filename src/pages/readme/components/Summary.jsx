import React, { useState } from 'react';
import { GiPeanut } from 'react-icons/gi';
import headshot from '../assets/mjheadshot.png';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Summary = () => {

    const [rotate, setRotate] = useState(false);


    return (
        <div>
            <h1 className='uppercase tracking-wider text-3xl md:text-4xl flex'>
                In a nutshell
                <div className='ml-1 md:ml-3'>
                    <GiPeanut />
                </div>
            </h1>
            <div className='mt-5 flex space-x-3'>
                <motion.div
                    animate={{ scale: 1, rotate: rotate ? 360 : 0 }}
                    initial={{ scale: 0 }}
                    transition={{ type: "spring", duration: 1.5 }}
                    onClick={() => {
                        setRotate(!rotate);
                    }}
                >
                    <Image src={headshot} alt='MJ face' className='w-[150px] md:w-[275px]' />
                </motion.div>
                <div className='flex justify-center items-center max-w-[700px]'>
                    <p className='text-base md:text-lg'>
                        My name is Marilyn James, but I go by MJ. I&rsquo;m 21 years old.
                        <br />
                        Apart from my career and interest in technology, in my free time I love to make music.
                        <br />
                        I also love writing in general. Coding, song-writing, stories, etc.
                    </p>
                </div>
            </div>
            <div className='max-w-[900px] text-base md:text-lg xl:text-xl mt-6'>
                <p>
                    I seek any opportunity I can get to express and branch out my knowledge and creativity.
                </p>
                <div className='divide-y-5 mt-14'>
                    <hr />
                    <div />
                </div>
            </div>
        </div>
    );
}

export default Summary;