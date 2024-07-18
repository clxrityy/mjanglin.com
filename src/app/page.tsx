"use server";
import Hero from "@/components/elements/Hero";
import ProjectsContainer from "@/components/elements/project/ProjectsContainer";
import { PROJECTS } from "@/utils/constants";
import { Skeleton } from "@nextui-org/react";
import { Suspense } from "react";
import Main from "@/components/layers/Main";


export default async function Home() {

  return (
    <Main>
      <div className="flex flex-col items-center justify-around h-1/3 w-full gap-6 mt-10 mb-20">
        <Hero />
      </div>
      
      <div className="flex w-full mx-auto justify-center items-center mb-10">
        <Suspense fallback={<Skeleton />}>
          <ProjectsContainer projects={PROJECTS} />
        </Suspense>
      </div>
    </Main>
  )
}