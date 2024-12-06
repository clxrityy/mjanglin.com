import { URLS } from "@/config"
import "@/styles/socials.css"
import Link from "next/link"
import { FaDiscord, FaGithub, FaInstagram, FaSpotify } from "react-icons/fa"

export function SocialsMenu() {
    return (
        /* From Uiverse.io by akshat-patel28 */
        <div className="socials-button-container z-50">
            <button className="socials-button">
                <Link href={URLS.spotify} className="text-inherit hover:text-inherit">
                    <FaSpotify className="socials-icon" />
                </Link>
            </button>
            <button className="socials-button">
                <Link href={URLS.github} className="text-inherit hover:text-inherit">
                    <FaGithub className="socials-icon" />
                </Link>
            </button>
            <button className="socials-button">
                <Link href={URLS.instagram} className="text-inherit hover:text-inherit">
                    <FaInstagram className="socials-icon" />
                </Link>
            </button>
            <button className="socials-button">
                <Link href={URLS.discord} className="text-inherit hover:text-inherit">
                    <FaDiscord className="socials-icon" />
                </Link>
            </button>
        </div>
    )
}