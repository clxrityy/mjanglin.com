import { Project } from "./types";

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
 * Randomize the order of MDX projects
 * @param projects - Array of MDX projects to randomize
 * @returns A new array with projects in random order
 */
export function randomizeProjects(projects: Project[]): Project[] {
    return shuffleArray(projects);
}

/**
 * Get a random subset of projects
 * @param projects - Array of MDX projects
 * @param count - Number of projects to return
 * @returns A new array with a random subset of projects
 */
export function getRandomProjects(projects: Project[], count: number): Project[] {
    const shuffled = shuffleArray(projects);
    return shuffled.slice(0, Math.min(count, projects.length));
}
