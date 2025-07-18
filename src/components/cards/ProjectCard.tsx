import type { Project } from "@/utils/types";
import Link from "next/link";
import { ImageComponent } from "../ui/ImageComponent";
import { ICONS } from "@/config";
import "@/styles/css/projectcard.css";

export function ProjectCard({ project }: Readonly<{ project: Project }>) {

    const { title, publishedAt, mainImage, preview, author, slug } = project
    const imageUrl = mainImage;

    const checkLink = (link: string) => {
        if (link.startsWith("http://") || link.startsWith("https://")) {
            return link;
        }
        return `/projects/${link}`;
    }

    const isExternalLink = (link: string) => {
        return !checkLink(link).startsWith("/projects/");
    }

    const external = isExternalLink(slug);

    const ExternalIcon = ICONS.external;
    const PostIcon = ICONS.project;

    return (
        <div className={`project-card relative ${external ? "external" : ""}`}>
            {
                external ? (
                    <div className="absolute bottom-2 left-2 w-full py-1 px-1 z-100">
                        <p className="text-xs text-blue-400 flex items-center gap-1 bg-black/95 w-fit py-1 px-1 rounded-lg">
                            <ExternalIcon className="text-blue-400" size={20} aria-label="External Link" /> <span className="sr-only">
                                External Link
                            </span>
                        </p>
                    </div>
                ) : (
                    <div className="absolute bottom-2 left-2 w-full py-1 px-1 z-100">
                        <p className="text-xs text-gray-300 flex items-center gap-1 bg-black/85 w-fit py-1 px-1 rounded-lg">
                            <PostIcon size={20} aria-label="Internal Post" /> <span className="sr-only">
                                Internal Post
                            </span>
                        </p>
                    </div>
                )
            }
            {
                imageUrl && (
                    <div className="project-card-image flex items-center justify-center w-full">
                        <ImageComponent image={{
                            src: imageUrl,
                            alt: title,
                            width: 175,
                            height: 175,
                            className: `rounded-md w-fit project-card-actual-image`,
                            placeholder: "blur",
                            blurDataURL: "/assets/blur-loading-img.png",
                            unoptimized: true,
                            style: {
                                width: "auto",
                                height: "auto",
                            }
                        }}
                        />
                    </div>
                )
            }
            <Link href={checkLink(slug)} rel={external ? "noopener noreferrer" : undefined} target={external ? "_blank" : undefined}>
                <p className="project-card-title focus:text-blue-600 transition duration-150 hover:text-blue-500 ease-in-out">
                    {title}
                </p>
            </Link>
            {
                preview && <p className="project-card-body">
                    {preview}
                </p>
            }
            <p className="project-card-footer">Published by <span className="project-card-by-name">{author}</span> on <span className="date">{new Date(publishedAt).toLocaleDateString()}</span></p>
        </div >
    )
}