import { Red_Hat_Mono, JetBrains_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Metadata } from "next";
import Script from 'next/script';
import Sidebar from "@/components/layers/Sidebar";
import Footer from "@/components/layers/Footer";
import { Suspense } from "react";

const noto = Noto_Sans({ subsets: ["latin"], preload: true, display: "swap", variable: "--font-noto" });
const redHatMono = Red_Hat_Mono({ subsets: ["latin"], variable: "--font-red-hat-mono", preload: true, display: "swap" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", preload: true, display: "swap", weight: ["100", "200", "800", "700", '600', "500", "300", '400'] });


// export const metadata: Metadata = {
//   title: "MJ Anglin",
//   description: "Developer & Creator",
// };

export const metadata: Metadata = {

  title: "MJ Anglin",
  description: "Developer & Creator",
}



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="theme-color" content="currentColor" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DH9C4WZGMK"
        />
      </head>
        <Providers>
          <body className={`${noto.variable} ${redHatMono.variable} ${jetBrainsMono.variable}`}>
            <Sidebar />
            {children}
            <Footer />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DH9C4WZGMK');
          `}
            </Script>
          </body>
        </Providers>
    </html>
  );
}
