import { projects } from "@/config";

export default function Loading() {
	return (
		<div className="mx-auto w-full max-w-[72rem] px-6 max-sm:max-w-[28rem] pt-20 pb-16">
			<div className="mb-10">
				<div className="h-8 w-40 animate-pulse rounded bg-zinc-800" />
				<div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-zinc-800" />
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,17.5rem),1fr))] gap-8 xl:gap-10">
				{projects.map((project) => (
					<div
						key={project.slug}
						className="flex h-[370px] animate-pulse flex-col gap-3 rounded-[20px] bg-zinc-800/80 p-5"
					>
						<div className="h-[150px] rounded-[15px] bg-zinc-700/60" />
						<div className="h-5 w-2/3 rounded bg-zinc-700/60" />
						<div className="h-4 w-full rounded bg-zinc-700/60" />
						<div className="h-4 w-1/2 rounded bg-zinc-700/60" />
					</div>
				))}
			</div>
		</div>
	);
}
