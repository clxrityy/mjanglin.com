import { FaEnvelope, FaGithub, FaMusic, FaReact, FaSoundcloud, FaSpotify, FaNodeJs, FaPython, FaInstagram, FaLinkedin, FaDiscord, FaTrash, FaStar, FaHome, FaFileAudio, FaJava } from "react-icons/fa";
import { SiTypescript, SiPrisma, SiVercel, SiPostgresql, SiOpenai} from "react-icons/si";
import { MdOutlineStart } from "react-icons/md";
import { RiNextjsLine, RiJavascriptFill } from "react-icons/ri";
import { FaChartSimple } from "react-icons/fa6";
import { PiSubtractFill } from "react-icons/pi";



const configurations = {
    icons: {
        github: FaGithub,
        spotify: FaSpotify,
        soundcloud: FaSoundcloud,
        music: FaMusic,
        email: FaEnvelope,
        react: FaReact,
        nodejs: FaNodeJs,
        typescript: SiTypescript,
        python: FaPython,
        instagram: FaInstagram,
        linkedin: FaLinkedin,
        discord: FaDiscord,
        delete: FaTrash,
        star: FaStar,
        publish: MdOutlineStart,
        home: FaHome,
        nextjs: RiNextjsLine,
        prisma: SiPrisma,
        vercel: SiVercel,
        postgresql: SiPostgresql,
        recharts: FaChartSimple,
        audio: FaFileAudio,
        sub: PiSubtractFill,
        javascript: RiJavascriptFill,
        java: FaJava,
        openai: SiOpenai,
    },
    colors: {
        github: "#333",
        spotify: "#1DB954",
        soundcloud: "#FF5500",
        typescript: "#007acc",
        react: "#61DAFB",
        nodejs: "#68a063",
        python: "#4584B6",
        discord: "#7289DA",
        postgresql: "#336791",
        java: "#f89820",
    },
    img: {
        python: "/img/python.webp",
        cpp: "/img/cpp.png",
        java: "/img/java.webp",
        nodejs: "/img/nodejs.png",
    },
    urls: {
        github: "https://github.com/clxrityy",
        instagram: "https://instagram.com/mjxnglin",
        spotify: "https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV",
        soundcloud: "https://soundcloud.com/clxrityy",
        linkedin: "https://www.linkedin.com/in/mjanglin1/",
        discord: "https://discord.gg/RnwJEdsmy2"
    }
} as const;

export default configurations;