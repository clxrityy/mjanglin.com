"use client";
import "@/styles/clock.css";
import { useState } from "react";

export default function DigitalClock() {

    const [time, setTime] = useState<Date>(new Date());

    setInterval(() => {
        tick();
    }, 1000);

    function tick() {
        setTime(new Date());
    }

    function getHours() {
        return time.toLocaleTimeString().split(":")[0];
    }

    function getMinutes() {
        return time.toLocaleTimeString().split(":")[1];
    }

    function getSeconds() {
        return time.toLocaleTimeString().split(":")[2].split(" ")[0];
    }

    function getAmPm() {
        return time.toLocaleTimeString().split(" ")[1];
    }

    return (
        <div className="clock-wrapper">
            <div className="clock">
                <div className="hour">
                    {getHours()}
                </div>
                <span>
                    :
                </span>
                <div className="minute">
                    {getMinutes()}
                </div>
                <span>
                    :
                </span>
                <div className="second">
                    {getSeconds()}
                </div>
                <div className="ampm">
                    {getAmPm()}
                </div>
            </div> 
        </div>
    )
}

