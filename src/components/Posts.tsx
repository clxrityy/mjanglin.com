"use client";

import { MdxPost, Post } from "@/utils/types"
import { useEffect, useState } from "react";
import { PostCard } from "./cards/PostCard";
import { MdxPostCard } from "./cards/MdxPostCard";

type Props = {
    posts: Post[];
    mdxPosts: MdxPost[];
}

const postsPerPage = 2;

export function Posts({ posts, mdxPosts }: Props) {
    const [postsToShow, setPostsToShow] = useState<Post[]>([]);
    const [mdxPostsToShow, setMdxPostsToShow] = useState<MdxPost[]>([]);
    // const [nextPosts, setNextPosts] = useState<number>(postsPerPage);
    // const [nextMdxPosts, setNextMdxPosts] = useState<number>(postsPerPage);

    const loopPostsWithSlice = (start: number, end: number) => {
        const slicedPosts = posts.slice(start, end);
        setPostsToShow([...postsToShow, ...slicedPosts]);
    }

    const loopMdxPostsWithSlice = (start: number, end: number) => {
        const slicedMdxPosts = mdxPosts.slice(start, end);
        setMdxPostsToShow([...mdxPostsToShow, ...slicedMdxPosts]);
    }

    useEffect(() => {
        loopPostsWithSlice(0, postsPerPage);
        loopMdxPostsWithSlice(0, postsPerPage);
    }, []);

    // const loadMorePosts = () => {
    //     loopPostsWithSlice(nextPosts, nextPosts + postsPerPage);
    //     loopMdxPostsWithSlice(nextMdxPosts, nextMdxPosts + postsPerPage);
    //     setNextPosts(nextPosts + postsPerPage);
    //     setNextMdxPosts(nextMdxPosts + postsPerPage);
    // }



    return (
        <div className="flex flex-col gap-6 items-center justify-center w-full">
            <div className="w-max grid grid-cols-1 items-center justify-center 2xl:justify-between mb-20 gap-16 2xl:gap-20 lg:mt-10 lg:-mx-10">
                {
                    postsToShow.map((post, index) => (
                        <PostCard key={index} post={post} />
                    ))
                }
                {
                    mdxPostsToShow.map((mdxPost, index) => (
                        <MdxPostCard key={index} post={mdxPost} />
                    ))
                }
            </div>
            {/* {
                <button disabled={posts.length === postsToShow.length && mdxPosts.length === mdxPostsToShow.length} onClick={loadMorePosts} className="bg-[#4996C0] text-white font-exo py-2 px-4 rounded-lg hover:bg-[#2E6B8D] transition-colors focus:bg-blue-600 font-semibold disabled:bg-gray-600 disabled:cursor-not-allowed mb-10">Load more</button>
            } */}
        </div>
    )
}