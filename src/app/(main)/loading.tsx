export default function Loading() {
	return (
		<div className="flex h-dvh w-full flex-col items-center justify-center gap-5 p-6 lg:flex-row lg:gap-24">
			{/* Hero */}
			<div className="h-[330px] w-60 shrink-0 animate-pulse rounded-2xl bg-zinc-800" />
			<div className="flex w-full max-w-[22rem] flex-col gap-4 lg:w-64">
				{/* Time / music */}
				<div className="h-14 animate-pulse rounded-[15px] bg-zinc-800 lg:h-[150px]" />
				<div className="h-14 animate-pulse rounded-[15px] bg-zinc-800/70 lg:h-16" />
			</div>
		</div>
	);
}
