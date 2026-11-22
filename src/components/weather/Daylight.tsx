"use client";

import { useEffect, useState } from "react";
import { Bar } from "@/components/readout/Bar";

const span = (seconds: number) => {
	const m = Math.max(0, Math.round(seconds / 60));
	const h = Math.floor(m / 60);
	return h ? `${h}h ${m % 60}m` : `${m}m`;
};

/**
 * Local time at the location and how far through the daylight it is.
 * Renders dashes until the browser knows the time; every line keeps its size.
 */
export function Daylight({
	timezone,
	sunrise,
	sunset,
	nextSunrise,
}: Readonly<{
	timezone: string;
	sunrise: number;
	sunset: number;
	nextSunrise: number;
}>) {
	const [now, setNow] = useState<number | null>(null);

	useEffect(() => {
		setNow(Date.now() / 1000);
		const id = setInterval(() => setNow(Date.now() / 1000), 1000);
		return () => clearInterval(id);
	}, []);

	const fmt = (opts: Intl.DateTimeFormatOptions, t: number) =>
		new Intl.DateTimeFormat("en-US", { timeZone: timezone, ...opts }).format(
			t * 1000,
		);
	const clock = (t: number) => fmt({ hour: "numeric", minute: "2-digit" }, t);

	const day = now !== null && now > sunrise && now < sunset;
	const progress =
		now === null
			? null
			: Math.min(1, Math.max(0, (now - sunrise) / (sunset - sunrise)));

	let note = "—";
	if (now !== null) {
		if (day) note = `${span(sunset - now)} of daylight left`;
		else
			note = `Sunrise in ${span((now < sunrise ? sunrise : nextSunrise) - now)}`;
	}

	return (
		<section aria-labelledby="wx-day">
			<h2 id="wx-day" className="ro-h2">
				Daylight
			</h2>
			<dl className="ro-facts">
				<div>
					<dt>Local time</dt>
					<dd>
						{now === null
							? "--:--"
							: fmt(
									{ hour: "numeric", minute: "2-digit", second: "2-digit" },
									now,
								)}
					</dd>
				</div>
				<div>
					<dt>Sunrise</dt>
					<dd>{clock(sunrise)}</dd>
				</div>
				<div>
					<dt>Sunset</dt>
					<dd>{clock(sunset)}</dd>
				</div>
			</dl>
			<div className="wx-daybar" data-tone={day ? "mid" : "none"}>
				<Bar value={progress} cells={24} />
				<p className="ro-muted ro-line">{note}</p>
			</div>
		</section>
	);
}
