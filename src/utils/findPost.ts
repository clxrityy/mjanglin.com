import { mdxPosts } from "@/config";

export function findPost(title: string) {
    return mdxPosts.find(post => (title.toLowerCase() in post || post.slug.toLowerCase().includes(title.toLowerCase())) ?? post.title === title) ?? mdxPosts[0];
    // Fallback to the first post if no match is found
}