import { ProjectParams } from "@/utils/types";
import Project from "./Project";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

type Props = {
    projects: ProjectParams[]
}

export default function ProjectsContainer({ projects, ...props }: Props) {

    return <div {...props} className="w-max h-auto px-10 py-5 rounded-md bg-gradient-to-bl from-black to-transparent">
        <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold font-mono uppercase">project details</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                {projects.map((project, index) => (
                    <Suspense key={index} fallback={<Skeleton />}>
                        <Project {...project} />
                    </Suspense>
                ))}
            </div>
        </div>
    </div>
}