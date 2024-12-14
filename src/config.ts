import { FaInstagram } from "react-icons/fa"

export const ICONS = {
    instagram: FaInstagram
}

export const IMAGES = {
    LOGO: "/apple-touch-icon.png"
}

export const URLS = {
    github: "https://github.com/clxrityy",
    instagram: "https://instagram.com/mjxnglin",
    spotify: "https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV",
    soundcloud: "https://soundcloud.com/clxrityy",
    discord: "https://discord.gg/RnwJEdsmy2",
    API: {
        ipify: "https://api.ipify.org",
        ip_api: "http://ip-api.com/json/",
        flags_api: "https://flagsapi.com",
        weather: "https://api.open-meteo.com/v1/forecast",
        spotify: "https://api.spotify.com/v1",
    },
    spotify_auth_redirect: process.env.NODE_ENV === "production" ? "https://mjanglin.com/api/spotify/callback" : "http://localhost:3000/api/spotify/callback",
    apple_music: "https://music.apple.com/us/artist/clxrity/1702200875",
    linkedin: "https://www.linkedin.com/in/mjanglin1/"
}

export const COLORS = {
    primary_blue: "#4996C0"
}