import { ProjectParams } from "@/utils/types";
import Project from "./Project";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

type Props = {
    projects: ProjectParams[]
}

export default async function ProjectsContainer({ projects, ...props }: Props) {

    return <div {...props} className="w-max h-auto px-10 py-5 rounded-md bg-gradient-to-bl from-transparent to-black">
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-center">
                {projects.map((project, index) => (
                    <Suspense key={index} fallback={<Skeleton />}>
                        <Project {...project} />
                    </Suspense>
                ))}
            </div>
        </div>
    </div>
}