"use client";

import { useEffect, useState } from "react";
import { WiSunrise, WiSunset } from "react-icons/wi";

type Props = {
	timezone: string;
	sunrise: number;
	sunset: number;
	nextSunrise: number;
};

const ARC = { cx: 110, cy: 84, r: 74 };

const point = (f: number) => {
	const angle = Math.PI * (1 - f);
	return {
		x: ARC.cx + ARC.r * Math.cos(angle),
		y: ARC.cy - ARC.r * Math.sin(angle),
	};
};

const span = (seconds: number) => {
	const m = Math.max(0, Math.round(seconds / 60));
	const h = Math.floor(m / 60);
	return h ? `${h}h ${m % 60}m` : `${m}m`;
};

/** Local time at the location, and where the sun is on its way across the sky. */
export function SunPanel({
	timezone,
	sunrise,
	sunset,
	nextSunrise,
}: Readonly<Props>) {
	const [now, setNow] = useState<number | null>(null);

	useEffect(() => {
		setNow(Date.now());
		const id = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(id);
	}, []);

	const fmt = (opts: Intl.DateTimeFormatOptions, t: number) =>
		new Intl.DateTimeFormat("en-US", { timeZone: timezone, ...opts }).format(
			t * 1000,
		);
	const clock = (t: number) => fmt({ hour: "numeric", minute: "2-digit" }, t);

	const t = now === null ? null : now / 1000;
	const day = t !== null && t > sunrise && t < sunset;
	const f =
		t === null
			? 0
			: day
				? (t - sunrise) / (sunset - sunrise)
				: t >= sunset
					? 1
					: 0;
	const sun = point(f);
	const parts =
		t === null
			? []
			: new Intl.DateTimeFormat("en-US", {
					timeZone: timezone,
					hour: "numeric",
					minute: "2-digit",
				}).formatToParts(t * 1000);
	const hm = parts
		.filter(
			(p) => p.type === "hour" || p.type === "minute" || p.type === "literal",
		)
		.map((p) => p.value)
		.join("")
		.trim();
	const period = parts.find((p) => p.type === "dayPeriod")?.value ?? "";

	let note = " ";
	if (t !== null) {
		if (day) note = `${span(sunset - t)} of daylight left`;
		else if (t < sunrise) note = `Sunrise in ${span(sunrise - t)}`;
		else note = `Sunrise in ${span(nextSunrise - t)}`;
	}

	const place = timezone.split("/").pop()?.replaceAll("_", " ") ?? timezone;
	const traveled = `M ${ARC.cx - ARC.r} ${ARC.cy} A ${ARC.r} ${ARC.r} 0 0 1 ${sun.x.toFixed(2)} ${sun.y.toFixed(2)}`;

	return (
		<section
			className="wx-panel wx-sun glass"
			aria-label="Local time and daylight"
		>
			<div className="wx-radiance" aria-hidden="true" />
			<p className="wx-eyebrow">Local time · {place}</p>
			<p className="wx-clock">
				<span>{hm || "--:--"}</span>
				<span className="wx-clock-period">{period}</span>
			</p>
			<p className="wx-sub">
				{t === null
					? " "
					: fmt({ weekday: "long", month: "short", day: "numeric" }, t)}
			</p>

			<svg className="wx-arc" viewBox="0 0 220 96" aria-hidden="true">
				<defs>
					<linearGradient id="wx-arc-done" x1="0" x2="1">
						<stop offset="0" stopColor="rgb(var(--sky-glow) / 0.15)" />
						<stop offset="1" stopColor="rgb(var(--sky-glow) / 0.9)" />
					</linearGradient>
					<radialGradient id="wx-sun-halo">
						<stop offset="0" stopColor="rgb(var(--sky-glow) / 0.8)" />
						<stop offset="1" stopColor="rgb(var(--sky-glow) / 0)" />
					</radialGradient>
				</defs>
				<line
					x1="14"
					x2="206"
					y1={ARC.cy}
					y2={ARC.cy}
					className="wx-arc-horizon"
				/>
				<path
					d={`M ${ARC.cx - ARC.r} ${ARC.cy} A ${ARC.r} ${ARC.r} 0 0 1 ${ARC.cx + ARC.r} ${ARC.cy}`}
					className="wx-arc-track"
				/>
				{t !== null && f > 0 && (
					<path
						d={traveled}
						className="wx-arc-done"
						stroke="url(#wx-arc-done)"
					/>
				)}
				{t !== null && day && (
					<g>
						<circle cx={sun.x} cy={sun.y} r="14" fill="url(#wx-sun-halo)" />
						<circle cx={sun.x} cy={sun.y} r="4.5" className="wx-arc-sun" />
					</g>
				)}
			</svg>

			<div className="wx-sun-times">
				<span>
					<WiSunrise aria-hidden size={22} />
					{clock(sunrise)}
				</span>
				<span className="wx-sun-note">{note}</span>
				<span>
					{clock(sunset)}
					<WiSunset aria-hidden size={22} />
				</span>
			</div>
		</section>
	);
}
