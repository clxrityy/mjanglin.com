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
        return <div className="w-full h-full flex flex-col md:flex-row items-center justify-around">
            <div className="w-full h-full px-5 py-3 flex items-center justify-center">
                <CreateProject />
            </div>

            <div className="w-full h-full flex items-center justify-center">
                 <div className="flex flex-col items-center justify-center gap-5 w-full mx-auto">
                    {projects.map((project) => {
                        return <Project key={project.uuid} project={project} />;
                    })}
                </div>
            </div>
        </div>;
    }
}