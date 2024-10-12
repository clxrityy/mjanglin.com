import { IconType } from "react-icons/lib";

export type ProjectParams = {
    name: string;
    short_desc: string;
    link: string;
    github?: string;
    examples?: Example[];
    thumbnail?: string;
    description?: string;
    tags?: Tag[];
    style?: {
        gradient_from?: string;
        gradient_to?: string;
    },
    demo_link?: string;
    date: string;
}

type Example = {
    webm: string;
    mp4: string;
}

export type Tag = {
    name: string;
    icon: IconType;
    color: string;
}

export type Blog = {
    title: string;
    date: string;
    description: string;
    link: string;
    thumbnail: string;
    tags: Tag[];
}