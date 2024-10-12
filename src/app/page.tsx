import Main from "@/components/layers/Main";
import { PROJECTS } from "@/utils/constants";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import configurations from "@/config";
import Link from "next/link";

const ProjectsContainer = dynamic(() => import("@/components/layers/Container"));
const Hero = dynamic(() => import("@/components/elements/Hero"));

const { icons } = configurations;

export default async function Home() {

  return (
    <Main>
      <div className="flex flex-col items-center justify-around h-1/3 w-full gap-6 mt-10 mb-20">
        <Suspense fallback={<div className="w-10 h-10 rounded-full border border-white animate-spin" />}>
          <Hero />
        </Suspense>
      </div>
      <div className="flex items-center w-screen justify-center mb-40">
        <Link href={"/blogs"} className="border px-6 py-4 border-white/25 border-dashed hover:bg-black transition-all duration-150 ease-in hover:border-cyan-600 text-pretty hover:text-cyan-600">
          <h2>
            <span className="flex flex-row gap-1 items-center text-center font-bold">
              <icons.projectsBlog />
              Dev Blogs
            </span>
          </h2>
        </Link>
      </div>
      <div className="flex w-full mx-auto justify-center items-center mb-10">
        <Suspense fallback={<div />}>
          <ProjectsContainer projects={PROJECTS} />
        </Suspense>
      </div>
    </Main>
  )
}