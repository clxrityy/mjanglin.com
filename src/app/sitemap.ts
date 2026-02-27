import { MetadataRoute } from "next";
// import { projects } from "@/config";
import { r2AssetPath } from "@/utils/assets";

export default function sitemap(): MetadataRoute.Sitemap {

    // const mappedProjects = () => {
    //     return projects.map(project => ({
    //         url: project.slug.startsWith("http") ? project.slug : `https://mjanglin.com/projects/dev/${project.slug}`,
    //         lastModified: new Date(project.publishedAt),
    //         images: [project.mainImage]
    //     })) as MetadataRoute.Sitemap
    // }

    return [
        {
            url: "https://mjanglin.com",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1
        },
        {
            url: "https://mjanglin.com/weather",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.8
        },
        {
            url: "https://mjanglin.com/projects",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5
        },
        {
            url: "https://mjanglin.com/vitals",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.9
        },
        {
            url: "https://mjanglin.com/the-undertow",
            lastModified: new Date(),
            changeFrequency: "never",
            priority: 0.4,
            images: [r2AssetPath('/assets/the-undertow.png')],
        },
        {
            url: "https://mjanglin.com/spotify",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.25
        },
        {
            url: "https://mjanglin.com/discord",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.25
        },
        {
            url: "https://mjanglin.com/github",
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.25
        },
        {
            url: "https://mjanglin.com/instagram",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.25
        },
        {
            url: "https://mjanglin.com/linkedin",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.25
        },
        {
            url: "https://mjanglin.com/youtube",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.25
        },
        {
            url: "https://mjanglin.com/soundcloud",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.25
        },
        {
            url: "https://mjanglin.com/spotify",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.25
        },
        {
            url: "https://mjanglin.com/apple-music",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.25
        },
        {
            url: "https://mjanglin.com/music",
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.25
        },
        // ...mappedProjects(),
    ]
}