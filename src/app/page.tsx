"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { dark } from "@clerk/themes";
import {ICONS} from "@/config/data/constants";


export default function Home() {

  const { user, isLoaded, isSignedIn } = useUser();

  if (isLoaded) {

    return (
      <main>
        <div className="w-full h-full flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col my-10 items-center">
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-5xl font-bold uppercase">sleep graph</h1>
              <p className="text-lg font-semibold">Calculate your sleep schedule</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center gap-4">
              {
                isSignedIn ? (
                  <Button size="lg" className="text-xl font-bold hover:scale-105 transition-transform focus:ring focus:outline-none focus:ring-offset-2">
                    <Link href={`/dashboard/${user.id}`} className="flex flex-row items-center gap-2">
                      <ICONS.dashboard size={28} />
                      <span>
                        Dashboard
                      </span>
                    </Link>
                  </Button>
                ) : (
                  <Button className="text-xl font-semibold px-10 py-4 focus:ring focus:ring-offset-2" size="lg">
                    <Link href="/sign-in" className="flex flex-row items-center gap-2">
                      <ICONS.signIn size={24} />
                      Sign In
                    </Link>
                  </Button>
                  )
              }
            </div>
          </div>
          <div className="clock-container">
            <div className="clock" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className="clock-container">
        <div className="clock" />
      </div>
    </main>
  )
}