/**
 * The mark: a sphere built from square cells, its columns rising and dipping
 * like a waveform. One colour; depth comes from opacity, brightest toward the
 * upper left where the light hits. Shared by <Logo /> and the icon files.
 *
 * No imports, so scripts can load it directly.
 */

const PITCH = 1.4;
const CELL = 1;
/** Cells across (odd, so there's a centre column) */
const GRID = 11;
/** The wave: amplitude and frequency, in grid units */
const AMP = 2.4;
const FREQ = 0.42;

/** w is the cell's size: cells shrink toward the rim (the sphere) and swell along the wave */
export type Cell = { x: number; y: number; w: number; o: number };

const half = ((GRID - 1) / 2) * PITCH;
const r = half + CELL * 0.6;
/** viewBox is 0 0 SIZE SIZE */
export const LOGO_SIZE = Math.round((half * 2 + CELL) * 100) / 100;

const round = (n: number) => Math.round(n * 100) / 100;

export const LOGO_CELLS: Cell[] = Array.from({ length: GRID * GRID }).flatMap(
	(_, k) => {
		const cx = ((k % GRID) - (GRID - 1) / 2) * PITCH;
		const cy = (Math.floor(k / GRID) - (GRID - 1) / 2) * PITCH;
		const d = Math.hypot(cx, cy) / r;
		if (d > 1) return [];
		// Height of the sphere's surface here, 0 at the rim and 1 at the centre
		const z = Math.sqrt(1 - d * d);
		// Closeness to the wave line, 1 on it
		const band = Math.exp(-(((cy - AMP * Math.sin(FREQ * cx)) / 0.95) ** 2));
		const w = CELL * Math.min(1.05, 0.22 + 0.4 * z + 0.5 * band);
		const o = Math.min(1, 0.28 + 0.27 * z + 0.6 * band);
		const c = (PITCH * (GRID - 1)) / 2 + CELL / 2;
		return [
			{
				x: round(cx + c - w / 2),
				y: round(cy + c - w / 2),
				w: round(w),
				o: round(o),
			},
		];
	},
);

export const LOGO_RADIUS = 0.22;

/** Standalone SVG markup, e.g. for favicons. */
export function logoSvg({
	fill = "currentColor",
	background,
	padding = 0,
	css,
}: {
	fill?: string;
	/** Rounded square behind the mark */
	background?: string;
	/** Space around the mark, in mark units */
	padding?: number;
	/** Extra <style> rules */
	css?: string;
} = {}) {
	const size = LOGO_SIZE + padding * 2;
	const cells = LOGO_CELLS.map(
		(c) =>
			`<rect x="${c.x + padding}" y="${c.y + padding}" width="${c.w}" height="${c.w}" rx="${round(c.w * LOGO_RADIUS)}" fill-opacity="${c.o}"/>`,
	).join("");
	const bg = background
		? `<rect class="bg" width="${size}" height="${size}" rx="${size * 0.22}" fill="${background}"/>`
		: "";
	const style = css ? `<style>${css}</style>` : "";
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">${style}${bg}<g class="mark" fill="${fill}">${cells}</g></svg>`;
}
