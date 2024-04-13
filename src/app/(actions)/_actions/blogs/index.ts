"use server";
import { blogSchema } from "@/util/schemas";
import { sql } from "@vercel/postgres";
import { z } from "zod";

export async function createBlogTable() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS blogs (
            id SERIAL PRIMARY KEY,
            uuid TEXT,
            title TEXT,
            content TEXT,
            date DATE,
            image TEXT,
            blogType TEXT
        )
        `;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function addBlog(data: z.infer<typeof blogSchema>, uuid: string) {
    const { title, content, date, image, blogType } = data;

    try {
        const blog = await sql`
        INSERT INTO blogs (id, uuid, title, content, date, image, blogType)
        VALUES (DEFAULT, ${uuid}, ${title}, ${content}, ${date}, ${image}, ${blogType})
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

export async function getBlogs() {
    try {

        const blogs = await sql`SELECT * FROM blogs`;
        return blogs.rows.map((blog) => blogSchema.parse(blog));

    } catch (e) {
        console.error(e);
        throw e;
    }
}