import { FaInstagram } from 'react-icons/fa';
import { MdxPost } from "./utils/types"

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

export const mdxPosts: MdxPost[] = [
    {
        title: "React Audio",
        slug: "https://react-audio-docs.vercel.app/",
        publishedAt: "2025-06-13",
        mainImage: "/assets/react-audio.webp",
        preview: "A React library for playing audio files with a simple and customizable interface.",
        keywords: ["react", "audio", "library", "javascript", "typescript", "web audio api"],
        author: "MJ Anglin"
    },
    {
        title: "How to host a Discord bot on Vercel (Edge Functions)",
        slug: "dev/nextjs-edge-discord-bot",
        publishedAt: "2024-11-14",
        mainImage: "/assets/discord-edge-bot.webp",
        preview: "An overview of how I built a Discord birthday bot, with an interactive dashboard, that runs on Edge runtime.",
        keywords: ["discord", "bot", "vercel", "edge functions", "javascript", "typescript", "nextjs", "react", "api"],
        author: "MJ Anglin"
    },
    {
        title: "Host a Minecraft server for free",
        slug: "dev/free-minecraft-server",
        publishedAt: "2025-01-25",
        mainImage: "/assets/mc-server.webp",
        preview: "How to host a Minecraft server for free using Docker and Microsoft Azure",
        keywords: ["minecraft", "server", "free", "docker", "microsoft", "azure", "cloud", "hosting"],
        author: "MJ Anglin"
    },
    {
        title: "A website for displaying and downloading audio files",
        slug: "dev/clxrity-xyz",
        publishedAt: "2024-11-14",
        mainImage: "/assets/clxrity-xyz.gif",
        preview: "A short dev blog about creating a website for producers to display and allow downloads of their audio files.",
        keywords: ["audio", "website", "react", "nextjs", "javascript", "typescript", "tailwindcss", "react-audio", "clxrity", "audio files", "display", "download", "waveform", "wav", "mp3", "web audio api"],
        author: "MJ Anglin"
    },
    // {
    //     title: "My best applications so far | 2024",
    //     slug: "dev/2024-hall-of-fame",
    //     publishedAt: "2024-11-14",
    //     mainImage: "https://i.gyazo.com/1f3b68264d0df4a4d0e1ee2a0b7a589b.png",
    //     preview: "A collection of my best web applications up to the year 2024",
    //     keywords: ["web", "react", "nextjs", "javascript", "typescript", "tailwindcss", "react-audio", "clxrity", "applications", "collection", "best", "2024"],
    //     author: "MJ Anglin"
    // }

    // {
    //     title: "2025 Web Development Tips",
    //     slug: "dev/2025-web-dev-tips",
    //     publishedAt: "2025-01-09",
    //     mainImage: "https://i.gyazo.com/0d4471a0369c70aa03eb91dcdd02b348.png",
    //     preview: "A cultivated list of the best tips & tricks for web development in 2025",
    //     keywords: ["web", "react", "nextjs", "javascript", "typescript", "tailwindcss", "clerk", "clxrity", "applications", "collection", "best", "2025", "prisma", "prisma-client", "socket.io", "socket.io-client"],
    //     author: "MJ Anglin"
    // }
    
]