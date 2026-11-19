import { headers } from "next/headers";
import { cache } from "react";
import forecast, { type Forecast } from "./forecast";
import { fetchIp, getLocationByIp } from "./ip";

export type Place = {
	city: string;
	/** State / province, as a name or a short code */
	region: string;
	country: string;
	countryCode: string;
	lat: number;
	lon: number;
};

const decode = (value: string | null) => {
	if (!value) return "";
	try {
		return decodeURIComponent(value);
	} catch {
		return value;
	}
};

const countryName = (code: string) => {
	try {
		return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? code;
	} catch {
		return code;
	}
};

/**
 * Where the visitor is, roughly. On Vercel the edge already knows (geo headers);
 * elsewhere (local dev) fall back to looking up this machine's public IP.
 * Cached per request, so metadata and the page share one lookup.
 */
export const resolvePlace = cache(async (): Promise<Place | null> => {
	const h = await headers();
	const lat = Number.parseFloat(h.get("x-vercel-ip-latitude") ?? "");
	const lon = Number.parseFloat(h.get("x-vercel-ip-longitude") ?? "");
	const countryCode = h.get("x-vercel-ip-country") ?? "";

	if (Number.isFinite(lat) && Number.isFinite(lon) && countryCode) {
		return {
			city: decode(h.get("x-vercel-ip-city")) || countryName(countryCode),
			region: decode(h.get("x-vercel-ip-country-region")),
			country: countryName(countryCode),
			countryCode,
			lat,
			lon,
		};
	}

	try {
		const location = await getLocationByIp(await fetchIp());
		if (!location || !Number.isFinite(location.lat)) return null;
		return {
			city: location.city,
			region: location.regionName,
			country: location.country,
			countryCode: location.countryCode,
			lat: location.lat,
			lon: location.lon,
		};
	} catch (error) {
		console.error("Unable to resolve location:", error);
		return null;
	}
});

export const getForecast = cache(
	async (place: Place): Promise<Forecast | null> => {
		try {
			return await forecast(place);
		} catch (error) {
			console.error("Failed to fetch weather forecast:", error);
			return null;
		}
	},
);
