import { MetadataRoute } from "next";
import { mdxPosts } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {

    const mappedMdxPosts = () => {
        return mdxPosts.map(post => ({
            url: `https://mjanglin.com/posts/${post.slug}`,
            lastModified: new Date(post.publishedAt),
            images: [post.mainImage]
        })) as MetadataRoute.Sitemap
    }

    return [
        {
            url: "https://mjanglin.com",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1
        }, 
        {
            url: "https://mjanglin.com/weather",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.9
        },
        {
            url: "https://mjanglin.com/posts",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5
        },
        ...mappedMdxPosts(),
    ]
}