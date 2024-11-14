import { client } from "./client";
import { Author, type Post } from "@/utils/types";

export async function getAllPosts(): Promise<Post[]> {
  const data = await client.fetch(`*[_type == "post"]{
    title,
    slug,
    publishedAt,
    mainImage,
    body,
    tags,
    _id,
    author->{name, slug, image, _id},
  }`);
  return data as Post[];
}

export async function getAuthor(id: string) {
    const query = `*[_type == "author" && _id == $id][0]`;

    const data = await client.fetch(query, { id });

    return data as Author;
}