import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function HomeIcon() {
    return <div className="relative">
        <Link href="/" className="cursor-pointer">
            <FaHome className="w-14 h-14 rounded-full absolute top-0 left-0 px-2 py-2 hover:scale-110 transition focus:outline-none focus:ring-2 focus:ring-offset-1 text-blue-400" />
        </Link>
    </div>
}