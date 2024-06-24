"use client";
import Contact from "@/components/misc/Contact";
import Discord from "@/components/misc/Discord";
import Hero from "@/components/misc/Hero";
import ProjectsContainer from "@/components/project/ProjectsContainer";
import { PROJECTS } from "@/utils/constants";
import { Card, CardFooter } from "@nextui-org/react";


export default function Home() {

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
          radius="md"
          className="border-none bg-[#6A7B6E] backdrop-blur-3xl shadow-inner"
        >
          <iframe title="reaching out by clxrity" src="https://open.spotify.com/embed/album/1hNcadbxNEZZtoCmIHVnyM?utm_source=generator" width="100%" height="168" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="eager" className="scroll-smooth overflow-y-scroll w-full bg-transparent"></iframe>
          <CardFooter className="text-gray-200 flex items-center shadow-background">
            <h5 className="text-wrap font-bold text-base max-w-xs spotify-ad">
              Check out my latest album on Spotify!
            </h5>
          </CardFooter>
        </Card>
      </div>
      <div className="flex w-full mx-auto justify-center items-center mb-10">
        {/* <ProjectsContainer projects={PROJECTS} /> */}
      </div>
    </main>
  )
}