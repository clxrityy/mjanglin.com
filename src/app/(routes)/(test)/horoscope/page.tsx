"use client";

import { CONFIG } from "@/config";
import { useEffect, useState } from "react";

export default function Page() {
    
    const [data, setData] = useState<any>();

    useEffect(() => {
        fetch(`${CONFIG.URLS.HOROSCOPE_API_BASE_URL}/horoscope/aries/today`).then((res) => setData(res.json()))
    }, [data, CONFIG.URLS.HOROSCOPE_API_BASE_URL]);

    console.log(data)

    return (
        <div>
            <h1>{data || "hey"}</h1>
        </div>
    )
}