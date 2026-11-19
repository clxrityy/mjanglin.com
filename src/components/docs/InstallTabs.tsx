import { codeToHtml } from "shiki";
import { CodeBlock } from "./CodeBlock";
import { Tab, Tabs } from "./Tabs";

const MANAGERS = [
	{ name: "pnpm", add: "pnpm add", dev: "-D" },
	{ name: "npm", add: "npm install", dev: "-D" },
	{ name: "yarn", add: "yarn add", dev: "-D" },
] as const;

type Props = {
	/** Space-separated package names. */
	packages: string;
	dev?: boolean;
};

/** Install command for each package manager, highlighted at build time. */
export async function InstallTabs({ packages, dev = false }: Readonly<Props>) {
	const commands = await Promise.all(
		MANAGERS.map(async (manager) => {
			const command = [manager.add, dev ? manager.dev : null, packages]
				.filter(Boolean)
				.join(" ");
			const html = await codeToHtml(command, {
				lang: "bash",
				theme: "github-dark-dimmed",
				structure: "inline",
			});
			return { name: manager.name, html };
		}),
	);

	return (
		<Tabs>
			{commands.map(({ name, html }) => (
				<Tab key={name} label={name}>
					<CodeBlock data-language="bash">
						<code
							data-language="bash"
							// biome-ignore lint/security/noDangerouslySetInnerHtml: build-time Shiki output for a fixed command
							dangerouslySetInnerHTML={{ __html: html }}
						/>
					</CodeBlock>
				</Tab>
			))}
		</Tabs>
	);
}
