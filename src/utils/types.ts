export type ProjectParams = {
    name: string;
    short_desc: string;
    link: string;
    github?: string;
    examples?: Example[];
    thumbnail?: string;
    description?: string;
    tags?: string[];
    style?: {
        gradient_from?: string;
        gradient_to?: string;
    },
    demo_link?: string;
}

type Example = {
    webm: string;
    mp4: string;
}