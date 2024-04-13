import getProject from "@/app/(actions)/_actions/projects";
import { Divider } from "@nextui-org/react";

type Props = {
    params: { uuid: string };
};

export default async function Page({ params }: Props) {
    const project = await getProject(params.uuid);

    if (!project) {
        return <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-4xl">Project not found</h1>
        </div>;
    } else {
        return <div className="w-full h-full flex items-center flex-col gap-10">
            <div className="w-full flex items-center py-10">
                <div className="w-full mx-auto flex flex-col items-center">
                    <h1 className="text-4xl font-semibold">{project.title}</h1>
                    <p className="text-base">{project.description}</p>
                </div>
                <Divider className="my-2 bg-white w-1/2 mx-4" />
            </div>
            <div>
                
            </div>
        </div>;
    }
}