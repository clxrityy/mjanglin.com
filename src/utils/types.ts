export type ProjectParams = {
    name: string;
    description: string;
    link: string;
    github?: string;
    image: string;
    footer?: string;
    tags?: string[];
    style?: {
        gradient_from?: string;
        gradient_to?: string;
    }
}