/** Rough part of the day from the local hour, for tinting the time cards. */
export type Daypart = "night" | "dawn" | "morning" | "day" | "dusk";

export function daypartOf(hours: number): Daypart {
	if (hours < 5) return "night";
	if (hours < 8) return "dawn";
	if (hours < 12) return "morning";
	if (hours < 17) return "day";
	if (hours < 20) return "dusk";
	return "night";
}
