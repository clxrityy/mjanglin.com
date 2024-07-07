import { IoArrowBackCircleOutline } from "react-icons/io5";
import Link from "next/link";

export default function HomeIcon() {
    return <div className="relative">
        <Link href="/" className="cursor-pointer">
            <IoArrowBackCircleOutline className="w-14 h-14 rounded-full absolute top-0 left-0 px-2 py-2 hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 hover:text-blue-500" />
        </Link>
    </div>
}