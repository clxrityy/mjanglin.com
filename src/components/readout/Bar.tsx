const CELLS = 16;

/**
 * A row of fixed cells, filled left to right in the surrounding --tone.
 * Decorative: always pair it with the number it depicts.
 */
export function Bar({
	value,
	cells = CELLS,
}: Readonly<{
	/** 0..1, or null for an empty bar */
	value: number | null;
	cells?: number;
}>) {
	const filled =
		value === null
			? 0
			: Math.max(1, Math.round(Math.min(1, Math.max(0, value)) * cells));

	return (
		<span className="ro-bar" aria-hidden="true">
			{Array.from({ length: cells }, (_, i) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length row of cells
				<span key={i} className="ro-cell" data-on={i < filled || undefined} />
			))}
		</span>
	);
}
