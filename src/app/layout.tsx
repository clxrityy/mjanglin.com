import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Background } from "@/components/layout/Background";
import { GlassPointer } from "@/components/layout/GlassPointer";
import { dmSans, exo } from "@/styles/fonts";
import { CONSTANTS } from "@/utils/constants";
import "./globals.css";

export const metadata: Metadata = {
	title: "MJ Anglin",
	description: "Developer & Creator",
	openGraph: {
		title: "MJ Anglin",
		description: "Developer & Creator",
		type: "website",
		url: "https://mjanglin.com",
		locale: "en_US",
		emails: ["contact@mjanglin.com"],
		siteName: "MJ Anglin",
		countryName: "United States of America",
		images: ["/apple-touch-icon.png"],
	},
	twitter: {
		card: "summary",
		title: "MJ Anglin",
		description: "Developer & Creator",
		images: ["/apple-touch-icon.png"],
	},
	pinterest: {
		richPin: true,
	},
	publisher: "MJ Anglin",
	manifest: "/site.webmanifest",
	metadataBase: new URL("https://mjanglin.com"),
	icons: {
		// The SVG adapts to light and dark browser themes; the rest are fallbacks
		icon: [
			{ url: "/icon.svg", type: "image/svg+xml" },
			{ url: "/favicon.ico", sizes: "48x48" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
		other: [
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/site.webmanifest", type: "application/manifest+json" },
			{
				url: "/android-chrome-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				url: "/android-chrome-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	},
	appleWebApp: {
		title: "MJ Anglin",
		statusBarStyle: "black-translucent",
		startupImage: [
			{
				url: "/apple-touch-icon.png",
				media:
					"(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
			},
		],
		capable: true,
	},
	verification: {
		me: [
			"https://mjanglin.com",
			"mailto:contact@mjanglin.com",
			"https://clxrity.xyz",
		],
		google:
			process.env.GOOGLE_SITE_VERIFICATION ||
			process.env.GOOGLE_SITE_VERIFICATION?.split("=")[1] ||
			"",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" data-scroll-behavior="smooth">
			<head>
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="icon" href="/favicon.ico" sizes="48x48" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="mobile-web-app-capable" content="yes" />
				{/**
				 * @see https://developer.chrome.com/docs/lighthouse/best-practices/csp-xss/?utm_source=lighthouse&utm_medium=devtools
				 */}
				{/* <meta httpEquiv="Content-Security-Policy" content="script-src 'none'" /> */}
				<Script
					strategy="lazyOnload"
					src={`https://www.googletagmanager.com/gtag/js?id=${CONSTANTS.GOOGLE_ANALYTICS_ID}`}
				/>
			</head>

			<body className={`${exo.variable} ${dmSans.variable}`}>
				{/* <Navbar /> */}
				<main className="w-full h-full relative z-10 max-w-screen overflow-y-scroll">
					{children}
				</main>
				<Background />
				<GlassPointer />
				<Script id="google-analytics" strategy="lazyOnload">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${CONSTANTS.GOOGLE_ANALYTICS_ID}');
          `}
				</Script>
				<SpeedInsights />
			</body>
		</html>
	);
}
