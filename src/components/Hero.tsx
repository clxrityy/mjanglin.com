import { MusicLink } from "@/components/home/MusicLink";
import { Logo } from "@/components/Logo";
import { SocialsMenu } from "@/components/layout/SocialsMenu";

/** Name, roles and profiles. The only place the logo appears on the page. */
export function HeroCard() {
	return (
		<section className="hero" aria-labelledby="hero-name">
			<Logo className="hero-logo" />
			<h1 id="hero-name" className="hero-name">
				MJ Anglin
			</h1>
			<ul className="hero-roles">
				<li>Network Developer</li>
				<li>Systems Administrator</li>
			</ul>
			<SocialsMenu />
			<MusicLink />
		</section>
	);
}
