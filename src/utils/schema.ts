import { Project } from './types';

export interface PersonSchema {
    "@context": "https://schema.org";
    "@type": "Person";
    name: string;
    url: string;
    description: string;
    image: string;
    sameAs: string[];
}

export interface BlogPostSchema {
    "@context": "https://schema.org";
    "@type": "BlogPosting";
    headline: string;
    description: string;
    datePublished: string;
    author: {
        "@type": "Person";
        name: string;
    };
    image: string;
    url: string;
    keywords: string[];
}

export interface WebsiteSchema {
    "@context": "https://schema.org";
    "@type": "WebSite";
    name: string;
    url: string;
    description: string;
    author: PersonSchema;
}

export function generatePersonSchema(): PersonSchema {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "MJ Anglin",
        url: "https://mjanglin.com",
        description: "Developer & Creator",
        image: "https://mjanglin.com/apple-touch-icon.png",
        sameAs: [
            "https://github.com/clxrityy",
            "https://instagram.com/mjxnglin",
            "https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV",
            "https://www.linkedin.com/in/mjanglin1/"
        ]
    };
}

export function generateBlogPostSchema(project: Project): BlogPostSchema {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: project.title,
        description: project.preview,
        datePublished: project.publishedAt,
        author: {
            "@type": "Person",
            name: project.author
        },
        image: `https://mjanglin.com${project.mainImage}`,
        url: project.slug,
        keywords: [...project.keywords]
    };
}

export function generateWebsiteSchema(): WebsiteSchema {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "MJ Anglin",
        url: "https://mjanglin.com",
        description: "Personal website of MJ Anglin - Developer & Creator",
        author: generatePersonSchema()
    };
}
