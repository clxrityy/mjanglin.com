import { ProjectParams } from "@/utils/types";
import Project from "./Project";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

type Props = {
    projects: ProjectParams[]
}

export default function ProjectsContainer({ projects, ...props }: Props) {

    return <div {...props} className="w-full h-1/2 px-2 py-2 rounded-md mx-10">
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold">project details</h1>
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