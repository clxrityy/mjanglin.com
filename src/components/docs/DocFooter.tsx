import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { splitProjectTitle } from "@/utils/projectTitle";

type Neighbour = { slug: string; title: string } | null;

export function DocFooter({
	previous,
	next,
}: Readonly<{ previous: Neighbour; next: Neighbour }>) {
	return (
		<footer className="doc-footer">
			<nav className="doc-pager" aria-label="More projects">
				{previous ? (
					<Link
						href={`/projects/dev/${previous.slug}`}
						className="doc-pager-link"
					>
						<span className="doc-pager-label">
							<HiArrowLeft aria-hidden size={13} /> Previous
						</span>
						<span className="doc-pager-title">
							{splitProjectTitle(previous.title).name}
						</span>
					</Link>
				) : (
					<span />
				)}
				{next && (
					<Link
						href={`/projects/dev/${next.slug}`}
						className="doc-pager-link"
						data-align="end"
					>
						<span className="doc-pager-label">
							Next <HiArrowRight aria-hidden size={13} />
						</span>
						<span className="doc-pager-title">
							{splitProjectTitle(next.title).name}
						</span>
					</Link>
				)}
			</nav>
			<Link href="/projects" className="doc-back">
				<HiArrowLeft aria-hidden size={14} />
				All projects
			</Link>
		</footer>
	);
}
