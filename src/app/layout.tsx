import Script from "next/script";
import "./globals.css";
import { Metadata } from "next";
import { Background } from "@/components/layout/Background";
import { exo } from "@/styles/fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        images: [
            "https://mjanglin.com/apple-touch-icon.png",
            "https://mjanglin.com/favicon-32x32.png",
            "https://mjanglin.com/favicon-16x16.png",
            "https://mjanglin.com/android-chrome-192x192.png",
            "https://mjanglin.com/android-chrome-512x512.png"
        ]
    }
}



export default async function RootLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta name="theme-color" content="currentColor" />
                {/** 
                 * @see https://developer.chrome.com/docs/lighthouse/best-practices/csp-xss/?utm_source=lighthouse&utm_medium=devtools
                 */}
                {/* <meta httpEquiv="Content-Security-Policy" content="script-src 'none'" /> */}
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-DH9C4WZGMK"
                />
                <meta property="og:url" content="https://mjanglin.com" />
                <meta property="twitter:image" content="https://mjanglin.com/apple-touch-icon.png" />
                <meta property="og:image" content="https://mjanglin.com/apple-touch-icon.png" />
                {/* <meta property="twitter:card" /> */}
                <meta property="og:site_name" content="MJ Anglin" />
                <meta property="og:title" content="MJ Anglin" />
                <meta property="og:description" content="Developer & Creator" />
                <meta property="twitter:description" content="Developer & Creator" />
                <meta property="twitter:title" content="MJ Anglin" />
            </head>

            <body className={`${exo.variable}`}>
                {/* <Navbar /> */}
                <div className="w-full h-full relative z-10">
                    {children}
                </div>
                <Background />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DH9C4WZGMK');
          `}
                </Script>
                <SpeedInsights />
            </body>
        </html>
    )
}