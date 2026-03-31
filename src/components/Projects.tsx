"use client";

import { useCallback, useEffect, useState } from "react";
import { CONSTANTS } from "@/utils/constants";
import { randomizeProjects } from "@/utils/randomize";
import type { Project } from "@/utils/types";
import { ProjectCard } from "./cards/ProjectCard";

type Props = {
	projects: Project[];
};

export function Projects({ projects }: Readonly<Props>) {
	const [projectsToShow, setProjectsToShow] = useState<Project[]>([]);

	const loopProjectsWithSlice = useCallback(
		(start: number, end: number) => {
			const randomizedProjects = randomizeProjects(projects);
			const slicedProjects = randomizedProjects.slice(start, end);
			setProjectsToShow((prev) => [...prev, ...slicedProjects]);
		},
		[projects],
	);

	useEffect(() => {
		loopProjectsWithSlice(0, CONSTANTS.POSTS_PER_PAGE);
	}, [loopProjectsWithSlice]);

	return (
		<div className="flex flex-col gap-6 items-center justify-center w-full">
			<div className="w-max grid grid-cols-1 md:grid-cols-2 items-center justify-center 2xl:justify-between mb-20 gap-16 2xl:gap-20 lg:mt-10 lg:-mx-10">
				{projectsToShow.map((project) => (
					<ProjectCard key={project.slug} project={project} />
				))}
			</div>
		</div>
	);
}
