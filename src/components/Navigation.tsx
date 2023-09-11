'use client';
import { useScreenSize } from "@/util/screenSize";
import Image from "next/image";
import Link from "next/link";
import { robotoMono } from "@/util/fonts";
import { FiMail } from 'react-icons/fi';


const Navigation = () => {

    const size = useScreenSize(150);

    return (
        <nav>
            <Link href='/'>
                <Image src='/signature.png' alt="signature" width={size} height={size} className="hover:scale-125 transition-all fixed top-0 left-0 mt-5 -ml-3" />
            </Link>
            <Link href='mailto:contact@mjanglin.com' className={`fixed top-0 right-0 px-4 py-6 opacity-80 hover:opacity-90 hover:text-[#61aeca] transition-all`}>
                <span className={`hover:underline underline-offset-4 ${robotoMono.className} font-semibold tracking-tighter flex flex-row space-x-1 justify-center items-center text-2xl lg:text-sm xl:text-base text-center`}>
                    <FiMail />
                    <span className="hidden lg:block">
                        contact@mjanglin.com
                    </span>
                </span>
            </Link>
        </nav>
    )
}

export default Navigation