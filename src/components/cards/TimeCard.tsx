"use client";
import Link from "next/link";
import { useCallback, useLayoutEffect, useState } from "react";
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
	const [time, setTime] = useState<Date>(new Date());

	useLayoutEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	const getHours = () => time.toLocaleTimeString().split(":")[0];
	const getMinutes = () => time.toLocaleTimeString().split(":")[1];
	const getAmOrPm = () => time.toLocaleTimeString().split(" ")[1];

	const getDateString = useCallback(() => {
		return time.toLocaleDateString("en-US", {});
	}, [time]);

	return (
		<Link
			prefetch={false}
			href={`/weather`}
			className={`time-card hover:scale-110 transition-transform ${determineTimeGradient(time)} ${exo.className} w-full px-0 sm:px-4 py-3 saturate-[0.75]`}
		>
			<p className="time-text">
				<span>{`${getHours()} : ${getMinutes()}`}</span>
				<span className="time-sub-text hidden md:block">{getAmOrPm()}</span>
			</p>
			<p className="day-text">{getDateString()}</p>
			<div className="clock-icon mt-1 px-2 my-16 hidden lg:block">
				<div className="clock-container">
					<div className="clock" />
				</div>
			</div>
			<time dateTime={time.toString()} suppressHydrationWarning />
		</Link>
	);
}
