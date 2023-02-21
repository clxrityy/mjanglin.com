import React from 'react';
import Typewriter from "typewriter-effect";

const Header = () => {
    return (
        <div id='articles-header'>
            <div className='w-full'>
                <div className='w-screen h-[30vh] lg:h-[40vh] relative'>
                    <div className='absolute top-0 left-0 w-full h-[30vh] lg:h-[40vh] bg-black/50 z-10' />
                    <div className='text-2xl md:text-3xl text-center flex justify-center pt-28 font-mono max-w-md md:max-w-screen-2xl'>
                        <Typewriter
                            onInit={(typewriter) => {

                                typewriter

                                    .typeString("I quite like writing...")
                                    .pauseFor(500)
                                    .deleteAll()
                                    .typeString("Here are some articles I've written.")
                                    .start();
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;