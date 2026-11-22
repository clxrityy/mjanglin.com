import { Bar } from "@/components/readout/Bar";
import type { Forecast } from "@/lib/forecast";
import { describe } from "@/lib/sky";

/** Readout colour for a temperature in °F (see styles/readout.css) */
export function tempTone(f: number) {
	if (f < 50) return "cold";
	if (f <= 82) return "good";
	if (f <= 92) return "mid";
	return "poor";
}

const deg = (f: number) => `${Math.round(f)}°`;
const toC = (f: number) => Math.round(((f - 32) * 5) / 9);
/** Bars share one fixed 0-100 °F scale, so they compare across hours and days */
const tempScale = (f: number) => f / 100;

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export function Now({ weather }: Readonly<{ weather: Forecast }>) {
	const { current, today } = weather;
	return (
		<section aria-labelledby="wx-now">
			<h2 id="wx-now" className="ro-h2">
				Now
			</h2>
			<p className="wx-now" data-tone={tempTone(current.temp)}>
				<span className="ro-tone wx-temp">{deg(current.temp)}F</span>
				<span className="ro-line">{describe(current.code).label}</span>
			</p>
			<dl className="ro-facts">
				<div>
					<dt>Feels like</dt>
					<dd>{deg(current.feelsLike)}</dd>
				</div>
				<div>
					<dt>High / low</dt>
					<dd>
						{deg(today.max)} / {deg(today.min)}
					</dd>
				</div>
				<div>
					<dt>Celsius</dt>
					<dd>{toC(current.temp)}°C</dd>
				</div>
			</dl>
		</section>
	);
}

/** Next 12 hours: temperature on a bar, and chance of rain. */
export function Hourly({ weather }: Readonly<{ weather: Forecast }>) {
	const hours = weather.hourly.slice(0, 12);
	const hour = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: weather.timezone,
	});

	return (
		<section aria-labelledby="wx-hours">
			<h2 id="wx-hours" className="ro-h2">
				Next 12 hours
			</h2>
			<table className="ro-table">
				<colgroup>
					<col className="wx-col-time" />
					<col className="wx-col-temp" />
					<col />
					<col className="wx-col-rain" />
				</colgroup>
				<thead className="sr-only">
					<tr>
						<th>Time</th>
						<th>Temperature</th>
						<th>Scale</th>
						<th>Chance of rain</th>
					</tr>
				</thead>
				<tbody>
					{hours.map((h, i) => (
						<tr key={h.time} data-tone={tempTone(h.temp)}>
							<th scope="row">
								{i === 0 ? "Now" : hour.format(h.time * 1000)}
							</th>
							<td title={describe(h.code).label}>{deg(h.temp)}</td>
							<td>
								<Bar value={tempScale(h.temp)} />
							</td>
							<td
								className={h.pop >= 30 ? "ro-tone" : "ro-muted"}
								data-tone={h.pop >= 30 ? "cold" : undefined}
							>
								{h.pop}%
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

export function Conditions({ weather }: Readonly<{ weather: Forecast }>) {
	const { current, today } = weather;
	const items: [string, string][] = [
		["Humidity", `${Math.round(current.humidity)}%`],
		[
			"Wind",
			`${Math.round(current.windSpeed)} mph ${COMPASS[Math.round(current.windDirection / 45) % 8]}`,
		],
		["Clouds", `${Math.round(current.cloudCover)}%`],
		["Rain today", `${Math.round(today.pop)}%`],
		["UV max", today.uv.toFixed(0)],
		["Pressure", `${Math.round(current.pressure)} hPa`],
	];

	return (
		<section aria-labelledby="wx-cond">
			<h2 id="wx-cond" className="ro-h2">
				Conditions
			</h2>
			<dl className="ro-facts">
				{items.map(([label, value]) => (
					<div key={label}>
						<dt>{label}</dt>
						<dd>{value}</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
