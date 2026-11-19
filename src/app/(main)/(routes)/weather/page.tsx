import { TimeCard } from "@/components/cards/TimeCard";
import { WeatherCard } from "@/components/cards/WeatherCard";
import { fetchIp, getLocationByIp } from "@/lib/ip";

async function getStaticProps() {
	const ip = (await fetchIp()) as string;

	return {
		props: {
			ip,
		},
	};
}

export default async function Page() {
	const {
		props: { ip },
	} = await getStaticProps();
	const { city, country, countryCode, regionName } = (await getLocationByIp(
		ip,
	)) as {
		city: string;
		country: string;
		countryCode: string;
		regionName: string;
	};

	return (
		<div className="weather-main flex min-h-screen flex-col items-center justify-center gap-12 px-6 pt-20 pb-12 md:flex-row md:gap-16">
			<WeatherCard
				location={`${city}, ${regionName}`}
				country={country}
				countryCode={countryCode}
			/>
			<div className="w-64">
				<TimeCard />
			</div>
		</div>
	);
}
