import { MdxPostCard } from "@/components/cards/ProjectCard";
import { projects } from "@/config";
import { randomizeProjects } from "@/utils/randomize";

export default async function Page() {

    return (
        <div className="h-full mx-auto relative w-max xl:mt-10">
            <div className="flex flex-col items-center justify-center gap-10 lg:gap-12 xl:gap-16 mt-40 sm:mt-50 md:mt-72 lg:mt-0 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 xl:gap-14 2xl:gap-16 items-center justify-center h-auto w-full mx-auto">
                    {randomizeProjects(projects).map((project) => (
                        <MdxPostCard key={project.slug} project={project} />
                    ))}
                </div>
            </div>
        </div>
    )
}