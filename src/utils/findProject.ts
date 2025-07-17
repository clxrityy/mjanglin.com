import { projects } from "@/config";

export function findProject(title: string) {
    return projects.find(project => (title.toLowerCase() in project || project.slug.toLowerCase().includes(title.toLowerCase())) ?? project.title === title) ?? projects[0];
    // Fallback to the first project if no match is found
}