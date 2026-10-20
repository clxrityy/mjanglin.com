import { projects } from "@/config";
import type { Project } from "@/utils/types";

export function findProject(slug: string): Project {
	const project = projects.find((entry) => entry.slug === slug);

	if (!project) {
		throw new Error(`Project not found for slug: ${slug}`);
	}

	return project;
}
