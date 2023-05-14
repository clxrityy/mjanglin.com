'use client';

import Link from "next/link";
import { useState } from "react";
import { RiGithubFill, RiInstagramFill, RiLinkedinFill, RiSoundcloudFill, RiSpotifyFill, RiTwitterFill } from 'react-icons/ri';


const Socials = () => {

    const [isClicked, setIsClicked] = useState(false);

    const iconClass = `text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl hover:scale-125 transition duration-300 ease-linear ${isClicked && 'text-[#fff]'} cursor-pointer text-[rgb(72,145,116)] hover:text-white`;

    return <div className="h-screen snap-center flex justify-center">
        <div className="h-screen snap-center w-[100%] flex justify-center items-center">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-items-stretch gap-40 items-center">
                <Link href='https://www.instagram.com/mjxnglin/'>
                    <RiInstagramFill className={iconClass} onClick={() => setIsClicked(!isClicked)} />
                </Link>
                <Link href='https://wwww.twitter.com/yourclxrity/'>
                    <RiTwitterFill className={iconClass} onClick={() => setIsClicked(!isClicked)} />
                </Link>
                <Link href='https://www.linkedin.com/in/mj-anglin-264473267/'>
                    <RiLinkedinFill className={iconClass} onClick={() => setIsClicked(!isClicked)} />
                </Link>
                <Link href='https://soundcloud.com/clxrityy'>
                    <RiSoundcloudFill className={iconClass} onClick={() => setIsClicked(!isClicked)} />
                </Link>
                <Link href='https://github.com/clxrityy'>
                    <RiGithubFill className={iconClass} onClick={() => setIsClicked(!isClicked)} />
                </Link>
                <Link href='https://open.spotify.com/user/mjanglin'>
                    <RiSpotifyFill className={iconClass} onClick={() => setIsClicked(!isClicked)} />
                </Link>
            </div>
        </div> 
    </div>
}

export default Socials;