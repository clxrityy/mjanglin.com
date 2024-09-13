import Link from "next/link";
import configurations from "@/config";

const { icons, urls } = configurations;

export default async function Sidebar() {
    return (
        <div className="w-screen fixed left-0 px-2 py-2 z-10">
            <div className="flex flex-col items-end justify-center gap-4 bg-zinc-950/80 w-fit px-2 py-2 rounded-md">
                <Link href={urls.github} className="hover:scale-110 transition-all ease-out z-10 text-cyan-600 hover:text-pink-500">
                    <icons.github size={24} />
                </Link>
                <Link href={urls.instagram} className="hover:scale-110 transition-all ease-out z-10 text-cyan-600 hover:text-pink-500">
                    <icons.instagram size={24} />
                </Link>
                <Link href={urls.spotify} className="hover:scale-110 transition-all ease-out z-10 text-cyan-600 hover:text-pink-500">
                    <icons.spotify size={24} />
                </Link>
                <Link href={urls.soundcloud} className="hover:scale-110 transition-all ease-out z-10 text-cyan-600 hover:text-pink-500">
                    <icons.soundcloud size={24} />
                </Link>
                <Link href={urls.linkedin} className="hover:scale-110 transition-all ease-out z-10 text-cyan-600 hover:text-pink-500">
                    <icons.linkedin size={24} />
                </Link>
                <Link href={urls.discord} className="hover:scale-110 transition-all ease-out z-10 text-cyan-600 hover:text-pink-500">
                    <icons.discord size={24} />
                </Link>
            </div>
        </div>
    )
}