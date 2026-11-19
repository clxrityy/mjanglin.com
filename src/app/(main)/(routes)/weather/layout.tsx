import { fetchIp, getLocationByIp } from "@/lib/ip";
import "@/styles/page/weather.css";
import { connection } from "next/server";

async function getStaticProps() {
	const ip = (await fetchIp()) as string;

	return {
		props: {
			ip,
		},
	};
}

export async function generateMetadata() {
	await connection();

	const {
		props: { ip },
	} = await getStaticProps();
	const { city } = (await getLocationByIp(ip)) as { city: string };

	return {
		title: `Weather in ${city}`,
		description: `Current weather and forecast for ${city}`,
	};
}

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	await connection();

	return <div className="relative w-full">{children}</div>;
}
