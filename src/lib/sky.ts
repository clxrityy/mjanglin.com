/** Weather conditions from WMO codes, as used by Open-Meteo. */

export type Condition =
	| "clear"
	| "partly"
	| "cloudy"
	| "fog"
	| "drizzle"
	| "rain"
	| "snow"
	| "storm";

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
