import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/utils/types";
import sanityComponents from "@/sanity/components";

export const revalidate = 60;

const options = {next: {revalidate: 30}};

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

export default async function Page({
    params
}: {params: Promise<{slug: string}>}) {

    const post: Post = await client.fetch(POST_QUERY, await params, options);
    const postImageUrl = post.mainImage ? urlFor(post.mainImage).width(200).height(200).url() : null;


    if (!post) {
        return (
            <main className="h-screen w-screen flex items-center justify-center">
                <h1 className="text-4xl font-bold">Post not found</h1>
            </main>
        )
    }


    return (
        <main className="h-auto w-screen py-10 overflow-y-scroll z-[60[">
            <div className="container mx-auto w-full h-screen">
                <div className="flex flex-col w-full items-center justify-center gap-20">
                    <div className="w-full flex flex-col gap-2 items-center justify-around">
                        <h1 className="text-4xl font-bold text-center">{post.title}</h1>
                        {
                            postImageUrl && (
                                <Image src={postImageUrl} width={1200} height={1200} alt={post.title} className="rounded-md" style={{
                                    width: "fit",
                                    height: "auto"
                                }} />
                            )
                        }
                    </div>
                    <div className="w-full flex items-center flex-col justify-center gap-3 h-auto pb-48">
                        {
                            Array.isArray(post.body) && <PortableText components={sanityComponents} listNestingMode="html" value={post.body} />
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}