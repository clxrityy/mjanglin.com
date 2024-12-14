import "@/styles/css/spotify.css";
import { exo } from "@/styles/fonts";
import { Artist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import Link from "next/link";
import { URLS } from "@/config";

export function SpotifyProfile({ data }: { data: Artist }) {
    return (
        <div className={`spotify-card ${exo.className}`}>
            <div className="spotify-card__content w-full">
                <div className="flex flex-col items-center justify-center gap-8 w-full">
                    <div className="flex flex-row gap-2 justify-stretch items-center w-full">
                        <Image src={data.images[0].url} alt={data.name} width={32} height={32} className="rounded-full" />
                        <h4 className="font-extrabold text-lg xl:text-xl 2xl:text-2xl">
                            clxrity
                        </h4>
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <Link href={data.external_urls.spotify} className="link-button" aria-label="Listen on Spotify">
                            <Image src={"/assets/spotify.svg"} alt="Spotify" width={40} height={40} className="w-10 h-10" />
                        </Link>
                        <Link href={URLS.apple_music} aria-label="Listen on Apple Music" className="link-button">
                            <Image src={"/assets/apple-music.svg"} alt="Apple Music" width={40} height={40} className="w-10 h-10" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}