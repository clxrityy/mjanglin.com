/**
 * 
 * @see https://holidayapi.com/docs
 * @param country - The 2-letter country code for the country you want to get holidays for.
 * @param year - The year you want to get holidays for.
 * @param month - The month you want to get holidays for.
 * @param day - The day you want to get holidays for.
 * @param upcoming - If true, only holidays that are in the future will be returned. (month and day are required)
 * 
 * @returns An array of holiday objects.
 */

import axios from "axios";

export default async function holidayApi({ country = "US", year = 2023, month, day, upcoming }: { country: string, year: number, month?: number, day?: number, search?: string, upcoming?: boolean }): Promise<Holiday[]> {

    if (upcoming && (!month || !day)) {
        throw new Error('month and day are required when upcoming is true');
    } else if (upcoming && month && day) { 
        const response = await fetch(`https://holidayapi.com/v1/holidays?key=${process.env.HOLIDAY_API_KEY}&country=${country}&year=${year}&month=${month}&day=${day}&upcoming=${upcoming}`);

        if (!response.ok) {
            return [];
        }

        const { holidays } = await response.json() as HolidayApiResponse;

        return holidays;
    } else {
        const response = await axios.get(`https://holidayapi.com/v1/holidays?key=${process.env.HOLIDAY_API_KEY}&country=${country}&year=${year}`);

        if (!response.data) {
            return [];
        }

        const { holidays } = await response.data as HolidayApiResponse;

        return holidays;
    }
}

export type HolidayApiResponse = {
    status: number;
    warning: string;
    requests: {
        used: number;
        available: number;
        resets: string;
    },
    holidays: Holiday[];
}

export type Holiday = {
    name: string;
    date: string;
    observed: string;
    public: boolean;
    country: string;
    uuid: string;
    weekday: {
        date: {
            name: string;
            numeric: string;
        },
        observed: {
            name: string;
            numeric: string;
        }
    }
}