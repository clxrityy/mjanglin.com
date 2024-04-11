"use server";
import Contact from "@/components/misc/Contact";
import Discord from "@/components/misc/Discord";
import Hero from "@/components/Hero";
import { Card, CardFooter } from "@nextui-org/react";


export default async function Home() {

  return (
    <main>
      <div className="flex flex-col items-center justify-around h-1/3 w-screen gap-6 lg:gap-10 mt-10 mb-20">
        <Hero />
        <div className="flex flex-col xl:flex-row items-center justify-center gap-4">
          <Contact />
          <Discord />
        </div>
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none bg-[#6A7B6E] backdrop-blur-3xl shadow-inner"
        >
          <iframe title="reaching out by clxrity" src="https://open.spotify.com/embed/album/1hNcadbxNEZZtoCmIHVnyM?utm_source=generator" width="100%" height="168" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="eager" className="scroll-smooth overflow-y-scroll w-full"></iframe>
          <CardFooter className="text-gray-200 flex items-center shadow-background">
            <h5 className="text-wrap font-bold text-base max-w-xs spotify-ad">
              Check out my latest album on Spotify!
            </h5>
          </CardFooter>
        </Card>
      </div>
      <div className="hidden lg:flex w-full items-center justify-center mx-auto h-full">
        Projects (to be continued...)
      </div>
    </main>
  )
}