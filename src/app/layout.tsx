import { FONTS } from "@/misc/fonts";
import "./globals.css";
import Providers from "../components/layers/providers";
import { Metadata } from "next";
import { parseUser } from "@/utils/parseUser";
import UserIcon from "@/components/misc/UserIcon";
import Footer from "@/components/layers/Footer";
import HomeIcon from "@/components/misc/HomeIcon";
import { Suspense } from "react";
import Loading from "./loading";
import Stars from "@/components/layers/Stars";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "hbd",
  description: "A dynamic Discord horoscope and birthday bot",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await parseUser();

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
        <meta name="theme-color" content="#F99EC1" />
        <meta property="twitter:image" content="/hbd_banner.gif" />
        <meta property="og:title" content="hbd" />
        <meta property="og:description" content="A Discord birthday bot" />
        <meta property="description" content="A Discord birthday bot" />
        <meta property="og:url" content="https://hbd.mjanglin.com" />
        <title>
          hbd
        </title>
        <meta
          property="description"
          content="A Discord birthday bot"
        />
      </head>

      <body className={`${FONTS.nunito.variable} ${FONTS.roboto.variable} dark`}>
        <Providers>
          <Suspense fallback={<Loading />}>
            <Stars />
            <HomeIcon />
            {user && <UserIcon userId={user.id} />}
            {children}
            <Footer />
            <SpeedInsights />
          </Suspense>
        </Providers>
      </body>
    </html>

  );
}
