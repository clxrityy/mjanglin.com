import { MdxPost } from "@/utils/types";
import Link from "next/link";
import { ImageComponent } from "../ui/ImageComponent";
import "@/styles/css/postcard.css";

export function MdxPostCard({ post }: Readonly<{ post: MdxPost }>) {

    const { title, publishedAt, mainImage, preview, author, slug } = post
    const imageUrl = mainImage;

    const checkLink = (link: string) => {
        if (link.startsWith("http://") || link.startsWith("https://")) {
            return link;
        }
        return `/posts/${link}`;
    }

    return (
        <div className="post-card">
            {
                imageUrl && (
                    <div className="post-card-image flex items-center justify-center w-full">
                        <ImageComponent image={{
                            src: imageUrl,
                            alt: title,
                            width: 250,
                            height: 250,
                            className: `rounded-md w-fit post-card-actual-image`,
                            placeholder: "blur",
                            blurDataURL: "/assets/blur-loading-img.png",
                            unoptimized: true,
                        }}
                        />
                    </div>
                )
            }
            <Link href={checkLink(slug)}>
                <p className="post-card-title focus:text-blue-600 transition duration-150 hover:text-blue-500 ease-in-out">
                    {title}
                </p>
            </Link>
            {
                preview && <p className="post-card-body">
                    {preview}
                </p>
            }
            <p className="post-card-footer">Published by <span className="post-card-by-name">{author}</span> on <span className="date">{new Date(publishedAt).toLocaleDateString()}</span></p>
        </div>
    )
}