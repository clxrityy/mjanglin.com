import Image from "next/image";
import {
	WiBarometer,
	WiCloud,
	WiDaySunny,
	WiDirectionUp,
	WiHumidity,
	WiRaindrop,
	WiStrongWind,
} from "react-icons/wi";
import { URLS } from "@/config";
import type { Forecast } from "@/lib/forecast";
import type { Sky } from "@/lib/sky";
import type { Place } from "@/lib/weather";
import { weatherIcon } from "./icons";

const deg = (f: number) => `${Math.round(f)}°`;
const toC = (f: number) => Math.round(((f - 32) * 5) / 9);

const PHASE_LABEL: Record<Sky["phase"], string> = {
	night: "Night",
	dawn: "Dawn",
	day: "Daytime",
	golden: "Golden hour",
	dusk: "Dusk",
};

export function NowPanel({
	place,
	weather,
	sky,
}: Readonly<{ place: Place; weather: Forecast; sky: Sky }>) {
	const { current, today } = weather;
	const Icon = weatherIcon(current.code, current.isDay);

	return (
		<section className="wx-panel wx-now glass" aria-label="Current weather">
			<div className="wx-radiance" aria-hidden="true" />
			<div className="wx-now-head">
				<p className="wx-eyebrow">Now · {PHASE_LABEL[sky.phase]}</p>
				{place.countryCode && (
					<Image
						src={`${URLS.API.flags_api}/${place.countryCode}/flat/32.png`}
						alt={`${place.country} flag`}
						width={28}
						height={28}
						className="wx-flag"
					/>
				)}
			</div>

			<div className="wx-now-main">
				<Icon className="wx-now-icon" aria-hidden />
				<div>
					<p className="wx-temp">
						{Math.round(current.temp)}
						<span className="wx-temp-unit">°F</span>
					</p>
					<p className="wx-cond">{sky.label}</p>
				</div>
			</div>

			<div className="wx-now-foot">
				<h1 className="wx-place">
					{place.city}
					{place.region && <span>, {place.region}</span>}
				</h1>
				<p className="wx-sub">
					Feels {deg(current.feelsLike)} · H {deg(today.max)} L {deg(today.min)}{" "}
					· {toC(current.temp)}°C
				</p>
			</div>
		</section>
	);
}

const fmtCoord = (v: number, pos: string, neg: string) =>
	`${Math.abs(v).toFixed(1)}°${v >= 0 ? pos : neg}`;

export function GlobeCaption({ place }: Readonly<{ place: Place }>) {
	return (
		<div className="wx-globe-caption">
			<p className="wx-eyebrow">Somewhere around</p>
			<p className="wx-globe-place">{place.city}</p>
			<p className="wx-sub">
				{[place.region, place.country].filter(Boolean).join(", ")}
			</p>
			<p className="wx-coords">
				{fmtCoord(place.lat, "N", "S")} · {fmtCoord(place.lon, "E", "W")}
			</p>
		</div>
	);
}

