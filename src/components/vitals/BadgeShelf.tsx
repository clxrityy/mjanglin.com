"use client";

import { useState } from "react";
import { BADGE_IDS, badgeImage, badgeMarkdown } from "@/lib/vitals-badges";

function CopyButton({
	text,
	label,
}: Readonly<{ text: string; label: string }>) {
	const [copied, setCopied] = useState(false);
	return (
		<button
			type="button"
			className="vt-copy"
			aria-label={label}
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(text);
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				} catch {
					// Clipboard blocked
				}
			}}
		>
			{copied ? "copied" : "copy"}
		</button>
	);
}

/**
 * Markdown badges served from /api/vitals/:metric through shields.io, folded
 * away until opened. The images are lazy, so they load only once it's open.
 */
export function BadgeShelf() {
	return (
		<details className="vt-spoiler">
			<summary className="ro-h2 vt-summary">Badges</summary>
			<ul className="vt-badges">
				{BADGE_IDS.map((id) => (
					<li key={id}>
						<span className="vt-badge">
							{/* biome-ignore lint/performance/noImgElement: remote SVG of unknown width */}
							<img
								src={badgeImage(id)}
								alt={`${id} badge`}
								height={20}
								loading="lazy"
							/>
						</span>
						<CopyButton
							text={badgeMarkdown(id)}
							label={`Copy ${id} badge markdown`}
						/>
					</li>
				))}
			</ul>
		</details>
	);
}
