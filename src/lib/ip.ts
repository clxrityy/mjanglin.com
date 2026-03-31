import { URLS } from "../config";
import type { IpGeolocation } from "../utils/types";

export async function fetchIp(): Promise<string> {
	const { ip } = await fetch(`${URLS.API.ipify}?format=json`).then((res) =>
		res.json(),
	);

	return ip;
}

export async function getLocationByIp(
	ip: string,
): Promise<IpGeolocation | undefined> {
	try {
		const {
			query,
			status,
			country,
			countryCode,
			region,
			regionName,
			city,
			zip,
			lat,
			lon,
			timezone,
			isp,
			org,
			as,
		} = await fetch(`${URLS.API.ip_api}${ip}`).then((res) => res.json());

		return {
			query,
			status,
			country,
			countryCode,
			region,
			regionName,
			city,
			zip,
			lat,
			lon,
			timezone,
			isp,
			org,
			as,
		};
	} catch (e) {
		console.error(e);
		return undefined;
	}
}
