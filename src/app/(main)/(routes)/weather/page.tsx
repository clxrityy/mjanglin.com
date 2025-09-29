import { TimeCard } from "@/components/cards/TimeCard";
import { WeatherCard } from "@/components/cards/WeatherCard";
import { fetchIp, getLocationByIp } from "@/lib/ip";

async function getStaticProps() {
    const ip = await fetchIp() as string;

    return {
        props: {
            ip
        }
    }
}

export default async function Page() {

    const { props: { ip } } = await getStaticProps();
    const { city, country, countryCode, regionName } = await getLocationByIp(ip) as { city: string, country: string, countryCode: string, regionName: string };

    return (
        <div className="weather-main">
            <div className="absolute top-10 right-10">
                <TimeCard />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center h-screen">
                <WeatherCard location={`${city}, ${regionName}`} country={country} countryCode={countryCode} />
            </div>
        </div>
    )
}