"use client"
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ICONS } from "@/config/data/constants";
import BigButton from "@/components/ui/bigButton";
import { useRouter } from "next/navigation";


export default function Home() {

  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  if (!isLoaded) {
    router.refresh();
  }

  if (isLoaded) {

    return (
      <main>
        <div className="w-full h-screen flex flex-col items-center justify-center gap-20 my-20">
          <div className="flex flex-col my-10 items-center">
            <div className="flex flex-col items-center gap-5">
              <h1 className="text-5xl font-bold uppercase">sleep graph</h1>
              <p className="text-lg font-semibold">Calculate your sleep schedule</p>
            </div>
          </div>
          <div>
            <div className="flex flex-col items-center justify-center gap-4">
              {
                isSignedIn && user ? (
                  <BigButton variant={"default"}>
                    <Link href={`/dashboard/${user.id}`} className="flex flex-row items-center gap-2">
                      <ICONS.dashboard size={28} />
                      <span>
                        Dashboard
                      </span>
                    </Link>
                  </BigButton>
                ) : (
                  <BigButton variant={"secondary"}>
                    <Link href="/sign-in" className="flex flex-row items-center gap-2">
                      <ICONS.signIn size={24} />
                      Sign In
                    </Link>
                  </BigButton>
                )
              }
            </div>
          </div>
          <div className="flex items-center justify-center w-full h-full py-10 relative">
            <div className="clock-container">
              <div className="clock" />
            </div>
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