import Image from "next/image";
import Link from "next/link";
import { HiMusicNote } from 'react-icons/hi';


const listClass = 'cursor-pointer uppercase tracking-wide hover:tracking-widest duration-600 ease-out hover:underline underline-offset-[7px] transition-all';


const Navbar = () => {
    return (
        <div className="flex justify-center w-[100%]">
            <div className="w-[100%] 2xl:w-[1400px] flex justify-between items-center py-10 px-10 xl:px-0">
                <div className="flex items-center gap-[50px]">
                    <Link href='https://www.mjanglin.com'>
                        <Image src='/images/signature.png' width={100} height={100} className="h-[50px] w-[200px] hover:scale-125 cursor-pointer transition-all ease-out duration-300 -m-5" alt="logo/signature" />
                    </Link>
                    {/* <div className="hidden lg:flex gap-[20px] list-none">
                        <li className={listClass}>
                            Home
                        </li>
                        <li className={listClass}>
                            About
                        </li>
                        <li className={listClass}>
                            Skills
                        </li>
                        <li className={listClass}>
                            Projects
                        </li>
                        <li className={listClass}>
                            Contact
                        </li>
                    </div> */}
                </div>
                <div className="flex items-center">
                    <Link href='https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV'>
                        <HiMusicNote className="w-[25px] h-[25px] cursor-pointer text-[rgb(72,145,116)] hover:scale-125 hover:text-[#eee] transition-all duration-300 ease-linear" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar;