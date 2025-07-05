"use client";

import { MdxPost } from "@/utils/types"
import { useEffect, useState } from "react";
import { MdxPostCard } from "./cards/MdxPostCard";

type Props = {
    mdxPosts: MdxPost[];
}

const postsPerPage = 4;

export function Posts({
    mdxPosts }: Readonly<Props>) {
    const [mdxPostsToShow, setMdxPostsToShow] = useState<MdxPost[]>([]);

    const loopMdxPostsWithSlice = (start: number, end: number) => {
        const slicedMdxPosts = mdxPosts.slice(start, end);
        setMdxPostsToShow([...mdxPostsToShow, ...slicedMdxPosts]);
    }

    useEffect(() => {
        loopMdxPostsWithSlice(0, postsPerPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="flex flex-col gap-6 items-center justify-center w-full">
            <div className="w-max grid grid-cols-1 md:grid-cols-2 items-center justify-center 2xl:justify-between mb-20 gap-16 2xl:gap-20 lg:mt-10 lg:-mx-10">
                {
                    mdxPostsToShow.map((mdxPost, index) => (
                        <MdxPostCard key={index + mdxPost.slug} post={mdxPost} />
                    ))
                }
            </div>
        </div>
    )
}