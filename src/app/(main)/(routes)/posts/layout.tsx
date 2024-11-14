import "@/styles/post.css";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-screen min-h-fit z-50 mx-auto">
            <Link href="/" className="absolute top-0 px-3 py-4">
                <MdArrowBack size={35} />
            </Link>
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 py-20">
                {children}
            </div>
        </div>
    )
}