import { type TagRecord } from "./types";
import { FaRust, FaPython, FaReact, FaHtml5, FaCss3, FaGamepad, FaDiscord, FaRobot, FaJava } from "react-icons/fa6";
import { RiJavascriptFill } from "react-icons/ri";
import { TbBrandTypescript } from "react-icons/tb";
import { GiNetworkBars } from "react-icons/gi";
import { LuAudioLines } from "react-icons/lu";



export const CONSTANTS = {
    POSTS_PER_PAGE: 4,
    SPOTIFY_ARTIST_ID: "0HaFO6TLXEZ2De3d67dThV",
    WEATHER_CACHE_DURATION: 300000, // 5 minutes
    DEFAULT_WEATHER_TEMP: 0,
    GOOGLE_ANALYTICS_ID: "G-DH9C4WZGMK",
} as const;

export const COMPONENT_SIZES = {
    HERO_ICON: {
        width: 100,
        height: 100,
    },
    SPOTIFY_PROFILE_ICON: {
        width: 32,
        height: 32,
    },
    SOCIAL_ICON: {
        width: 40,
        height: 40,
    },
    FLAG_ICON: {
        width: 50,
        height: 50,
    },
} as const;

export const ANIMATION_CLASSES = {
    HOVER_SCALE: "hover:scale-105 transition-all duration-300 ease-out",
    HOVER_SCALE_LARGE: "hover:scale-125 transition-all duration-300 ease-in-out",
    PULSE: "animate-pulse",
    SPIN: "animate-spin",
} as const;



export const TAGS: Record<string, TagRecord> = {
    rust: {
        title: "Rust",
        description: "A systems programming language focused on safety, speed, and concurrency.",
        Icon: FaRust,
    },
    python: {
        title: "Python",
        description: "A versatile programming language known for its readability and wide range of applications.",
        Icon: FaPython,
    },
    javascript: {
        title: "JavaScript",
        description: "A dynamic programming language commonly used for web development.",
        Icon: RiJavascriptFill,
    },
    typescript: {
        title: "TypeScript",
        description: "A superset of JavaScript that adds static types, enhancing code quality and maintainability.",
        Icon: TbBrandTypescript,
    },
    react: {
        title: "React",
        description: "A JavaScript library for building user interfaces, particularly single-page applications.",
        Icon: FaReact,
    },
    html: {
        title: "HTML",
        description: "The standard markup language for creating web pages and web applications.",
        Icon: FaHtml5,
    },
    css: {
        title: "CSS",
        description: "A style sheet language used for describing the presentation of a document written in HTML or XML.",
        Icon: FaCss3,
    },
    networking: {
        title: "Networking",
        description: "The practice of connecting computers and other devices to share resources and information.",
        Icon: GiNetworkBars,
    },
    audio: {
        title: "Audio",
        description: "Technologies and techniques related to sound processing, playback, and manipulation.",
        Icon: LuAudioLines,
    },
    game: {
        title: "Game Development",
        description: "The art and science of creating interactive games and/or enhancing gaming experiences.",
        Icon: FaGamepad,
    },
    discord: {
        title: "Discord",
        description: "A communication platform popular among gamers and communities for voice, video, and text chat.",
        Icon: FaDiscord,
    },
    ai: {
        title: "AI",
        description: "Artificial Intelligence, the simulation of human intelligence processes by machines, especially computer systems.",
        Icon: FaRobot,
    },
    java: {
        title: "Java",
        description: "A high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible.",
        Icon: FaJava,
    },
}