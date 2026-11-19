"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Daypart, daypartOf } from "@/lib/daypart";
import { exo } from "@/styles/fonts";
import "@/styles/cards/timecard.css";

/** Current time, ticking every second. Null until mounted (avoids a hydration mismatch). */
function useNow() {
	const [time, setTime] = useState<Date | null>(null);

	useEffect(() => {
		setTime(new Date());
		const interval = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	return time;
}

const LABELS: Record<Daypart, string> = {
	night: "Night",
	dawn: "Dawn",
	morning: "Morning",
	day: "Afternoon",
	dusk: "Evening",
};

/** A small glass clock face with real hands. */
function ClockFace({ time }: Readonly<{ time: Date | null }>) {
	const h = time ? time.getHours() % 12 : 10;
	const m = time ? time.getMinutes() : 10;
	const s = time ? time.getSeconds() : 0;
	const hourDeg = (h + m / 60) * 30;
	const minuteDeg = (m + s / 60) * 6;

	return (
		<span className="clock-face" aria-hidden="true">
			<span
				className="clock-hand clock-hand-hour"
				style={{ transform: `rotate(${hourDeg}deg)` }}
			/>
			<span
				className="clock-hand clock-hand-minute"
				style={{ transform: `rotate(${minuteDeg}deg)` }}
			/>
			<span className="clock-pin" />
		</span>
	);
}

export function TimeCard() {
	const time = useNow();
	const part = time ? daypartOf(time.getHours()) : "night";

	const parts = time
		? new Intl.DateTimeFormat("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			}).formatToParts(time)
		: [];
	const hours = parts.find((p) => p.type === "hour")?.value ?? "--";
	const minutes = parts.find((p) => p.type === "minute")?.value ?? "--";
	const dayPeriod =
		parts.find((p) => p.type === "dayPeriod")?.value?.toUpperCase() ?? "";

	const date = time
		? new Intl.DateTimeFormat("en-US", {
				weekday: "long",
				month: "short",
				day: "numeric",
			}).format(time)
		: " ";

	return (
		<Link
			prefetch={false}
			href="/weather"
			data-part={part}
			data-ready={time ? "" : undefined}
			className={`time-card glass ${exo.className}`}
			aria-label={
				time
					? `${hours}:${minutes} ${dayPeriod}, ${date}. Open weather`
					: "Open weather"
			}
		>
			<span className="time-glow" aria-hidden="true" />
			<span className="time-top">
				<span className="time-part">{LABELS[part]}</span>
				<ClockFace time={time} />
			</span>
			<span className="time-text">
				<span className="time-hm">
					{hours}
					<span className="time-colon">:</span>
					{minutes}
				</span>
				<span className="time-period">{dayPeriod}</span>
			</span>
			<span className="time-date">
				<time dateTime={time?.toISOString()}>{date}</time>
			</span>
		</Link>
	);
}

/** Compact version for the phone home screen: tap to open the weather page. */
export function MiniTimeCard() {
	const time = useNow();
	const part = time ? daypartOf(time.getHours()) : "night";
	const label = time
		? new Intl.DateTimeFormat("en-US", {
				hour: "numeric",
				minute: "2-digit",
				hour12: true,
			}).format(time)
		: "--:--";
	const date = time
		? new Intl.DateTimeFormat("en-US", {
				month: "short",
				day: "numeric",
			}).format(time)
		: " ";

	return (
		<Link
			prefetch={false}
			href="/weather"
			data-part={part}
			className={`time-mini glass ${exo.className}`}
			aria-label={`Time ${label}. Open weather`}
		>
			<span className="time-glow" aria-hidden="true" />
			<ClockFace time={time} />
			<span className="time-mini-text">
				<span className="time-mini-time">{label}</span>
				<span className="time-mini-date">{date} · weather</span>
			</span>
		</Link>
	);
}
