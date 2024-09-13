import { ProjectParams } from "@/utils/types";
import { Skeleton } from "@nextui-org/react";
import { Suspense } from "react";
import Project from "../elements/Project";

type Props = {
    projects: ProjectParams[]
}

export default async function ProjectsContainer({ projects, ...props }: Props) {

    return <div {...props} className="w-fit h-fit px-10 py-5 rounded-md my-20">
        <div className="flex items-center justify-center w-full gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-between">
                {projects.map((project, index) => (
                    <Suspense key={index} fallback={<Skeleton />}>
                        <Project {...project} />
                    </Suspense>
                ))}
            </div>
        </div>
    </div>
}