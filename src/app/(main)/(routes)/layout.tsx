import { TopNav } from "@/components/layout/TopNav";
import { projects } from "@/config";
import { splitProjectTitle } from "@/utils/projectTitle";

// Breadcrumb labels for every page under this layout. Doc pages use the short
// project name ("CrateLoot", not "CrateLoot - Minecraft Plugin").
const labels: Record<string, string> = {
	"/projects": "Projects",
	"/music": "Music",
	"/weather": "Weather",
	"/vitals": "Vitals",
	...Object.fromEntries(
		projects
			.filter((p) => !/^https?:\/\//.test(p.slug))
			.map((p) => [`/projects/${p.slug}`, splitProjectTitle(p.title).name]),
	),
};

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<TopNav labels={labels} />
			{children}
		</>
	);
}
