import { MdxPost } from "@/utils/types";
import "@/styles/postcard.css";
import Image from "next/image";
import Link from "next/link";

export function MdxPostCard({ post }: { post: MdxPost }) {
    
        const { title, publishedAt, mainImage, preview, author, slug } = post
        const imageUrl = mainImage;
    
        return (
            <div className="post-card">
                {
                    imageUrl && (
                        <div className="post-card-image flex items-center justify-center w-full">
                            <Image unoptimized src={imageUrl} alt={title} width={500} height={500} className="rounded-md w-full max-w-[240px] post-card-actual-image" />
                        </div>
                    )
                }
                <Link href={`/posts/${slug}`}>
                    <p className="post-card-title focus:text-blue-600 transition duration-150 hover:text-blue-500 ease-in-out">
                        {title}
                    </p>
                </Link>
                {
                    preview && <p className="post-card-body">
                        {preview}
                    </p>
                }
                <p className="post-card-footer">Written by <span className="post-card-by-name">{author}</span> on <span className="date">{new Date(publishedAt).toLocaleDateString()}</span></p>
            </div>
        )
}