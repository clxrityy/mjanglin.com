"use server";

import { getBlog } from "@/app/(actions)/_actions/blogs";

type Props = {
    params: { id: string };
};

export default async function Page({ params }: Props) {
    const blog = await getBlog(params.id);


    if (!blog) {
        return <div className="w-full h-full flex items-center justify-center">
            <h1 className="text-4xl">Blog not found</h1>
        </div>;
    } else {
        return <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-3xl">
                <h1 className="text-4xl font-semibold">{blog.title}</h1>
                <p className="text-base">{blog.content}</p>
            </div>
        </div>;
    }
}