import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Post } from "@/utils/types";
import type { Metadata, ResolvingMetadata } from "next";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const options = { next: { revalidate: 30 } };

async function getStaticProps({ params }: { params: Promise<{ slug: string }> }) {
    const post: Post = await client.fetch(POST_QUERY, await params, options);

    return {
        props: {
            post
        }
    }
}

type Props = {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { props: { post } } = await getStaticProps({ params });

    const postImageUrl = urlFor(post.mainImage).width(200).height(200).url();

    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: post.title,
        description: post.preview,
        openGraph: {
            images: [postImageUrl, ...previousImages]
        },
        keywords: post.tags.map((tag) => tag.title)
    }
}

export default async function SlugLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <div className="w-full h-full">
            {children}
        </div>
    )
}