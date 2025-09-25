import { ICONS } from "@/config";
import Link from "next/link";


const {
    spotify: Spotify,
    soundcloud: Soundcloud,
    applemusic: AppleMusic,
    youtubemusic: YouTubeMusic,
} = ICONS;

export default function Page() {
    return (
        <div className="music-page">
            <div className="wrapper-outer" />
            <div className="wrapper" />
            <section className="relative z-10 p-4 md:p-8 lg:p-16 flex flex-col items-center justify-center w-full gap-10 mt-40">
                <header className="text-start pl-5 border-l-4 border-white/25 mb-8 px-3 py-4 rounded-lg bg-gradient-to-l from-white/5 to-gray-300/10 backdrop-blur-sm">
                    <h1 className="text-4xl font-bold mb-8">Music by MJ Anglin</h1>
                    <p>
                        (clxrity)
                    </p>
                </header>
                <ul className="flex flex-row items-center gap-8 list-none text-5xl h-full">
                    <li>
                        <Link href={"/spotify"} title="Spotify" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all duration-150 hover:text-[#1DB954] hover:drop-shadow-[0_0_4px_rgba(0,0,0,0.4)] focus:invert-[25%]">
                            <Spotify />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/soundcloud"} title="Soundcloud" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all duration-150 hover:text-[#FF5500] hover:drop-shadow-[0_0_4px_rgba(0,0,0,0.4)] focus:invert-[25%]">
                            <Soundcloud />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/apple-music"} title="Apple Music" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all duration-150 hover:text-[rgb(232,81,96)] hover:drop-shadow-[0_0_4px_rgba(0,0,0,0.4)] focus:invert-[25%]">
                            <AppleMusic />
                        </Link>
                    </li>
                    <li>
                        <a title="YouTube Music" target="_blank" rel="noopener noreferrer" href={"https://music.youtube.com/channel/UCiJp6-CaIM46vit02HL_AGw"} className="hover:scale-125 transition-all duration-150 hover:text-[#FF0000] hover:drop-shadow-[0_0_4px_rgba(0,0,0,0.4)] focus:invert-[25%]">
                            <YouTubeMusic />
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}