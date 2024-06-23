import Link from "next/link";

export default function Footer() {
    return (
        <footer className="absolute bottom-0 left-0 px-2 py-2 bg-slate-800/75 w-full z-0">
            <div className="flex flex-row-reverse text-[0.65rem] px-4 font-mono tracking-tight gap-4 justify-between w-full">
                <div className="flex flex-row gap-5 items-center">
                    <Link href="/terms-of-service" className="hover:underline underline-offset-4 transition duration-500 ease-out">Terms of Service</Link>
                    <hr className="border-[0.025rem] h-4" />
                    <Link href="/terms-of-service#privacy-policy" className="hover:underline underline-offset-4 transition duration-500 ease-out">Privacy Policy</Link>
                </div>
                <p className="text-[0.7rem] font-bold">
                    © 2024 hbd
                </p>
            </div>
        </footer>
    )
}