import "@/styles/cards/music.css";
import Link from "next/link";

export function MusicCard() {
    return (
        <section title="Music Card" className="h-16 cursor-pointer transition-all ease-linear duration-200 bg-gradient-to-tl from-indigo-400/10 via-black/10 to-black/20 backdrop-blur-lg border border-indigo-400/20 hover:border-indigo-400/40 rounded-lg w-32 flex items-center justify-center p-4 scale-[1.5] hover:scale-[1.45] relative">
            <Link href={"/music"} aria-label="Link to Music Page" className="w-full h-full flex items-center justify-center gap-6 relative">
                <h4 className="font-bold text-zinc-300">
                    music
                </h4>
                <div className="bars-container absolute right-0 opacity-75 hover:opacity-100 transition-opacity duration-200 hover:shadow-2xl">
                    <div className="bar-1"></div>
                    <div className="bar-2"></div>
                    <div className="bar-3"></div>
                    <div className="bar-4"></div>
                    <div className="bar-5"></div>
                    <div className="bar-6"></div>
                    <div className="bar-7"></div>
                </div>
            </Link>
            <p className="absolute bottom-0 right-0 text-[8px] text-zinc-400/90 mr-1 mb-1 select-none">
                @clxrity
            </p>
        </section>
    )
}