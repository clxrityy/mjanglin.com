import { Nunito_Sans, Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Metadata } from "next";

const nunito = Nunito_Sans({ subsets: ["latin"], preload: true });
const redHatMono = Red_Hat_Mono({ subsets: ["latin"], variable: "--font-red-hat-mono", preload: true });

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
      </head>
      <Providers>
        <body className={`${nunito.className} ${redHatMono.variable}`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
