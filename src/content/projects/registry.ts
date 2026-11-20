import type { ComponentType } from "react";
import { projects } from "@/config";
import { r2AssetPath } from "@/utils/assets";

export type DocLinkKind = "repo" | "site" | "download";

export type DocEntry = {
	/** URL segment: /projects/dev/<slug> */
	slug: string;
	load: () => Promise<{ default: ComponentType }>;
	/** Shown as buttons in the doc header. */
	links?: { kind: DocLinkKind; label: string; href: string }[];
};

/**
 * Every project with a written doc. Order here is the reading order used for
 * previous / next links. Title, summary, date, image and keywords come from `projects` in config.
 */
export const docs: DocEntry[] = [
	{
		slug: "aster",
		load: () => import("./aster/index.mdx"),
		links: [
			{
				kind: "repo",
				label: "Source",
				href: "https://github.com/clxrityy/aster",
			},
		],
	},
	{
		slug: "crateloot",
		load: () => import("./crateloot/index.mdx"),
		links: [
			{
				kind: "download",
				label: "CrateLoot-0.4.0.jar",
				href: r2AssetPath("assets/CrateLoot-0.4.0.jar"),
			},
		],
	},
	{
		slug: "free-minecraft-server",
		load: () => import("./free-minecraft-server/index.mdx"),
		links: [
			{
				kind: "site",
				label: "itzg/minecraft-server",
				href: "https://docker-minecraft-server.readthedocs.io/",
			},
		],
	},
	{
		slug: "nextjs-edge-discord-bot",
		load: () => import("./nextjs-edge-discord-bot/index.mdx"),
		links: [
			{
				kind: "repo",
				label: "Source",
				href: "https://github.com/clxrityy/nextjs-discord-bot-with-oauth",
			},
			{ kind: "site", label: "Live", href: "https://hbd.clxrity.xyz" },
		],
	},
	{
		slug: "clxrity-xyz",
		load: () => import("./clxrity-xyz/index.mdx"),
		links: [
			{
				kind: "repo",
				label: "react-audio",
				href: "https://github.com/clxrityy/react-audio",
			},
			{ kind: "site", label: "clxrity.xyz", href: "https://clxrity.xyz" },
		],
	},
];

export function getDoc(slug: string) {
	const index = docs.findIndex((doc) => doc.slug === slug);
	if (index === -1) return null;

	const project = projects.find((p) => p.slug === `dev/${slug}`);
	if (!project) {
		throw new Error(
			`No project in config for doc "${slug}" (expected slug "dev/${slug}")`,
		);
	}

	const neighbour = (i: number) => {
		const doc = docs[i];
		if (!doc) return null;
		const p = projects.find((entry) => entry.slug === `dev/${doc.slug}`);
		return p ? { slug: doc.slug, title: p.title } : null;
	};

	return {
		doc: docs[index],
		project,
		previous: neighbour(index - 1),
		next: neighbour(index + 1),
	};
}
