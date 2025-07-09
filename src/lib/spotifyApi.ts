import { SpotifyApi, type Artist, type Album } from "@spotify/web-api-ts-sdk";
import { CONSTANTS } from "@/utils/constants";
import { cache } from "react";
import { performanceMonitor } from "@/utils/performance";

const SPOTIFY_API = SpotifyApi.withClientCredentials(process.env.SPOTIFY_API_CLIENT_ID!, process.env.SPOTIFY_API_CLIENT_SECRET!);

const spotifyProfile = cache(async (): Promise<Artist | undefined> => {
    return performanceMonitor.measureAsyncFunction('spotify_profile_fetch', async () => {
        try {
            const items = await SPOTIFY_API.search("clxrity", ["artist"]);

            return items.artists.items.find((data) =>
                data.id === CONSTANTS.SPOTIFY_ARTIST_ID
            );
        } catch (error) {
            console.error('Failed to fetch Spotify profile:', error);
            return undefined;
        }
    });
});

const spotifyAlbum = async (id: string): Promise<Album | undefined> => {
    try {
        const albums = SPOTIFY_API.albums;
        const album = await albums.get(id);
        return album;
    } catch (error) {
        console.error('Failed to fetch Spotify album:', error);
        return undefined;
    }
};

export { SPOTIFY_API, spotifyProfile, spotifyAlbum }