/** Next 12 hours: icons, a smooth temperature line, and chance of rain. */
export function HourlyPanel({ weather }: Readonly<{ weather: Forecast }>) {
	const hours = weather.hourly.slice(0, 12);
	if (hours.length < 2) return null;
	const temps = hours.map((h) => h.temp);
	const lo = Math.min(...temps);
	const hi = Math.max(...temps);
	const range = Math.max(4, hi - lo);
	const W = 600;
	const H = 64;
	const step = W / hours.length;
	const ys = hours.map((h) => 8 + (1 - (h.temp - lo) / range) * (H - 16));
	// One point per column, plus a flat lead-in and lead-out to the panel's edges
	const pts = [
		{ x: 0, y: ys[0] },
		...ys.map((y, i) => ({ x: step * (i + 0.5), y })),
		{ x: W, y: ys[ys.length - 1] },
	];
	// Catmull-Rom through the points, as cubic Béziers
	let line = `M ${pts[0].x} ${pts[0].y}`;
	for (let i = 0; i < pts.length - 1; i++) {
		const p0 = pts[i - 1] ?? pts[i];
		const p1 = pts[i];
		const p2 = pts[i + 1];
		const p3 = pts[i + 2] ?? p2;
		const c1x = p1.x + (p2.x - p0.x) / 6;
		const c1y = p1.y + (p2.y - p0.y) / 6;
		const c2x = p2.x - (p3.x - p1.x) / 6;
		const c2y = p2.y - (p3.y - p1.y) / 6;
		line += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x} ${p2.y.toFixed(1)}`;
	}
	const area = `${line} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;
	const hour = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		timeZone: weather.timezone,
	});

	return (
		<section className="wx-panel wx-hours glass" aria-label="Next 12 hours">
			<div className="wx-radiance" aria-hidden="true" />
			<p className="wx-eyebrow">Next 12 hours</p>
			<div className="wx-hours-scroll">
				<div className="wx-hours-inner">
					<ol className="wx-hours-row">
						{hours.map((h, i) => {
							const Icon = weatherIcon(h.code, h.isDay);
							return (
								<li key={h.time} className="wx-hour">
									<span className="wx-hour-time">
										{i === 0 ? "Now" : hour.format(h.time * 1000)}
									</span>
									<Icon className="wx-hour-icon" aria-hidden />
									<span className="wx-hour-temp">{deg(h.temp)}</span>
								</li>
							);
						})}
					</ol>
					<svg
						className="wx-hours-chart"
						viewBox={`0 0 ${W} ${H}`}
						preserveAspectRatio="none"
						aria-hidden="true"
					>
						<defs>
							<linearGradient id="wx-hours-fill" x1="0" x2="0" y1="0" y2="1">
								<stop offset="0" stopColor="rgb(var(--sky-accent) / 0.3)" />
								<stop offset="1" stopColor="rgb(var(--sky-accent) / 0)" />
							</linearGradient>
						</defs>
						<path d={area} fill="url(#wx-hours-fill)" />
						<path d={line} className="wx-hours-line" />
					</svg>
					<ol className="wx-hours-row" aria-label="Chance of precipitation">
						{hours.map((h) => (
							<li
								key={h.time}
								className="wx-hour-pop"
								data-wet={h.pop >= 30 || undefined}
							>
								{h.pop > 0 ? `${h.pop}%` : " "}
							</li>
						))}
					</ol>
				</div>
			</div>
		</section>
	);
}

const COMPASS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export function DetailsPanel({ weather }: Readonly<{ weather: Forecast }>) {
	const { current, today } = weather;
	const items = [
		{
			icon: WiHumidity,
			label: "Humidity",
			value: `${Math.round(current.humidity)}%`,
		},
		{
			icon: WiStrongWind,
			label: "Wind",
			value: `${Math.round(current.windSpeed)} mph`,
			extra: (
				<span
					className="wx-wind"
					title={`From the ${COMPASS[Math.round(current.windDirection / 45) % 8]}`}
				>
					<WiDirectionUp
						aria-hidden
						style={{ transform: `rotate(${current.windDirection + 180}deg)` }}
					/>
					{COMPASS[Math.round(current.windDirection / 45) % 8]}
				</span>
			),
		},
		{
			icon: WiCloud,
			label: "Clouds",
			value: `${Math.round(current.cloudCover)}%`,
		},
		{
			icon: WiRaindrop,
			label: "Rain today",
			value: `${Math.round(today.pop)}%`,
		},
		{ icon: WiDaySunny, label: "UV max", value: today.uv.toFixed(0) },
		{
			icon: WiBarometer,
			label: "Pressure",
			value: `${Math.round(current.pressure)} hPa`,
		},
	];

	return (
		<section className="wx-panel wx-info glass" aria-label="Conditions">
			<div className="wx-radiance" aria-hidden="true" />
			<p className="wx-eyebrow">Conditions</p>
			<dl className="wx-stats">
				{items.map(({ icon: Icon, label, value, extra }) => (
					<div key={label} className="wx-stat">
						<dt>
							<Icon aria-hidden className="wx-stat-icon" />
							{label}
						</dt>
						<dd>
							{value}
							{extra}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
