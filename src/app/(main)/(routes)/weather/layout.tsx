import { connection } from "next/server";
import { resolvePlace } from "@/lib/weather";
import "@/styles/page/weather.css";

export async function generateMetadata() {
	await connection();
	const place = await resolvePlace();
	const where = place?.city ?? "your area";

	return {
		title: `Weather in ${where}`,
		description: `Current weather and forecast for ${where}`,
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
