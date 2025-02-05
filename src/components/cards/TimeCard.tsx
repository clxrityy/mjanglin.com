"use client";

import "@/styles/css/timecard.css";
import { exo } from "@/styles/fonts";
import Link from "next/link";
import { useEffect, useState } from "react";

function determineTimeGradient(time: Date) {
    const hours = time.getUTCHours();

    if (hours >= 0 && hours < 6) {
        return "morning-gradient";
    }
    else if (hours >= 6 && hours < 12) {
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
    const [hours, setHours] = useState<string>("");
    const [minutes, setMinutes] = useState<string>("");
    const [amOrPm, setAmOrPm] = useState<string>("");

    useEffect(() => {
        const interval = setInterval(() => {
            tick();
        }, 1000);

        setHours(getHours());
        setMinutes(getMinutes());
        setAmOrPm(getAmOrPm());

        return () => {
            clearInterval(interval);
        }
    })

    function tick() {
        setTime(new Date());
    }

    function getHours() {
        return time.toLocaleTimeString().split(":")[0];
    }

    function getMinutes() {
        return time.toLocaleTimeString().split(":")[1];
    }

    function getDateString() {
        return time.toLocaleDateString();
    }

    function getAmOrPm() {
        return time.toLocaleTimeString().split(" ")[1];
    }


    return (
        /* From Uiverse.io by akshat-patel28 */
        <Link href={`/weather`} className={`time-card hover:scale-110 transition-transform ${determineTimeGradient(time)} ${exo.className} w-full`}>
            <p className="time-text">
                <span>{`${hours} : ${minutes}`}</span>
                <span className="time-sub-text">{amOrPm}</span>
            </p>
            <p className="day-text">{getDateString()}</p>
            <div className="clock-icon py-2 px-2 my-16">
                <div className="clock-container">
                    <div className="clock" />
                </div>
            </div>
            {/* <Link href={`/weather`} className="absolute bottom-0 right-0 px-1 py-1 drop-shadow-md hover:scale-105 transition-all ease-linear hover:text-blue-400 focus:text-blue-500 text-inherit">
                <TiWeatherCloudy size={40} />
            </Link> */}
        </Link>
    )
}