/**
 * Turns weather + the sun's position into a mood: a condition, a phase of the
 * day, and a palette the weather page washes its background and glass with.
 * Pure, so it runs the same on the server (first paint) and in the browser.
 */

export type Condition =
	| "clear"
	| "partly"
	| "cloudy"
	| "fog"
	| "drizzle"
	| "rain"
	| "snow"
	| "storm";

export type Phase = "night" | "dawn" | "day" | "golden" | "dusk";

type RGB = [number, number, number];

type Palette = {
	/** Top of the sky wash */
	top: RGB;
	/** Horizon / secondary wash */
	mid: RGB;
	/** Sun or moon glow */
	glow: RGB;
	/** UI accent: rims, highlights, the globe */
	accent: RGB;
};

export type Sky = {
	phase: Phase;
	condition: Condition;
	label: string;
	/** 0–1: how heavy the rain / snow / storm is */
	intensity: number;
	/** 0–1 across the daylight hours, or null at night */
	daylight: number | null;
	/** "r g b" strings, ready for CSS custom properties */
	colors: Record<keyof Palette, string>;
};

/** WMO weather codes, as used by Open-Meteo. */
export function describe(code: number): {
	condition: Condition;
	label: string;
	intensity: number;
} {
	const table: Record<number, [Condition, string, number]> = {
		0: ["clear", "Clear", 0],
		1: ["clear", "Mostly clear", 0],
		2: ["partly", "Partly cloudy", 0],
		3: ["cloudy", "Overcast", 0],
		45: ["fog", "Fog", 0.6],
		48: ["fog", "Freezing fog", 0.7],
		51: ["drizzle", "Light drizzle", 0.3],
		53: ["drizzle", "Drizzle", 0.45],
		55: ["drizzle", "Heavy drizzle", 0.6],
		56: ["drizzle", "Freezing drizzle", 0.4],
		57: ["drizzle", "Freezing drizzle", 0.6],
		61: ["rain", "Light rain", 0.45],
		63: ["rain", "Rain", 0.7],
		65: ["rain", "Heavy rain", 1],
		66: ["rain", "Freezing rain", 0.55],
		67: ["rain", "Freezing rain", 0.85],
		71: ["snow", "Light snow", 0.4],
		73: ["snow", "Snow", 0.65],
		75: ["snow", "Heavy snow", 1],
		77: ["snow", "Snow grains", 0.3],
		80: ["rain", "Light showers", 0.5],
		81: ["rain", "Showers", 0.75],
		82: ["rain", "Violent showers", 1],
		85: ["snow", "Snow showers", 0.5],
		86: ["snow", "Heavy snow showers", 0.9],
		95: ["storm", "Thunderstorm", 0.8],
		96: ["storm", "Thunderstorm, hail", 0.9],
		99: ["storm", "Severe thunderstorm", 1],
	};
	const [condition, label, intensity] = table[code] ?? ["partly", "Mixed", 0];
	return { condition, label, intensity };
}

const TWILIGHT = 45 * 60; // seconds either side of sunrise / sunset
const GOLDEN = 75 * 60; // golden hour before sunset

/** Where the sun is in its day, from sunrise and sunset (unix seconds). */
export function phaseAt(now: number, sunrise: number, sunset: number): Phase {
	if (Math.abs(now - sunrise) <= TWILIGHT) return "dawn";
	if (Math.abs(now - sunset) <= TWILIGHT) return "dusk";
	if (now > sunrise && now < sunset) {
		return sunset - now <= GOLDEN ? "golden" : "day";
	}
	return "night";
}

const PHASES: Record<Phase, Palette> = {
	night: {
		top: [16, 20, 56],
		mid: [48, 40, 110],
		glow: [150, 160, 255],
		accent: [160, 175, 255],
	},
	dawn: {
		top: [70, 60, 150],
		mid: [236, 128, 140],
		glow: [255, 176, 128],
		accent: [255, 172, 160],
	},
	day: {
		top: [40, 112, 214],
		mid: [110, 182, 250],
		glow: [255, 222, 150],
		accent: [130, 200, 255],
	},
	golden: {
		top: [76, 100, 190],
		mid: [250, 168, 92],
		glow: [255, 192, 104],
		accent: [255, 196, 120],
	},
	dusk: {
		top: [56, 42, 124],
		mid: [232, 104, 84],
		glow: [255, 142, 92],
		accent: [255, 152, 116],
	},
};

/** Each condition pulls the clear-sky palette towards its own colours. */
const CONDITIONS: Record<Condition, { palette: Palette; weight: number }> = {
	clear: { palette: PHASES.day, weight: 0 },
	partly: {
		palette: {
			top: [90, 104, 132],
			mid: [140, 150, 172],
			glow: [210, 218, 235],
			accent: [196, 210, 235],
		},
		weight: 0.25,
	},
	cloudy: {
		palette: {
			top: [90, 100, 125],
			mid: [130, 140, 160],
			glow: [200, 210, 230],
			accent: [190, 205, 230],
		},
		weight: 0.72,
	},
	fog: {
		palette: {
			top: [120, 125, 140],
			mid: [160, 165, 178],
			glow: [215, 215, 228],
			accent: [205, 210, 222],
		},
		weight: 0.8,
	},
	drizzle: {
		palette: {
			top: [60, 92, 128],
			mid: [100, 136, 168],
			glow: [140, 190, 230],
			accent: [140, 196, 236],
		},
		weight: 0.62,
	},
	rain: {
		palette: {
			top: [34, 66, 108],
			mid: [70, 112, 152],
			glow: [110, 172, 232],
			accent: [120, 186, 242],
		},
		weight: 0.78,
	},
	snow: {
		palette: {
			top: [150, 175, 215],
			mid: [200, 215, 240],
			glow: [235, 245, 255],
			accent: [210, 230, 255],
		},
		weight: 0.7,
	},
	storm: {
		palette: {
			top: [46, 30, 92],
			mid: [92, 70, 142],
			glow: [178, 142, 255],
			accent: [192, 162, 255],
		},
		weight: 0.86,
	},
};

const mix = (a: RGB, b: RGB, t: number): RGB =>
	a.map((v, i) => Math.round(v + (b[i] - v) * t)) as RGB;

const dim = (c: RGB, k: number): RGB => c.map((v) => Math.round(v * k)) as RGB;

export function skyFor({
	code,
	now,
	sunrise,
	sunset,
}: {
	code: number;
	now: number;
	sunrise: number;
	sunset: number;
}): Sky {
	const { condition, label, intensity } = describe(code);
	const phase = phaseAt(now, sunrise, sunset);
	const base = PHASES[phase];
	const { palette, weight } = CONDITIONS[condition];
	// At night the weather shows as a darker version of itself; accents stay readable.
	const night = phase === "night";
	const target: Palette = night
		? {
				top: dim(palette.top, 0.4),
				mid: dim(palette.mid, 0.5),
				glow: mix(palette.glow, base.glow, 0.4),
				accent: mix(palette.accent, base.accent, 0.4),
			}
		: palette;

	const out = {} as Sky["colors"];
	for (const key of Object.keys(base) as (keyof Palette)[]) {
		out[key] = mix(base[key], target[key], weight).join(" ");
	}

	const daylight =
		now > sunrise && now < sunset ? (now - sunrise) / (sunset - sunrise) : null;

	return { phase, condition, label, intensity, daylight, colors: out };
}
