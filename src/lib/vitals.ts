/**
 * Shared Web Vitals definitions: thresholds, ratings and formatting.
 * Safe to import from both client and server code.
 *
 * Thresholds are Google's published "good" / "poor" boundaries at p75.
 * @see https://web.dev/articles/vitals
 */

export const SITE_URL = "https://mjanglin.com";

export type Rating = "good" | "needs-improvement" | "poor";

export type VitalKey = "lcp" | "inp" | "cls" | "fcp" | "ttfb";

export type VitalDef = {
	key: VitalKey;
	/** Short name, e.g. "LCP" */
	short: string;
	/** Long name, e.g. "Largest Contentful Paint" */
	name: string;
	unit: "ms" | "";
	/** At or under this is good */
	good: number;
	/** Over this is poor */
	poor: number;
	/** Right edge of the gauge */
	max: number;
};

export const VITALS: Record<VitalKey, VitalDef> = {
	lcp: {
		key: "lcp",
		short: "LCP",
		name: "Largest Contentful Paint",
		unit: "ms",
		good: 2500,
		poor: 4000,
		max: 6000,
	},
	inp: {
		key: "inp",
		short: "INP",
		name: "Interaction to Next Paint",
		unit: "ms",
		good: 200,
		poor: 500,
		max: 800,
	},
	cls: {
		key: "cls",
		short: "CLS",
		name: "Cumulative Layout Shift",
		unit: "",
		good: 0.1,
		poor: 0.25,
		max: 0.5,
	},
	fcp: {
		key: "fcp",
		short: "FCP",
		name: "First Contentful Paint",
		unit: "ms",
		good: 1800,
		poor: 3000,
		max: 4500,
	},
	ttfb: {
		key: "ttfb",
		short: "TTFB",
		name: "Time to First Byte",
		unit: "ms",
		good: 800,
		poor: 1800,
		max: 2700,
	},
};

export const VITAL_KEYS = Object.keys(VITALS) as VitalKey[];

export function rate(key: VitalKey, value: number): Rating {
	const { good, poor } = VITALS[key];
	if (value <= good) return "good";
	if (value <= poor) return "needs-improvement";
	return "poor";
}

/** Worst rating wins. */
export function worst(ratings: Rating[]): Rating | null {
	if (ratings.length === 0) return null;
	if (ratings.includes("poor")) return "poor";
	if (ratings.includes("needs-improvement")) return "needs-improvement";
	return "good";
}

export function formatVital(key: VitalKey, value: number): string {
	if (key === "cls") return value.toFixed(2);
	if (value >= 1000) return `${(value / 1000).toFixed(2)} s`;
	return `${Math.round(value)} ms`;
}

/** Position on the gauge, 0..1 */
export function gaugePosition(key: VitalKey, value: number): number {
	return Math.min(1, Math.max(0, value / VITALS[key].max));
}

export const RATING_LABEL: Record<Rating, string> = {
	good: "Good",
	"needs-improvement": "Needs work",
	poor: "Poor",
};

/** Readout colour for each rating (see styles/readout.css) */
export const RATING_TONE: Record<Rating, "good" | "mid" | "poor"> = {
	good: "good",
	"needs-improvement": "mid",
	poor: "poor",
};

export const RATING_SHIELDS: Record<Rating, string> = {
	good: "brightgreen",
	"needs-improvement": "orange",
	poor: "red",
};

/** Lighthouse performance score bands (0-100) */
export function rateScore(score: number): Rating {
	if (score >= 90) return "good";
	if (score >= 50) return "needs-improvement";
	return "poor";
}
