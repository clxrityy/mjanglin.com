"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { exo } from "@/styles/fonts";
import "@/styles/cards/timecard.css";

function determineTimeGradient(time: Date) {
	const hours = time.getHours();

	switch (true) {
		case hours >= 0 && hours <= 4:
			return "night-gradient";
		case hours >= 5 && hours < 12:
			return "morning-gradient";
		case hours >= 12 && hours < 15:
			return "afternoon-gradient";
		case hours >= 15 && hours < 18:
			return "evening-gradient";
		default:
			return "night-gradient";
	}
}

/** Current time, ticking every second. Null until mounted (avoids a hydration mismatch). */
function useNow() {
	const [time, setTime] = useState<Date | null>(null);

	useEffect(() => {
		setTime(new Date());

		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return time;
}

export function TimeCard() {
	const time = useNow();

	const timeParts = useMemo(() => {
		if (!time) {
			return {
				hours: "--",
				minutes: "--",
				dayPeriod: "--",
			};
		}

		const parts = new Intl.DateTimeFormat("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true,
		}).formatToParts(time);

		return {
			hours: parts.find((part) => part.type === "hour")?.value ?? "--",
			minutes: parts.find((part) => part.type === "minute")?.value ?? "--",
			dayPeriod:
				parts.find((part) => part.type === "dayPeriod")?.value?.toUpperCase() ??
				"--",
		};
	}, [time]);

	const dateString = time
		? new Intl.DateTimeFormat("en-US").format(time)
		: "--/--/----";

	const timeGradient = time ? determineTimeGradient(time) : "night-gradient";
	const isoDateTime = time ? time.toISOString() : undefined;

	return (
		<Link
			prefetch={false}
			href={`/weather`}
			className={`time-card hover:scale-105 ${timeGradient} ${exo.className} w-full px-0 sm:px-4 py-3 saturate-[0.75]`}
		>
			<p className="time-text">
				<span>{`${timeParts.hours} : ${timeParts.minutes}`}</span>
				<span className="time-sub-text hidden md:block">
					{timeParts.dayPeriod}
				</span>
			</p>
			<p className="day-text">{dateString}</p>
			<div className="clock-icon mt-1 px-2 my-16 hidden lg:block">
				<div className="clock-container">
					<div className="clock" />
				</div>
			</div>
			<time dateTime={isoDateTime} className="sr-only">
				{dateString}
			</time>
		</Link>
	);
}

/** Compact version for the phone home screen: tap to open the weather page. */
export function MiniTimeCard() {
	const time = useNow();
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
		: "\u00a0";
	const timeGradient = time ? determineTimeGradient(time) : "night-gradient";

	return (
		<Link
			prefetch={false}
			href="/weather"
			className={`time-mini ${timeGradient} ${exo.className}`}
			aria-label={`Time ${label}. Open weather`}
		>
			<span className="time-mini-clock" aria-hidden="true">
				<span className="clock-container">
					<span className="clock" />
				</span>
			</span>
			<span className="time-mini-text">
				<span className="time-mini-time">{label}</span>
				<span className="time-mini-date">{date} · weather</span>
			</span>
		</Link>
	);
}
