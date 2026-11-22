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

/** Markdown badges served from /api/vitals/:metric through shields.io. */
export function BadgeShelf() {
	return (
		<section aria-labelledby="vt-badges">
			<h2 id="vt-badges" className="ro-h2">
				Badges
				<span className="ro-muted">
					{" "}
					· JSON at{" "}
					<a href="/api/vitals" className="ro-link">
						/api/vitals
					</a>
				</span>
			</h2>
			<ul className="vt-badges">
				{BADGE_IDS.map((id) => (
					<li key={id}>
						<span className="vt-badge">
							{/* biome-ignore lint/performance/noImgElement: remote SVG of unknown width */}
							<img src={badgeImage(id)} alt={`${id} badge`} height={20} />
						</span>
						<CopyButton
							text={badgeMarkdown(id)}
							label={`Copy ${id} badge markdown`}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
