import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { HiArrowRight, HiOutlineDownload } from "react-icons/hi";

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Replaces `<a>` in MDX: internal links use next/link, external ones open in a new tab. */
export function DocLink({
	href = "",
	children,
	...props
}: ComponentProps<"a">) {
	if (href.startsWith("#")) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	}
	if (isExternal(href)) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
				{children}
			</a>
		);
	}
	return (
		<Link href={href} {...props}>
			{children}
		</Link>
	);
}

/** Replaces `<table>` in MDX: scrolls horizontally instead of overflowing the page. */
export function Table(props: ComponentProps<"table">) {
	return (
		<div className="doc-table">
			<table {...props} />
		</div>
	);
}

export function Badge({
	children,
	tone = "neutral",
}: Readonly<{ children: ReactNode; tone?: "neutral" | "accent" }>) {
	return (
		<span className="doc-badge" data-tone={tone}>
			{children}
		</span>
	);
}

type DownloadProps = { href: string; children: ReactNode; note?: ReactNode };

export function DownloadButton({
	href,
	children,
	note,
}: Readonly<DownloadProps>) {
	return (
		<div className="doc-download">
			<a href={href} download className="doc-button" data-variant="primary">
				<HiOutlineDownload aria-hidden size={16} />
				{children}
			</a>
			{note && <span className="doc-download-note">{note}</span>}
		</div>
	);
}

type LinkCardProps = { href: string; title: string; children?: ReactNode };

export function LinkCard({ href, title, children }: Readonly<LinkCardProps>) {
	return (
		<DocLink href={href} className="link-card">
			<span className="link-card-title">
				{title}
				<HiArrowRight aria-hidden size={14} />
			</span>
			{children && <span className="link-card-body">{children}</span>}
		</DocLink>
	);
}

export function LinkCards({ children }: Readonly<{ children: ReactNode }>) {
	return <div className="link-cards">{children}</div>;
}
