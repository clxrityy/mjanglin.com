import Script from "next/script";
import "../globals.css";
import { Metadata } from "next";
import { Background } from "@/components/layout/Background";
import {Exo} from "next/font/google"; 

export const metadata: Metadata = {
    title: "MJ Anglin",
    description: "Developer & Creator",
}

const exo = Exo({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true,
    variable: "--font-exo"
})

export default function RootLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <meta name="theme-color" content="currentColor" />
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-DH9C4WZGMK"
                />
            </head>

            <body className={`${exo.variable}`}>
                {/* <Navbar /> */}
                <div className="w-full h-full z-30 relative">
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
            </body>
        </html>
    )
}