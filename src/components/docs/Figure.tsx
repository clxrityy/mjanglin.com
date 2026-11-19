"use client";

import Image from "next/image";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
	src: string;
	alt: string;
	width: number;
	height: number;
	caption?: ReactNode;
	/** Puts a light backdrop behind diagrams drawn on white/transparent backgrounds. */
	light?: boolean;
	/** Narrower figure for small images like logos and icons. */
	size?: "sm" | "md" | "lg";
	priority?: boolean;
};

/** Image with an optional caption; click to view it full size. */
export function Figure({
	src,
	alt,
	width,
	height,
	caption,
	light = false,
	size = "lg",
	priority = false,
}: Readonly<Props>) {
	const dialog = useRef<HTMLDialogElement>(null);

	return (
		<figure className="doc-figure" data-size={size}>
			<button
				type="button"
				className={cn("doc-figure-frame", light && "is-light")}
				onClick={() => dialog.current?.showModal()}
				aria-label={`Enlarge image: ${alt}`}
			>
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					unoptimized
					priority={priority}
				/>
			</button>
			{caption && <figcaption>{caption}</figcaption>}
			<dialog
				ref={dialog}
				className="doc-figure-dialog"
				onClick={() => dialog.current?.close()}
				onKeyDown={(event) => event.key === "Escape" && dialog.current?.close()}
			>
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					unoptimized
					className={cn(light && "is-light")}
				/>
			</dialog>
		</figure>
	);
}

/** Lays out several figures side by side on wide screens. */
export function Figures({ children }: Readonly<{ children: ReactNode }>) {
	return <div className="doc-figures">{children}</div>;
}

type VideoProps = {
	sources: { src: string; type: string }[];
	caption?: ReactNode;
	size?: "sm" | "md" | "lg";
};

/** Silent looping demo clip. */
export function Video({ sources, caption, size = "md" }: Readonly<VideoProps>) {
	return (
		<figure className="doc-figure" data-size={size}>
			<div className="doc-figure-frame">
				<video autoPlay loop muted playsInline>
					{sources.map((source) => (
						<source key={source.src} src={source.src} type={source.type} />
					))}
				</video>
			</div>
			{caption && <figcaption>{caption}</figcaption>}
		</figure>
	);
}
