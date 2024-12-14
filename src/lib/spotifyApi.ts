import { SpotifyApi, type Artist, type Album } from "@spotify/web-api-ts-sdk";

const SPOTIFY_API = SpotifyApi.withClientCredentials(process.env.SPOTIFY_API_CLIENT_ID!, process.env.SPOTIFY_API_CLIENT_SECRET!);

const spotifyProfile= async (): Promise<Artist | undefined>  => {
    const items = await SPOTIFY_API.search("clxrity", ["artist"]);

    let artist: Artist | undefined = undefined;

    items.artists.items.forEach((data) => {
        if (data.id === "0HaFO6TLXEZ2De3d67dThV") {
            artist = data;
        }
    });

    return artist;
}

const spotifyAlbum = async (id: string): Promise<Album> => {

    const albums = SPOTIFY_API.albums

    const album = await albums.get(id);

    return album;
};

export { SPOTIFY_API, spotifyProfile, spotifyAlbum }