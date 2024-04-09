import { FaEnvelope, FaGithub, FaMusic, FaReact, FaSoundcloud, FaSpotify, FaNodeJs, FaPython, FaInstagram, FaLinkedin, FaDiscord } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";


const configurations =  {
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
        discord: FaDiscord
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
    }
}

export default configurations;