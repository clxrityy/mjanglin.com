import { Nunito } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Metadata } from "next";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hbd",
  description: "A dynamic Discord horoscope and birthday bot",
};

export default function RootLayout({
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
        <title>
          hbd
        </title>
        <meta
          property="description"
          content="A Discord birthday bot"
        />
      </head><Providers>
        <body className={nunito.className}>

          {children}

        </body>
      </Providers>
    </html>
  );
}
