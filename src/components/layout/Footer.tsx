import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative bottom-0 left-0 px-2 py-2 bg-slate-800/75 w-full">
            <div className="flex flex-row text-[0.65rem] px-4 font-mono tracking-tight gap-10">
                <Link href="/terms-of-service" className="hover:underline underline-offset-4 transition duration-500 ease-out">Terms of Service</Link>
                <Link href="/terms-of-service#privacy-policy" className="hover:underline underline-offset-4 transition duration-500 ease-out">Privacy Policy</Link>
            </div>
        </footer>
    )
}