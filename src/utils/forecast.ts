import { URLS } from "@/config";
import { fetchWeatherApi} from "openmeteo";


export default async function forecast({ lat, lon}: {
    lat: number,
    lon: number
}) {

    const params = {
        "latitude": lat,
        "longitude": lon,
        "current": "temperature_2m",
        "hourly": "temperature_2m,precipitation",
        "temperature_unit": "fahrenheit",
    }


    const responses = await fetchWeatherApi(URLS.API.weather, params);
    const response = responses[0];

    return response;
}