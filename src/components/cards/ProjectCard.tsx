import "@/styles/cards/projectcard.css";
import Image from "next/image";
import { ICONS } from "@/config";
import type { Project } from "@/utils/types";

const isExternal = (slug: string) => /^https?:\/\//.test(slug);

export function ProjectCard({ project }: Readonly<{ project: Project }>) {
	const { title, publishedAt, mainImage, preview, slug } = project;
	const external = isExternal(slug);
	const href = external ? slug : `/projects/${slug}`;
	const KindIcon = external ? ICONS.external : ICONS.project;
	const date = new Date(publishedAt).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC",
	});

	return (
		<article className={`project-card ${external ? "external" : ""}`}>
			<div className="project-card-image">
				{mainImage && (
					<Image
						src={mainImage}
						alt=""
						fill
						unoptimized
						sizes="320px"
						className="project-card-actual-image"
					/>
				)}
			</div>

			<h2 className="project-card-title">
				{/* Stretched over the whole card (see ::after in the CSS) */}
				<a
					href={href}
					className="project-card-link"
					target={external ? "_blank" : undefined}
					rel={external ? "noopener noreferrer" : undefined}
				>
					{title}
				</a>
			</h2>

			{preview && <p className="project-card-body">{preview}</p>}

			<footer className="project-card-footer">
				<span
					className="project-card-kind"
					data-external={external || undefined}
				>
					<KindIcon aria-hidden="true" size={15} />
					{external ? "External" : "Docs"}
				</span>
				<time dateTime={publishedAt}>{date}</time>
			</footer>
		</article>
	);
}
