import Image from "next/image";
import Link from "next/link";
import { ICONS } from "@/config";
import { splitProjectTitle } from "@/utils/projectTitle";
import type { Project } from "@/utils/types";

const isExternal = (slug: string) =>
	slug.startsWith("http://") || slug.startsWith("https://");

type Props = {
	project: Project;
	/** Outgoing layers are hidden from assistive tech and can't be focused. */
	hidden?: boolean;
};

export function ProjectTile({ project, hidden = false }: Readonly<Props>) {
	const { title, slug, mainImage, publishedAt } = project;
	const external = isExternal(slug);
	const href = external ? slug : `/projects/${slug}`;
	const { name, tagline } = splitProjectTitle(title);
	const year = new Date(publishedAt).getUTCFullYear();
	const KindIcon = external ? ICONS.external : ICONS.project;

	return (
		<Link
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			prefetch={false}
			tabIndex={hidden ? -1 : undefined}
			aria-hidden={hidden || undefined}
			className="project-tile"
		>
			<div className="project-tile-thumb">
				{mainImage && (
					<Image
						src={mainImage}
						alt=""
						fill
						unoptimized
						sizes="160px"
						className="project-tile-image"
					/>
				)}
			</div>
			<div className="project-tile-text">
				<p className="project-tile-name">{name}</p>
				{tagline && <p className="project-tile-tagline">{tagline}</p>}
				<p className="project-tile-meta">
					<KindIcon aria-hidden size={12} />
					<span>{external ? "External" : "Post"}</span>
					<span aria-hidden>·</span>
					<span>{year}</span>
				</p>
			</div>
		</Link>
	);
}
