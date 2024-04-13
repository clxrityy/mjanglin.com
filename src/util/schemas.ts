import { z } from "zod";

export const projectSchema = z.object({
    uuid: z.string(),
    url: z.string().optional(),
    title: z.string(),
    image: z.string(),
    description: z.string(),
    color: z.string().optional(),
    footer: z.string().optional(),
    tags: z.array(z.string()).optional(),
});

export const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
    date: z.string(),
    image: z.string(),
});