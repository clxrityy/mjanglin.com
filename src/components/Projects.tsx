"use client";

import type { Project } from "@/utils/types"
import { useEffect, useState } from "react";
import { MdxPostCard } from "./cards/ProjectCard";
import { CONSTANTS } from "@/utils/constants";
import { randomizeProjects } from "@/utils/randomize";

type Props = {
    projects: Project[];
}

export function Projects({
    projects
}: Readonly<Props>) {
    const [projectsToShow, setProjectsToShow] = useState<Project[]>([]);

    const loopProjectsWithSlice = (start: number, end: number) => {
        // Randomize the projects before slicing to show different projects each time
        const randomizedProjects = randomizeProjects(projects);
        const slicedProjects = randomizedProjects.slice(start, end);
        setProjectsToShow([...projectsToShow, ...slicedProjects]);
    }

    useEffect(() => {
        loopProjectsWithSlice(0, CONSTANTS.POSTS_PER_PAGE);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="flex flex-col gap-6 items-center justify-center w-full">
            <div className="w-max grid grid-cols-1 md:grid-cols-2 items-center justify-center 2xl:justify-between mb-20 gap-16 2xl:gap-20 lg:mt-10 lg:-mx-10">
                {
                    projectsToShow.map((project, index) => (
                        <MdxPostCard key={index + project.slug} project={project} />
                    ))
                }
            </div>
        </div>
    )
}