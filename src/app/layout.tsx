import Loading from '@/components/Loading';
import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from "react";


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MJ Anglin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="author" content="MJ Anglin" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#4b9084" />
        <meta
          name="description"
          content="Web Developer"
        />
        <meta name="keywords" content="MJ Anglin, clxrity, clarity" />
        <meta property="og:image" content="https://mjanglin.com/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} flex justify-center items-center`}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
