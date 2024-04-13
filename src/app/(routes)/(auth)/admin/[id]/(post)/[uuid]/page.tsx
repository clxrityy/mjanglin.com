"use server";

import getProject from "@/app/(actions)/_actions/projects";
import PostForm from "@/components/blog/PostForm";
import { Suspense } from "react";

type Props = {
    params: { uuid: string };
};

export default async function PostPage({ params }: Props) {

    const project = await getProject(params.uuid);

    if (!project) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <h1>Project not found</h1>
            </div>
        );
    }

    return (
        <div className="h-full w-full flex flex-col gap-10 items-center justify-center">
            <div className="flex flex-col items-center max-w-md text-center gap-2">
                <h3>
                    Connect a project to an existing blog post
                </h3>
                <p className="text-sm text-gray-300 italic">
                    The information provided will be presented as a preview with a link to the full blog post
                </p>
            </div>
            <Suspense fallback={<h1>Loading...</h1>}>
                <PostForm project={project} />
            </Suspense>
        </div>
    )
}