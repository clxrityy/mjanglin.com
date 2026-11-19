"use client";

import { useEffect, useState } from "react";
import { HiChevronDown } from "react-icons/hi";

type Heading = { id: string; text: string; level: 2 | 3 };

/** Reads h2/h3 headings (ids come from rehype-slug) out of the rendered article. */
function useHeadings(articleId: string) {
	const [headings, setHeadings] = useState<Heading[]>([]);
	useEffect(() => {
		const article = document.getElementById(articleId);
		if (!article) return;
		const nodes = article.querySelectorAll<HTMLHeadingElement>(
			":scope > h2[id], :scope > h3[id], :scope .steps > h3[id]",
		);
		setHeadings(
			Array.from(nodes).map((node) => ({
				id: node.id,
				text: node.textContent ?? "",
				level: node.tagName === "H2" ? 2 : 3,
			})),
		);

		// The page scrolls inside <main>, not the window, so the browser doesn't
		// jump to a #hash on first load by itself.
		const hash = decodeURIComponent(window.location.hash.slice(1));
		if (hash) document.getElementById(hash)?.scrollIntoView();
	}, [articleId]);
	return headings;
}

/** Highlights the heading the reader is currently in. */
function useActiveHeading(headings: Heading[]) {
	const [active, setActive] = useState<string | null>(null);
	useEffect(() => {
		if (headings.length === 0) return;
		const visible = new Map<string, boolean>();
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					visible.set(entry.target.id, entry.isIntersecting);
				}
				const first = headings.find((h) => visible.get(h.id));
				if (first) setActive(first.id);
			},
			// A band near the top of the viewport counts as "reading".
			{ rootMargin: "-10% 0px -70% 0px" },
		);
		for (const heading of headings) {
			const el = document.getElementById(heading.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, [headings]);
	return active;
}

function TocList({
	headings,
	active,
	onNavigate,
}: Readonly<{
	headings: Heading[];
	active: string | null;
	onNavigate?: () => void;
}>) {
	return (
		<ol className="toc-list">
			{headings.map((heading) => (
				<li key={heading.id} data-level={heading.level}>
					<a
						href={`#${heading.id}`}
						aria-current={heading.id === active ? "location" : undefined}
						onClick={onNavigate}
					>
						{heading.text}
					</a>
				</li>
			))}
		</ol>
	);
}

type Props = { articleId: string; variant: "mobile" | "desktop" };

export function TableOfContents({ articleId, variant }: Readonly<Props>) {
	const headings = useHeadings(articleId);
	const active = useActiveHeading(headings);
	const [open, setOpen] = useState(false);

	if (headings.length < 2) return null;

	if (variant === "mobile") {
		return (
			<details
				className="toc-mobile"
				open={open}
				onToggle={(e) => setOpen(e.currentTarget.open)}
			>
				<summary>
					<span>On this page</span>
					<HiChevronDown aria-hidden size={16} />
				</summary>
				<TocList
					headings={headings}
					active={active}
					onNavigate={() => setOpen(false)}
				/>
			</details>
		);
	}

	return (
		<nav className="toc-desktop" aria-label="On this page">
			<p className="toc-title">On this page</p>
			<TocList headings={headings} active={active} />
		</nav>
	);
}
