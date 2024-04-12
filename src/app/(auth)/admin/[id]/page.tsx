"use server";
import { getProjects } from "@/app/_actions/projects";
import CreateProject from "@/components/project/CreateProject";
import Project from "@/components/project/Project";
import { redirect } from "next/navigation";

type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    const projects = await getProjects();

    if (params.id !== process.env.ADMIN_PASS!) {
        return redirect("/");
    } else {
        return <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full h-full">
                <CreateProject />
            </div>

            <div className="w-full h-full">
                 <div className="flex flex-col items-center justify-center gap-4">
                    {projects.map((project) => {
                        return <Project key={project.uuid} project={project} />;
                    })}
                </div>
            </div>
        </div>;
    }
}