"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { exo } from "@/styles/fonts";
import "@/styles/cards/timecard.css";

function determineTimeGradient(time: Date) {
	const hours = time.getHours();

	if (hours >= 0 && hours < 6) {
		return "morning-gradient";
	} else if (hours >= 6 && hours < 12) {
		return "day-gradient";
	} else if (hours >= 12 && hours < 14) {
		return "afternoon-gradient";
	} else if (hours >= 14 && hours < 18) {
		return "evening-gradient";
	} else {
		return "night-gradient";
	}
}

export function TimeCard() {
	const [time, setTime] = useState<Date | null>(null);

	useEffect(() => {
		setTime(new Date());

		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

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
			className={`time-card hover:scale-110 transition-transform ${timeGradient} ${exo.className} w-full px-0 sm:px-4 py-3 saturate-[0.75]`}
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
