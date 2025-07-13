import { FaInstagram } from 'react-icons/fa';
import { HiOutlineExternalLink, HiOutlineDocumentText } from "react-icons/hi";
import { MdxPost } from "./utils/types";
import { TAGS } from './utils/constants';

export const ICONS = {
    instagram: FaInstagram,
    external: HiOutlineExternalLink,
    post: HiOutlineDocumentText
} as const;

export const IMAGES = {
    LOGO: "/apple-touch-icon.png"
} as const;

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
    spotify_auth_redirect: process.env.NODE_ENV === "production"
        ? "https://mjanglin.com/api/spotify/callback"
        : "http://localhost:3000/api/spotify/callback",
    apple_music: "https://music.apple.com/us/artist/clxrity/1702200875",
    linkedin: "https://www.linkedin.com/in/mjanglin1/"
} as const;

export const COLORS = {
    primary_blue: "#4996C0"
} as const;

export const mdxPosts: MdxPost[] = [
    {
        title: "React Audio",
        slug: "https://react-audio-docs.vercel.app/",
        publishedAt: "2025-06-13",
        mainImage: "/assets/react-audio.webp",
        preview: "A React library for playing audio files with a simple and customizable interface.",
        keywords: ["react", "audio", "library", "javascript", "typescript", "web audio api"],
        author: "MJ Anglin",
        tags: [
            { ...TAGS["react"] },
            { ...TAGS["javascript"] },
            { ...TAGS["typescript"] },
            { ...TAGS["audio"] },
            { ...TAGS["typescript"] },
            { ...TAGS["css"] }
        ]
    },
    {
        title: "Gatenet",
        slug: "https://gatenet.readthedocs.io/en/latest/",
        publishedAt: "2025-06-26",
        mainImage: "/assets/gatenet.png",
        preview: "A Python library for building asynchronous networking applications, supporting TCP, UDP, HTTP, and WebSocket protocols.",
        keywords: ["gatenet", "python", "library", "networking", "asynchronous", "asyncio", "network", "devices", "TCP", "UDP", "HTTP", "WebSocket"],
        author: "MJ Anglin",
        tags: [
            { ...TAGS["python"] },
            { ...TAGS["networking"] },
        ]
    },
    {
        title: "FarLanders",
        slug: "https://www.farlanders.cc",
        publishedAt: "2025-07-04",
        mainImage: "/assets/farlanders.png",
        preview: "A Minecraft plugin developed for a dystopian and unique experience.",
        keywords: ["minecraft", "plugin", "spigot", "paper", "java", "game", "gaming", "dystopian", "unique", "experience"],
        author: "MJ Anglin",
        tags: [
            { ...TAGS["game"] },
            { ...TAGS["java"] },
            { ...TAGS["html"] },
            { ...TAGS["css"] },
        ]
    },
    {
        title: "How to host a Discord bot on Vercel (Edge Functions)",
        slug: "dev/nextjs-edge-discord-bot",
        publishedAt: "2024-11-14",
        mainImage: "/assets/discord-edge-bot.webp",
        preview: "An overview of how I built a Discord birthday bot, with an interactive dashboard, that runs on Edge runtime.",
        keywords: ["discord", "bot", "vercel", "edge functions", "javascript", "typescript", "nextjs", "react", "api"],
        author: "MJ Anglin",
        tags: [
            { ...TAGS["discord"] },
            { ...TAGS["javascript"] },
            { ...TAGS["typescript"] },
            { ...TAGS["react"] },
            { ...TAGS["ai"] }
        ]
    },
    {
        title: "Host a Minecraft server for free",
        slug: "dev/free-minecraft-server",
        publishedAt: "2025-01-25",
        mainImage: "/assets/mc-server.webp",
        preview: "How to host a Minecraft server for free using Docker and Microsoft Azure",
        keywords: ["minecraft", "server", "free", "docker", "microsoft", "azure", "cloud", "hosting"],
        author: "MJ Anglin",
        tags: [
            { ...TAGS["game"] },
        ]
    },
    {
        title: "A website for displaying and downloading audio files",
        slug: "dev/clxrity-xyz",
        publishedAt: "2024-11-14",
        mainImage: "/assets/clxrity-xyz.gif",
        preview: "A short dev blog about creating a website for producers to display and allow downloads of their audio files.",
        keywords: ["audio", "website", "react", "nextjs", "javascript", "typescript", "tailwindcss", "react-audio", "clxrity", "audio files", "display", "download", "waveform", "wav", "mp3", "web audio api"],
        author: "MJ Anglin",
        tags: [
            { ...TAGS["audio"] },
            { ...TAGS["react"] },
            { ...TAGS["javascript"] },
            { ...TAGS["typescript"] },
            { ...TAGS["css"] },
            { ...TAGS["html"] },
        ]
    },
    {
        title: "Cyl — Programming Language",
        slug: "https://cyl-lang.org",
        publishedAt: "2025-07-13",
        mainImage: "/assets/cyl-lang.png",
        preview: "A modern systems programming language designed for performance and safety, with a focus on simplicity and expressiveness.",
        keywords: ["cyl", "programming language", "systems programming", "performance", "safety", "simplicity", "expressiveness", "compiler", "language design", "rust", "python", "javascript", "typescript", "css", "html", "cargo"],
        author: "MJ Anglin",
        tags: [
            { ...TAGS["rust"] },
            { ...TAGS["python"] },
            { ...TAGS["javascript"] },
            { ...TAGS["typescript"] },
            { ...TAGS["css"] },
            { ...TAGS["html"] },
        ]
    }
]