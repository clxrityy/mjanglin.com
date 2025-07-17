import { MetadataRoute } from "next";
import { projects } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {

    const mappedProjects = () => {
        return projects.map(project => ({
            url: `https://mjanglin.com/projects/dev/${project.slug}`,
            lastModified: new Date(project.publishedAt),
            images: [project.mainImage]
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
            url: "https://mjanglin.com/projects",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5
        },
        ...mappedProjects(),
    ]
}