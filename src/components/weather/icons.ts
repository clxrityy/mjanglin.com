import type { IconType } from "react-icons";
import {
	WiCloud,
	WiCloudy,
	WiDayCloudy,
	WiDayFog,
	WiDaySunny,
	WiHail,
	WiNightAltCloudy,
	WiNightClear,
	WiNightFog,
	WiRain,
	WiShowers,
	WiSleet,
	WiSnow,
	WiSprinkle,
	WiThunderstorm,
} from "react-icons/wi";

/** An icon for a WMO weather code. */
export function weatherIcon(code: number, isDay: boolean): IconType {
	if (code <= 1) return isDay ? WiDaySunny : WiNightClear;
	if (code === 2) return isDay ? WiDayCloudy : WiNightAltCloudy;
	if (code === 3) return WiCloudy;
	if (code === 45 || code === 48) return isDay ? WiDayFog : WiNightFog;
	if (code >= 51 && code <= 55) return WiSprinkle;
	if (code === 56 || code === 57 || code === 66 || code === 67) return WiSleet;
	if (code >= 61 && code <= 65) return WiRain;
	if (code >= 71 && code <= 77) return WiSnow;
	if (code >= 80 && code <= 82) return WiShowers;
	if (code === 85 || code === 86) return WiSnow;
	if (code === 95) return WiThunderstorm;
	if (code === 96 || code === 99) return WiHail;
	return WiCloud;
}
