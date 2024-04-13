"use server";
import { blogSchema } from "@/util/schemas";
import { sql } from "@vercel/postgres";
import { z } from "zod";

export async function createBlogTable() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS blogs (
            id SERIAL PRIMARY KEY,
            title TEXT,
            content TEXT,
            date DATE,
            image TEXT,
        )`;

    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function addBlog(data: z.infer<typeof blogSchema>) {
    const { title, content, date, image } = data;

    try {
        const blog = await sql`
        INSERT INTO blogs (id, title, content, date, image)
        VALUES (DEFAULT, ${title}, ${content}, ${date}, ${image})
        `;

        return blog;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function getBlog(id: string) {
    const blog = await sql`SELECT * FROM blogs WHERE id = ${id}`;

    if (!blog) {
        return null;
    }

    return blogSchema.parse(blog);
}