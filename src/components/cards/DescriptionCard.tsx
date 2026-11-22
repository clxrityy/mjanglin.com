import { MailLink } from "./MailLink";
import { ReadMore } from "./ReadMore";

/** About section: a short intro and two ways to get in touch. Styles live in home.css. */
export function DescriptionCard() {
	return (
		<section className="about" aria-labelledby="about-title">
			<h2 id="about-title" className="home-label">
				About
			</h2>
			<p className="about-lead">
				Network specialist who loves creating and innovating.
			</p>
			<p className="about-body">
				I articulate and maintain networks, applications, and software that
				interact with the world.
			</p>
			<div className="about-actions">
				<ReadMore />
				<MailLink />
			</div>
		</section>
	);
}
