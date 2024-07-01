import { Nunito } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { v4 as uuid } from "uuid";
import { Suspense } from "react";
import Loading from "./loading";

const nunito = Nunito({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "MJ Anglin",
//   description: "Developer & Creator",
// };

export const metadata: Metadata = {

  title: "sleep graph",
  description: "Calculate your sleep schedule",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { sessionId } = auth();
  const user = await currentUser();

  if (user && sessionId) {
    const existingUserData = await db.sleepUser.findFirst({
      where: {
        userId: user.id,
      }
    });

    if (!existingUserData) {
      try {
        await db.sleepUser.create({
          data: {
            id: uuid(),
            userId: user.id,
            username: user.username!,
            createdAt: new Date(),
            updatedAt: new Date(),
            sessionId: sessionId,
            avatar: user.imageUrl,
          }
        })
      } catch (e: any) {
        console.error(e);
      }
    } else {
      try {
        await db.sleepUser.update({
          where: {
            userId: user.id
          },
          data: {
            sessionId: sessionId,
            avatar: user.imageUrl,
            updatedAt: new Date(),
            username: user.username!,
          }
        })
      } catch (e: any) {
        console.error(e);
      }
    }
  }


  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
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


        <body className={nunito.className}>

          <Providers>
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </Providers>

        </body>

      </html>
    </ClerkProvider>
  );
}
