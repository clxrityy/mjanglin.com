import { COLORS, URLS } from "@/config";
import "@/styles/buttons/readmore.css";
import "@/styles/buttons/mail.css";

/**
 * Envelope pill beside the read-more book: on hover the flap folds open and a
 * letter slides out. Two flaps (closed in front, open behind the letter) so the
 * letter can rise in front of the open flap.
 */
export function MailLink() {
	return (
		<a href={`mailto:${URLS.email}`} className="mail-btn" title={URLS.email}>
			<span className="sr-only">Email {URLS.email}</span>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 36 26"
				className="mail"
				aria-hidden="true"
			>
				<rect
					x="1.5"
					y="5.5"
					width="33"
					height="19"
					rx="3"
					fill={COLORS.primary_blue}
					stroke="#fff"
					strokeWidth="1.5"
				/>
				<path
					className="mail-flap-open"
					d="M2.5 5.5 L18 -4 L33.5 5.5 Z"
					fill="#3a7fa6"
					stroke="#fff"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
				<g className="mail-letter">
					<rect x="6" y="7" width="24" height="15" rx="1.5" fill="#fff" />
					<path
						d="M10 11.5H22M10 15H26"
						stroke={COLORS.primary_blue}
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</g>
				<path
					d="M1.5 9 L18 17.5 L34.5 9 V21.5 A3 3 0 0 1 31.5 24.5 H4.5 A3 3 0 0 1 1.5 21.5 Z"
					fill={COLORS.primary_blue}
					stroke="#fff"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
				<path
					className="mail-flap"
					d="M2.5 6 L18 15.5 L33.5 6 Z"
					fill="#3a7fa6"
					stroke="#fff"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
			</svg>
		</a>
	);
}
