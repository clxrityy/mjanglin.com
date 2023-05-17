import Link from "next/link";
import { FiCoffee } from 'react-icons/fi';


const Contact = () => {
    return <div className="h-screen snap-center flex justify-center">
        <div className="h-screen snap-center w-[100%] flex justify-center items-center">
            <div className="flex w-full items-center justify-center text-center flex-col space-y-10 h-full">
                <h1 className="text-center text-3xl lg:text-4xl animate-pulse hover:underline underline-offset-6 hover:animate-none duration-300 transition text-[rgb(72,145,116)] hover:text-white font-bold delay-100">
                    <Link href='mailto:contact@mjanglin.com'>
                        contact@mjanglin.com
                    </Link>
                </h1>
                <div className="p-5 animate-bounce hover:animate-none duration-300 transition ease-linear cursor-pointer shadow-md shadow-gray-400/10 rounded-full bg-transparent hover:shadow-gray-400/50 hover:shadow-lg">
                    <Link href='https://paypal.me/clxrityxyz?country.x=US&locale.x=en_US' className="space-x-2 flex justify-center items-center">
                        <FiCoffee className="text-4xl" />
                        <p className="font-semibold">
                            Buy me coffee
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    </div>
}

export default Contact;