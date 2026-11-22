import {
	FaDiscord,
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaYoutube,
} from "react-icons/fa";
import { URLS } from "@/config";

const SOCIALS = [
	{ label: "LinkedIn", href: URLS.linkedin, Icon: FaLinkedin },
	{ label: "GitHub", href: URLS.github, Icon: FaGithub },
	{ label: "YouTube", href: URLS.youtube, Icon: FaYoutube },
	{ label: "Instagram", href: URLS.instagram, Icon: FaInstagram },
	{ label: "Discord", href: URLS.discord, Icon: FaDiscord },
] as const;

/** A row of square icon buttons, one per profile. Styles live in home.css. */
export function SocialsMenu() {
	return (
		<ul className="socials" aria-label="Elsewhere">
			{SOCIALS.map(({ label, href, Icon }) => (
				<li key={label}>
					<a
						href={href}
						rel="noopener noreferrer"
						target="_blank"
						className="social"
						aria-label={label}
						title={label}
					>
						<Icon aria-hidden="true" />
					</a>
				</li>
			))}
		</ul>
	);
}
