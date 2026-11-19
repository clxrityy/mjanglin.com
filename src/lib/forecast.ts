import { URLS } from "@/config";

/** What the weather page needs from Open-Meteo, in °F / mph / inches. Times are unix seconds. */
export type Forecast = {
	timezone: string;
	current: {
		time: number;
		temp: number;
		feelsLike: number;
		humidity: number;
		isDay: boolean;
		code: number;
		cloudCover: number;
		windSpeed: number;
		windDirection: number;
		pressure: number;
	};
	/** The next 24 hours, starting with the current hour. */
	hourly: {
		time: number;
		temp: number;
		pop: number;
		code: number;
		isDay: boolean;
	}[];
	today: {
		sunrise: number;
		sunset: number;
		max: number;
		min: number;
		uv: number;
		pop: number;
	};
	/** Tomorrow's sunrise, for "sunrise in …" after dark. */
	nextSunrise: number;
};

type Raw = {
	timezone: string;
	current: Record<string, number>;
	hourly: Record<string, number[]>;
	daily: Record<string, number[]>;
};

export default async function forecast({
	lat,
	lon,
}: {
	lat: number;
	lon: number;
}): Promise<Forecast> {
	const params = new URLSearchParams({
		// Two decimals (~1 km) is plenty, and lets nearby visitors share a cached response.
		latitude: lat.toFixed(2),
		longitude: lon.toFixed(2),
		current:
			"temperature_2m,apparent_temperature,relative_humidity_2m,is_day,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,pressure_msl",
		hourly: "temperature_2m,precipitation_probability,weather_code,is_day",
		daily:
			"sunrise,sunset,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_probability_max",
		temperature_unit: "fahrenheit",
		wind_speed_unit: "mph",
		precipitation_unit: "inch",
		timezone: "auto",
		timeformat: "unixtime",
		forecast_days: "3",
	});

	const res = await fetch(`${URLS.API.weather}?${params}`, {
		next: { revalidate: 600 },
	});
	if (!res.ok) throw new Error(`Open-Meteo responded ${res.status}`);
	const raw = (await res.json()) as Raw;
	const { current: c, hourly: h, daily: d } = raw;

	// The hourly slot we're in now (by the clock: the "current" reading lags a little)
	const now = Date.now() / 1000;
	const next = h.time.findIndex((t) => t > now);
	const start = Math.max(0, (next === -1 ? h.time.length : next) - 1);
	const hourly = h.time.slice(start, start + 24).map((time, i) => ({
		time,
		// The first slot is "now", so show the live reading
		temp: i === 0 ? c.temperature_2m : h.temperature_2m[start + i],
		pop: h.precipitation_probability[start + i] ?? 0,
		code: h.weather_code[start + i],
		isDay: h.is_day[start + i] === 1,
	}));

	return {
		timezone: raw.timezone,
		current: {
			time: c.time,
			temp: c.temperature_2m,
			feelsLike: c.apparent_temperature,
			humidity: c.relative_humidity_2m,
			isDay: c.is_day === 1,
			code: c.weather_code,
			cloudCover: c.cloud_cover,
			windSpeed: c.wind_speed_10m,
			windDirection: c.wind_direction_10m,
			pressure: c.pressure_msl,
		},
		hourly,
		today: {
			sunrise: d.sunrise[0],
			sunset: d.sunset[0],
			max: d.temperature_2m_max[0],
			min: d.temperature_2m_min[0],
			uv: d.uv_index_max[0],
			pop: d.precipitation_probability_max[0] ?? 0,
		},
		nextSunrise: d.sunrise[1],
	};
}
