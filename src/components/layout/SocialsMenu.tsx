import { URLS } from "@/config"
import "@/styles/css/socials.css"
import Link from "next/link"
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"

export function SocialsMenu() {
    return (
        /* From Uiverse.io by akshat-patel28 */
        <div className="socials-button-container z-50">
            <button className="socials-button" aria-label="spotify">
                <Link href={URLS.linkedin} className="text-inherit hover:text-inherit" aria-label="spotify">
                    <FaLinkedin className="socials-icon" />
                </Link>
            </button>
            <button className="socials-button" aria-label="github">
                <Link href={URLS.github} className="text-inherit hover:text-inherit" aria-label="github">
                    <FaGithub className="socials-icon" />
                </Link>
            </button>
            <button className="socials-button" aria-label="instagram">
                <Link href={URLS.instagram} className="text-inherit hover:text-inherit" aria-label="instagram">
                    <FaInstagram className="socials-icon" />
                </Link>
            </button>
            <button className="socials-button" aria-label="discord">
                <Link href={URLS.discord} className="text-inherit hover:text-inherit" aria-label="discord">
                    <FaDiscord className="socials-icon" />
                </Link>
            </button>
        </div>
    )
}