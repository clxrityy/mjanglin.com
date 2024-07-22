"use server";
import Main from "@/components/layers/Main";
import { PROJECTS } from "@/utils/constants";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const ProjectsContainer = dynamic(() => import("@/components/layers/Container"));
const Hero = dynamic(() => import("@/components/elements/Hero"));


export default async function Home() {

  return (
    <Main>
      <div className="flex flex-col items-center justify-around h-1/3 w-full gap-6 mt-10 mb-20">
        <Suspense fallback={<div />}>
          <Hero />
        </Suspense>
      </div>
      
      <div className="flex w-full mx-auto justify-center items-center mb-10">
        <Suspense fallback={<div />}>
          <ProjectsContainer projects={PROJECTS} />
        </Suspense>
      </div>
    </Main>
  )
}