"use client";

import { type ReactNode, useEffect, useId, useRef, useState } from "react";

type Props = {
	/** Mermaid source, e.g. a template literal: chart={`flowchart TD ...`} */
	chart: string;
	caption?: ReactNode;
	/** Accessible description of what the diagram shows. */
	alt?: string;
};

let initialized: Promise<typeof import("mermaid").default> | null = null;

/** Loads mermaid once, on first use, themed to match the docs palette. */
function loadMermaid() {
	initialized ??= import("mermaid").then(({ default: mermaid }) => {
		mermaid.initialize({
			startOnLoad: false,
			securityLevel: "strict",
			theme: "base",
			fontFamily: "inherit",
			themeVariables: {
				darkMode: true,
				background: "transparent",
				primaryColor: "#18222b",
				primaryTextColor: "#f4f4f5",
				primaryBorderColor: "#4996c0",
				secondaryColor: "#1c1c21",
				tertiaryColor: "#141418",
				lineColor: "#71717a",
				textColor: "#d4d4d8",
				clusterBkg: "rgba(255,255,255,0.03)",
				clusterBorder: "rgba(255,255,255,0.14)",
				edgeLabelBackground: "#141418",
				fontSize: "14px",
			},
		});
		return mermaid;
	});
	return initialized;
}

/**
 * Renders a Mermaid diagram client-side. The SVG (sanitized by mermaid's
 * "strict" security level) is parsed into a DOM node rather than injected as
 * an HTML string. Shows the source if rendering fails.
 */
export function Mermaid({ chart, caption, alt }: Readonly<Props>) {
	const id = `mermaid-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
	const container = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<"loading" | "ready" | "failed">("loading");

	useEffect(() => {
		let cancelled = false;
		loadMermaid()
			.then((mermaid) => mermaid.render(id, chart.trim()))
			.then(({ svg }) => {
				if (cancelled || !container.current) return;
				// Parse as HTML, not "image/svg+xml": mermaid's HTML labels live in
				// <foreignObject> and use HTML serialization (e.g. `<br>`, `&nbsp;`),
				// which is not well-formed XML and makes the XML parser fail.
				const doc = new DOMParser().parseFromString(svg, "text/html");
				const node = doc.body.querySelector("svg");
				if (!node) throw new Error("invalid svg");
				container.current.replaceChildren(document.importNode(node, true));
				setState("ready");
			})
			.catch((error: unknown) => {
				if (process.env.NODE_ENV !== "production") {
					console.error("[Mermaid] render failed:", error);
				}
				if (!cancelled) setState("failed");
			});
		return () => {
			cancelled = true;
		};
	}, [id, chart]);

	return (
		<figure className="doc-figure doc-mermaid">
			<div className="doc-figure-frame" role="img" aria-label={alt}>
				{state === "failed" ? (
					<pre className="doc-mermaid-fallback">{chart.trim()}</pre>
				) : (
					<div ref={container} className="doc-mermaid-svg" data-state={state} />
				)}
			</div>
			{caption && <figcaption>{caption}</figcaption>}
		</figure>
	);
}
