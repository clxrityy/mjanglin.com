import { Daylight } from "@/components/weather/Daylight";
import { Conditions, Hourly, Now } from "@/components/weather/Readout";
import { getForecast, resolvePlace } from "@/lib/weather";

const coord = (v: number, pos: string, neg: string) =>
	`${Math.abs(v).toFixed(1)}°${v >= 0 ? pos : neg}`;

export default async function Page() {
	const place = await resolvePlace();
	const weather = place ? await getForecast(place) : null;

	const where = place
		? [place.city, place.region, place.country].filter(Boolean).join(", ")
		: null;

	return (
		<div className="ro">
			<header>
				<h1 className="ro-h1">Weather</h1>
				<p className="ro-muted ro-line" title={where ?? undefined}>
					{place && where
						? `${where} · ${coord(place.lat, "N", "S")} ${coord(place.lon, "E", "W")}`
						: "Couldn't work out your location from this connection."}
				</p>
			</header>

			{place && weather ? (
				<>
					<Now weather={weather} />
					<Hourly weather={weather} />
					<Daylight
						timezone={weather.timezone}
						sunrise={weather.today.sunrise}
						sunset={weather.today.sunset}
						nextSunrise={weather.nextSunrise}
					/>
					<Conditions weather={weather} />
				</>
			) : (
				place && (
					<p className="ro-muted">
						No forecast for {place.city} right now. Try again in a bit.
					</p>
				)
			)}
		</div>
	);
}
