import { urlFor } from "@/sanity/lib/image";
import { getAuthor } from "@/sanity/lib/queries";
import { Post } from "@/utils/types";
import Image from "next/image";
import "@/styles/css/postcard.css";
import Link from "next/link";

export async function PostCard({ post }: { post: Post }) {

    const { title, publishedAt, mainImage, author: postAuthor, preview } = post
    const imageUrl = mainImage ? urlFor(mainImage).width(200).height(200).url() : null;

    const author = await getAuthor(postAuthor._id);

    return (
        <div className="post-card">
            {
                imageUrl && (
                    <div className="post-card-image flex items-center justify-center w-full">
                        <Link href={`/posts/${post.slug.current}`} className="w-4/5">
                            <Image src={imageUrl} width={200} height={200} alt={title} className={`rounded-md w-full max-w-[240px] post-card-actual-image hover:border-4 border-[#4996C0] transition-all duration-150 ease-in`} />
                        </Link>
                    </div>
                )
            }
            <Link href={`/posts/${post.slug.current}`} className="">
                <p className="post-card-title focus:text-blue-600 transition duration-150 hover:text-blue-500 ease-in-out">
                    {title}
                </p>
            </Link>
            {
                preview && <p className="post-card-body">
                    {preview}
                </p>
            }
            <p className="post-card-footer">Written by <span className="post-card-by-name">{author.name}</span> on <span className="date">{new Date(publishedAt).toLocaleDateString()}</span></p>
        </div>
    )
}