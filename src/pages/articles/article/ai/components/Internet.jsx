import React from 'react';
import { ImConnection } from 'react-icons/im';
import networkGif from '../images/network.gif';
import Image from 'next/image';

const Internet = () => {
    return (
        <div className='space-y-4'>
            <div className='flex flex-row items-center space-x-3 justify-center'>
                <h2 className='uppercase tracking-widest text-[#4b9084]'>
                    The Internet 
                </h2>
                <ImConnection size={30} color='#4b9084' />
            </div>
            <div className='space-y-4 h-auto'>
                <p className='indent-10 text-sm md:text-base'>
                    When mentioning A.I., and particularly specific applications such as chat bots and whatnot that rely on the internet to source the information it feeds back to you, it only makes sense to consider the functionality of the internet in general.
                </p>
                <p className='indent-10 text-sm md:text-base'>
                    I won’t bore you with unnecessary details to explain how the internet works. I’d probably do a bad job at it if I tried. Instead, I’ll speak metaphorically and with analogies (as I do best). For an excellent article on how the internet works, check out: <a className='text-[#4b9084]' href='https://www.cloudflare.com/learning/network-layer/how-does-the-internet-work/#:~:text=Computers%20connect%20to%20each%20other%20and%20to%20the%20Internet%20via,interpreted%20by%20the%20receiving%20computer.'>How does the Internet work?</a> by <b>Cloudflare</b>, which I will be referencing throughout.
                </p>
                <hr />
                <div className='mt-5 space-y-4'>
                    <p className='indent-10 text-sm md:text-base'>
                        Consider the universe as a whole. Within the universe there are billions of galaxies, and within those there are planets and stars that all have their own relative “galaxies” within them (functionality wise). Think smaller now. Think about the Earth. The Earth is it’s own network. This network contains numerous devices and smaller networks working around and with one another to complete different and specific tasks, but all for the same network. A separate network, if you will, could be our solar system. The same concept applies. While, the Earth is it’s own network, it’s apart of a larger network, which is apart of a larger one, and so on. You get what I’m saying, right? The universe in this example would be the internet. 
                    </p>
                    <h3 className='indent-10 text-md md:text-lg lg:text-xl'>
                        There is no “control center” for the internet. It works depending on how the devices and networks within it behave. It is not dependent on any or one device and/or network.
                    </h3>
                </div>
                <div className='flex justify-center items-center mt-10'>
                    <Image src={networkGif} alt='network' className='max-w-[250px] md:max-w-[500px]' />
                </div>
            </div>
        </div>
    );
};

export default Internet