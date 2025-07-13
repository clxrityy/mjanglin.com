import { MdxPost } from "./types";

/**
 * Fisher-Yates shuffle algorithm to randomize an array
 * @param array - The array to shuffle
 * @returns A new shuffled array
 */
export function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]; // Create a copy to avoid mutating the original

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/**
 * Randomize the order of MDX posts
 * @param posts - Array of MDX posts to randomize
 * @returns A new array with posts in random order
 */
export function randomizePosts(posts: MdxPost[]): MdxPost[] {
    return shuffleArray(posts);
}

/**
 * Get a random subset of posts
 * @param posts - Array of MDX posts
 * @param count - Number of posts to return
 * @returns A new array with a random subset of posts
 */
export function getRandomPosts(posts: MdxPost[], count: number): MdxPost[] {
    const shuffled = shuffleArray(posts);
    return shuffled.slice(0, Math.min(count, posts.length));
}
