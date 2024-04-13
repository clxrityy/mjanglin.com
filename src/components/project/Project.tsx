"use client"
import { projectSchema } from "@/util/objects";
import { ComponentProps } from "react";
import { z } from "zod";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import configurations from "@/config";
import { deleteProject } from "@/app/_actions/projects";

const { icons } = configurations;

type Props = {
    project: z.infer<typeof projectSchema>;
} & ComponentProps<"div">;

export default function Project({ project, ...props }: Props) {

    return (
        <div {...props} className="w-2/3 flex items-center justify-center relative m-5">
            <Link href={project.url} className="w-full border border-blue-500 rounded-md flex items-center justify-evenly flex-col hover:opacity-100 transition-all hover:scale-105 hover:shadow z-10">
                <div className="flex flex-col md:flex-row items-center justify-center py-4 px-2">
                    <div className="flex flex-col items-center w-full text-center">
                        <h1 className="text-2xl font-semibold">{project.title}</h1>
                        <p className="text-sm text-gray-500">{project.description}</p>
                    </div>
                    <div className="flex items-center justify-center w-full py-2 px-2">
                        <Image src={project.image} alt={project.title} className="w-1/2 h-1/2 rounded-md" width={200} height={200} />
                    </div>
                </div>
                <div className="w-full bg-gray-700/50 px-2 py-3">
                    <p className="text-center text-white/60">
                        {project.footer}
                    </p>
                </div>

            </Link>
            <div className="absolute top-0 right-0 p-2 z-[11]">
                <Button onClick={async () => {
                    await deleteProject(project.uuid);
                }}
                    isIconOnly className="bg-red-500 hover:ring-white/80 hover:ring">
                    <icons.delete />
                </Button>
            </div>
        </div>
    )
}