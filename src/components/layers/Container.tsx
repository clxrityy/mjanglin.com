import { ProjectParams } from "@/utils/types";
import { Skeleton } from "@nextui-org/react";
import { Suspense } from "react";
import Project from "../elements/Project";

type Props = {
    projects: ProjectParams[]
}

export default async function ProjectsContainer({ projects, ...props }: Props) {

    return <div {...props} className="w-fit h-fit px-10 py-5 rounded-md">
        <div className="flex items-center justify-center w-full gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 justify-stretch">
                {projects.map((project, index) => (
                    <Suspense key={index} fallback={<Skeleton />}>
                        <Project {...project} />
                    </Suspense>
                ))}
            </div>
        </div>
    </div>
}