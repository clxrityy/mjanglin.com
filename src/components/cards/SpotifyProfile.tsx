import "@/styles/css/spotify.css";
import { exo } from "@/styles/fonts";
import { Artist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import Link from "next/link";
import { URLS } from "@/config";
import { COMPONENT_SIZES } from "@/utils/constants";

export function SpotifyProfile({ data }: Readonly<{ data: Artist }>) {

    return (
        <div className={`spotify-card ${exo.className} my-4 mb-14`}>
            <div className="spotify-card__content px-5 py-4">
                <div className="flex flex-col items-center justify-center gap-8 w-full">
                    <div className="flex flex-col md:flex-row gap-2 justify-stretch items-center w-full">
                        <Image
                            src={data.images[0].url}
                            alt={data.name}
                            width={COMPONENT_SIZES.SPOTIFY_PROFILE_ICON.width}
                            height={COMPONENT_SIZES.SPOTIFY_PROFILE_ICON.height}
                            className="rounded-full"
                        />
                        <h4 className="font-extrabold text-lg xl:text-xl 2xl:text-2xl">
                            clxrity
                        </h4>
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-center">
                        <Link href={data.external_urls.spotify} className="link-button" aria-label="Listen on Spotify">
                            <Image
                                src={"/assets/spotify.svg"}
                                alt="Spotify"
                                width={COMPONENT_SIZES.SOCIAL_ICON.width}
                                height={COMPONENT_SIZES.SOCIAL_ICON.height}
                                className="w-10 h-10"
                            />
                        </Link>
                        <Link href={URLS.apple_music} aria-label="Listen on Apple Music" className="link-button">
                            <Image
                                src={"/assets/apple-music.svg"}
                                alt="Apple Music"
                                width={COMPONENT_SIZES.SOCIAL_ICON.width}
                                height={COMPONENT_SIZES.SOCIAL_ICON.height}
                                className="w-10 h-10"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}