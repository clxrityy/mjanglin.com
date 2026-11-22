"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Bar } from "@/components/readout/Bar";
import { type Daypart, daypartOf } from "@/lib/daypart";
import "@/styles/readout.css";
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

/** How far through the day it is, 0..1 */
const dayProgress = (t: Date) => (t.getHours() * 60 + t.getMinutes()) / 1440;

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
		parts.find((p) => p.type === "dayPeriod")?.value?.toLowerCase() ?? "";

	const date = time
		? new Intl.DateTimeFormat("en-US", {
				weekday: "short",
				month: "short",
				day: "numeric",
			}).format(time)
		: " ";

	return (
		<Link
			prefetch={false}
			href="/weather"
			data-part={part}
			className="time-card"
			aria-label={
				time
					? `${hours}:${minutes} ${dayPeriod}, ${date}. Open weather`
					: "Open weather"
			}
		>
			<span className="time-top">
				<span>{time ? LABELS[part] : " "}</span>
				<span className="time-go">weather →</span>
			</span>
			<span className="time-text">
				<span className="time-hm">
					{hours}:{minutes}
				</span>
				<span className="time-period">{dayPeriod}</span>
			</span>
			<span className="time-foot">
				<Bar value={time ? dayProgress(time) : null} cells={24} />
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
			})
				.format(time)
				.toLowerCase()
		: "--:--";
	const date = time
		? new Intl.DateTimeFormat("en-US", {
				month: "short",
				day: "numeric",
			}).format(time)
		: " ";

	return (
		<Link
			prefetch={false}
			href="/weather"
			data-part={part}
			className="time-mini"
			aria-label={`Time ${label}. Open weather`}
		>
			<span className="time-mini-time">{label}</span>
			<span className="time-mini-date">{date} · weather →</span>
		</Link>
	);
}
