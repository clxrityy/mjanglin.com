"use server";
import { projectSchema } from "@/util/schemas";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";


export default async function getProject(uuid: string) {
    try {
        const project = await sql`SELECT * FROM projects WHERE uuid = ${uuid}`;

    if (!project) {
        return null;
    }

    return projectSchema.parse(project.rows[0]);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function getProjects() {
    const projects = await sql`SELECT * FROM projects`;

    return projects.rows.map((project) => projectSchema.parse(project));
}

export async function addProject(data: z.infer<typeof projectSchema>) {
    const { uuid, url, title, image, description, color, footer } = data;

    try {

        const project = await sql`
    INSERT INTO projects (id, uuid, url, title, image, description, color, footer)
    VALUES (DEFAULT, ${uuid}, ${url}, ${title}, ${image}, ${description}, ${color}, ${footer})
    `;

        revalidatePath("/");
        return projectSchema.parse(project);
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function createProjectTable() {
    try {
        await sql`
    CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        uuid TEXT,
        url TEXT,
        title TEXT,
        image TEXT,
        description TEXT,
        color TEXT,
        footer TEXT
    )
    `;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function deleteProject(uuid: string) {
    try {
        await sql`
    DELETE FROM projects WHERE uuid = ${uuid}
    `;
    revalidatePath(`/admin/${process.env.ADMIN_PASS}`);
    } catch (e) {
        console.error(e);
        throw e;
    }
}