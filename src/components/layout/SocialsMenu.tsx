import { URLS } from "@/config";
import "@/styles/buttons/socials.css";
import Link from "next/link";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const SOCIALS = [
	{ label: "linkedin", href: URLS.linkedin, Icon: FaLinkedin },
	{ label: "github", href: URLS.github, Icon: FaGithub },
	{ label: "instagram", href: URLS.instagram, Icon: FaInstagram },
	{ label: "discord", href: URLS.discord, Icon: FaDiscord },
] as const;

export function SocialsMenu() {
	return (
		/* From Uiverse.io by akshat-patel28 */
		<div className="socials-button-container z-50">
			{SOCIALS.map(({ label, href, Icon }) => (
				<Link
					key={label}
					href={href}
					prefetch={false}
					rel="noopener noreferrer"
					target="_blank"
					className="socials-button text-inherit hover:text-inherit"
					aria-label={label}
				>
					<Icon className="socials-icon" aria-hidden="true" />
				</Link>
			))}
		</div>
	);
}
