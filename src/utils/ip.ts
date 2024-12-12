import axios from 'axios';
import { URLS } from '../config';
import { IpGeolocation } from './types';


export async function fetchIp(): Promise<string> {
    const { ip } = await axios.get<{ip: string}>(`${URLS.API.ipify}?format=json`).then(res => res.data);

    return ip;
}

export async function getLocationByIp(ip: string): Promise<IpGeolocation | undefined>{
    try {
        const { query, status, country, countryCode, region, regionName, city, zip, lat, lon, timezone, isp, org, as } = await axios.get<IpGeolocation>(`${URLS.API.ip_api}${ip}`).then(res => res.data);

        return { query, status, country, countryCode, region, regionName, city, zip, lat, lon, timezone, isp, org, as };
    } catch (e: any) {
        console.error(e);
        return undefined;
    }
}