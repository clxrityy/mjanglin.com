"use client";

import "@/styles/layout/topnav.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

type Props = {
	/** Breadcrumb label for each known path, e.g. { "/projects": "Projects" }. */
	labels?: Record<string, string>;
	/** Label for the current page when its path isn't in `labels` (e.g. a 404). */
	current?: string;
};

/**
 * The one piece of navigation on every page but home: a back arrow that goes up
 * a level, and a breadcrumb trail. Path segments with no label (like /dev) are
 * skipped, since they have no page of their own.
 */
export function TopNav({ labels = {}, current }: Readonly<Props>) {
	const pathname = usePathname();

	const crumbs = [{ href: "/", label: "Home" }];
	let path = "";
	for (const part of pathname.split("/").filter(Boolean)) {
		path += `/${part}`;
		if (labels[path]) crumbs.push({ href: path, label: labels[path] });
	}
	if (current) crumbs.push({ href: pathname, label: current });

	const parent = crumbs.at(-2) ?? crumbs[0];

	return (
		<nav className="top-nav" aria-label="Breadcrumb">
			<Link
				href={parent.href}
				className="top-nav-back"
				aria-label={`Back to ${parent.label}`}
			>
				<HiArrowLeft aria-hidden size={16} />
			</Link>
			<ol className="top-nav-trail">
				{crumbs.map((crumb, i) => {
					const last = i === crumbs.length - 1;
					return (
						<li key={crumb.href} data-current={last || undefined}>
							{last ? (
								<span aria-current="page">{crumb.label}</span>
							) : (
								<Link href={crumb.href}>{crumb.label}</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
