import { URLS } from "@/config"
import "@/styles/socials.css"
import Link from "next/link"
import { FaDiscord, FaGithub, FaInstagram, FaSpotify } from "react-icons/fa"

export function SocialsMenu() {
    return (
        /* From Uiverse.io by akshat-patel28 */
        <div className="socials-button-container z-50">
            <button className="socials-button">
                <Link href={URLS.spotify}>
                    <FaSpotify className="socials-icon" />
                </Link>
            </button>
            <button className="socials-button">
                <Link href={URLS.github}>
                    <FaGithub className="socials-icon" />
                </Link>
            </button>
            <button className="socials-button">
                <Link href={URLS.instagram}>
                    <FaInstagram className="socials-icon" />
                </Link>
            </button>
            <button className="socials-button">
                <Link href={URLS.discord}>
                    <FaDiscord className="socials-icon" />
                </Link>
            </button>
        </div>
    )
}