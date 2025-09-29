import { URLS } from "@/config";
import { fetchWeatherApi } from "openmeteo";


export default async function forecast({ lat, lon }: {
    lat: number,
    lon: number
}) {
    try {
        const params = {
            "latitude": lat,
            "longitude": lon,
            "current": "temperature_2m",
            "hourly": "temperature_2m,precipitation",
            "temperature_unit": "fahrenheit",
        }

        const responses = await fetchWeatherApi(URLS.API.weather, params);
        const response = responses[0];

        if (!response) {
            throw new Error('No weather data received');
        }

        return response;
    } catch (error) {
        console.error('Failed to fetch weather forecast:', error);
        throw error; // Re-throw to be handled by caller
    }
}