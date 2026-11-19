import "@/styles/cards/description.css";
import { exo } from "@/styles/fonts";
import { ImageComponent } from "../ui/ImageComponent";
import { MailLink } from "./MailLink";
import { ReadMore } from "./ReadMore";

/**
 * About card: a glass pane with two tinted sheets stacked behind it that fan
 * out on hover. The outer element never moves, so the hover can't flicker as
 * the card lifts out from under the pointer.
 */
export function DescriptionCard() {
	return (
		<div className={`desc-card ${exo.className}`}>
			<span className="desc-sheet desc-sheet-back" aria-hidden="true" />
			<span className="desc-sheet desc-sheet-mid" aria-hidden="true" />
			<div className="desc-body glass">
				<ImageComponent
					image={{
						src: "/apple-touch-icon.png",
						alt: "logo",
						width: 100,
						height: 100,
						className: "desc-logo grayscale brightness-200",
						priority: true,
					}}
				/>
				<ul className="desc-text">
					<li>Network specialist who loves creating and innovating.</li>
					<li>
						I articulate and maintain networks, applications, and software that
						interact with the world.
					</li>
				</ul>
				<div className="desc-action">
					<ReadMore>
						<span className="sr-only">Read more</span>
					</ReadMore>
					<MailLink />
				</div>
			</div>
		</div>
	);
}
