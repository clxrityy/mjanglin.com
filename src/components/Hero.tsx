import Dropdown from "./Dropdown";
import { RiJavascriptFill } from 'react-icons/ri';
import { BiLogoTypescript, BiLogoMongodb, BiCodeAlt, BiLogoGoLang } from 'react-icons/bi';
import { TbBrandNextjs } from 'react-icons/tb';
import { FaReact } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import { PiMusicNotesFill } from 'react-icons/pi';
import Image from "next/image";
import Socials from "./Socials";
import Donut from "./Donut";
import Link from "next/link";



const Hero = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex">
                <div className="flex flex-col space-y-4 justify-center items-center">
                    <div className="flex flex-col space-y-10 justify-center items-center">
                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold shadow-inner text-shadow">
                            MJ Anglin
                        </h1>
                        <ul className='text-lg lg:text-xl font-semibold flex flex-col text-center space-y-6'>

                            <li className="space-y-3 flex items-center justify-center flex-col">
                                <h2 className="heading">
                                    <BiCodeAlt className="icon" />
                                    <span>
                                        Developer
                                    </span>
                                </h2>
                                <Dropdown prompt="Frameworks / tools">
                                    <div className="grid grid-cols-5 grid-rows-2 items-center gap-x-1 gap-y-6 justify-between">
                                        <RiJavascriptFill className='text-[#f7df1e] developer-icon' />
                                        <BiLogoTypescript className="text-[#007acc] developer-icon" />
                                        <TbBrandNextjs className="text-[#f4f5f7] developer-icon" />
                                        <FaReact className="text-[#61DBFB] developer-icon" />
                                        <Image src='/python.png' alt="python" className="developer-icon" width={27.5} height={27.5} />
                                        <BiLogoMongodb className="developer-icon text-[#4DB33D]" />
                                        <SiTailwindcss className="developer-icon text-[#00b4b6]" />
                                        <Image src='/firebase.png' alt="firebase" className="developer-icon" width={27.55} height={27.5} />
                                        <Image src='/java.png' alt="java" className="developer-icon" width={27.5} height={27.5} />
                                        <BiLogoGoLang className="developer-icon text-[#00ADD8]" />
                                    </div>
                                </Dropdown>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Donut />
                    </div>

                    <div className="space-y-10">
                        <div className="grid grid-flow-row gap-10 justify-center items-center">
                            <div className="flex justify-center items-center">
                                <Socials />
                            </div>
                        </div>
                        <div className="space-y-3 flex items-center justify-center flex-col">

                            <Dropdown prompt="Music resources">
                                <ul className="text-xs lg:text-sm tracking-wider flex items-center justify-evenly space-y-4 flex-col uppercase">
                                    <li>
                                        <Link href='https://clxrity.xyz' className="music-link">
                                            clxrity.xyz
                                        </Link>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Hero;