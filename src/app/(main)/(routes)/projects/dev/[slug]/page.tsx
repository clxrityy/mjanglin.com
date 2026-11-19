import "@/styles/docs.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocFooter } from "@/components/docs/DocFooter";
import { DocHeader } from "@/components/docs/DocHeader";
import { TableOfContents } from "@/components/docs/TableOfContents";
import { docs, getDoc } from "@/content/projects/registry";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
	return docs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<Params>;
}): Promise<Metadata> {
	const entry = getDoc((await params).slug);
	if (!entry) return {};
	const { project } = entry;
	return {
		title: project.title,
		description: project.preview,
		keywords: project.keywords,
		openGraph: {
			title: project.title,
			description: project.preview,
			type: "article",
			publishedTime: project.publishedAt,
		},
	};
}

const ARTICLE_ID = "doc-article";

export default async function DocPage({ params }: { params: Promise<Params> }) {
	const entry = getDoc((await params).slug);
	if (!entry) notFound();

	const { doc, project, previous, next } = entry;
	const { default: Content } = await doc.load();

	return (
		<div className="doc-shell">
			<div className="doc-main">
				<DocHeader project={project} links={doc.links} />
				<TableOfContents articleId={ARTICLE_ID} variant="mobile" />
				<article id={ARTICLE_ID} className="prose-doc">
					<Content />
				</article>
				<DocFooter previous={previous} next={next} />
			</div>
			<aside className="doc-aside">
				<TableOfContents articleId={ARTICLE_ID} variant="desktop" />
			</aside>
		</div>
	);
}
