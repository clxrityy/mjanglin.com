import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import {
	Badge,
	DocLink,
	DownloadButton,
	LinkCard,
	LinkCards,
	Table,
} from "@/components/docs/Elements";
import { Figure, Figures, Video } from "@/components/docs/Figure";
import { FileTree } from "@/components/docs/FileTree";
import { InstallTabs } from "@/components/docs/InstallTabs";
import { RepoCard } from "@/components/docs/RepoCard";
import { Steps } from "@/components/docs/Steps";
import { Tab, Tabs } from "@/components/docs/Tabs";

/** Available in every .mdx file without importing. */
const docsComponents = {
	a: DocLink,
	pre: CodeBlock,
	table: Table,
	Badge,
	Callout,
	DownloadButton,
	Figure,
	Figures,
	FileTree,
	InstallTabs,
	LinkCard,
	LinkCards,
	RepoCard,
	Steps,
	Tab,
	Tabs,
	Video,
} satisfies MDXComponents;

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...docsComponents,
		...components,
	};
}
