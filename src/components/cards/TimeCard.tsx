"use client";

import "@/styles/timecard.css";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export function TimeCard() {
    const [time, setTime] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            tick();
        }, 1000);

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
        <div className="time-card">
            <p className="time-text">
                <span>{`${getHours()} : ${getMinutes()}`}</span>
                <span className="time-sub-text">{getAmOrPm()}</span></p>
            <p className="day-text">{getDateString()}</p>
            <Clock className="clock-icon" />
        </div>
    )
}