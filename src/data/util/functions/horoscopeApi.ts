import { CONFIG } from "@/config";
import axios from "axios";

/**
 * 
 * @see https://github.com/sandipbgt/theastrologer-api
 */

export async function horoscopeApi(sign: string) {
    const sunSign = sign.toLowerCase();

    const response = await fetch(`${CONFIG.URLS.HOROSCOPE_API_BASE_URL}/horoscope/${sunSign}/today`).then(res => res.json());

    return response;
}