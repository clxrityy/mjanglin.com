export type ProjectParams = {
    name: string;
    short_desc: string;
    link: string;
    github?: string;
    image?: string;
    thumbnail?: string;
    description?: string;
    tags?: string[];
    style?: {
        gradient_from?: string;
        gradient_to?: string;
    },
    demo_link?: string;
}