import { LOGO_CELLS, LOGO_RADIUS, LOGO_SIZE } from "@/lib/logo";

/** The mark (see lib/logo.ts), drawn in currentColor. */
export function Logo({
	className,
	title = "MJ Anglin",
}: Readonly<{ className?: string; title?: string }>) {
	return (
		<svg
			viewBox={`0 0 ${LOGO_SIZE} ${LOGO_SIZE}`}
			className={className}
			fill="currentColor"
			role="img"
			aria-label={title}
		>
			<title>{title}</title>
			{LOGO_CELLS.map((c) => (
				<rect
					key={`${c.x}-${c.y}`}
					x={c.x}
					y={c.y}
					width={c.w}
					height={c.w}
					rx={c.w * LOGO_RADIUS}
					fillOpacity={c.o}
				/>
			))}
		</svg>
	);
}
