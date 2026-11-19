import Image from "next/image";
import type { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { HiOutlineDownload, HiOutlineExternalLink } from "react-icons/hi";
import type { DocEntry, DocLinkKind } from "@/content/projects/registry";
import { splitProjectTitle } from "@/utils/projectTitle";
import type { Project } from "@/utils/types";

const LINK_ICONS: Record<DocLinkKind, IconType> = {
	repo: FaGithub,
	site: HiOutlineExternalLink,
	download: HiOutlineDownload,
};

type Props = { project: Project; links: DocEntry["links"] };

export function DocHeader({ project, links = [] }: Readonly<Props>) {
	const { name, tagline } = splitProjectTitle(project.title);
	const published = new Date(project.publishedAt);

	return (
		<header className="doc-header">
			<div className="doc-title-row">
				{project.mainImage && (
					<Image
						src={project.mainImage}
						alt=""
						width={56}
						height={56}
						unoptimized
						priority
						className="doc-icon"
					/>
				)}
				<div>
					<h1 className="doc-title">{name}</h1>
					{tagline && <p className="doc-tagline">{tagline}</p>}
				</div>
			</div>

			<p className="doc-summary">{project.preview}</p>

			<div className="doc-meta">
				<time dateTime={project.publishedAt}>
					{published.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
						timeZone: "UTC",
					})}
				</time>
				<span aria-hidden>·</span>
				<span>{project.author}</span>
			</div>

			{links.length > 0 && (
				<div className="doc-actions">
					{links.map((link, i) => {
						const Icon = LINK_ICONS[link.kind];
						const download = link.kind === "download";
						return (
							<a
								key={link.href}
								href={link.href}
								className="doc-button"
								data-variant={i === 0 ? "primary" : undefined}
								download={download || undefined}
								target={download ? undefined : "_blank"}
								rel={download ? undefined : "noopener noreferrer"}
							>
								<Icon aria-hidden size={15} />
								{link.label}
							</a>
						);
					})}
				</div>
			)}

			{project.keywords.length > 0 && (
				<ul className="doc-keywords" aria-label="Topics">
					{project.keywords.slice(0, 8).map((keyword) => (
						<li key={keyword}>{keyword}</li>
					))}
				</ul>
			)}
		</header>
	);
}
