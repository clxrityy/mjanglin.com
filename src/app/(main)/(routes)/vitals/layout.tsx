import type { Metadata } from "next";
import "@/styles/readout.css";
import "@/styles/page/vitals.css";

const title = "Vitals";
const description =
	"Live Core Web Vitals for mjanglin.com: your visit, real-user field data and status badges.";

export const metadata: Metadata = {
	title,
	description,
	openGraph: {
		title: `${title} · MJ Anglin`,
		description,
		url: "https://mjanglin.com/vitals",
		siteName: "MJ Anglin",
		type: "website",
		locale: "en_US",
	},
	twitter: {
		card: "summary_large_image",
		title: `${title} · MJ Anglin`,
		description,
	},
};

export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}
