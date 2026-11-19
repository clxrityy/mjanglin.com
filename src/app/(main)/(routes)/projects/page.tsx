import { ProjectCard } from "@/components/cards/ProjectCard";
import { projects } from "@/config";

export default function Page() {
	const sorted = [...projects].sort(
		(a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt),
	);
	const docs = sorted.filter((p) => !/^https?:\/\//.test(p.slug)).length;

	return (
		<div className="mx-auto w-full max-w-[72rem] px-6 max-sm:max-w-[28rem] pt-20 pb-16">
			<header className="mb-10">
				<h1 className="text-3xl font-bold text-zinc-100">Projects</h1>
				<p className="mt-2 text-sm text-zinc-400">
					{sorted.length} projects, newest first · {docs} with write-ups here,
					the rest open externally.
				</p>
			</header>
			<ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,17.5rem),1fr))] gap-8 xl:gap-10">
				{sorted.map((project) => (
					<li key={project.slug} className="flex">
						<ProjectCard project={project} />
					</li>
				))}
			</ul>
		</div>
	);
}
