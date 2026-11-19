import {
	Children,
	isValidElement,
	type ReactElement,
	type ReactNode,
} from "react";
import { HiOutlineDocument, HiOutlineFolder } from "react-icons/hi";

type Entry = { name: string; note: string | null; children: Entry[] };

type ElementWithChildren = ReactElement<{ children?: ReactNode }>;

function textOf(node: ReactNode): string {
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(textOf).join("");
	if (isValidElement<{ children?: ReactNode }>(node)) {
		return textOf(node.props.children);
	}
	return "";
}

function isList(node: ReactNode): node is ElementWithChildren {
	return isValidElement(node) && (node.type === "ul" || node.type === "ol");
}

function parseList(list: ElementWithChildren): Entry[] {
	const entries: Entry[] = [];
	Children.forEach(list.props.children, (item) => {
		if (!isValidElement<{ children?: ReactNode }>(item)) return;
		const label: ReactNode[] = [];
		const nested: Entry[] = [];
		Children.forEach(item.props.children, (child) => {
			if (isList(child)) nested.push(...parseList(child));
			else label.push(child);
		});
		const [name, ...rest] = textOf(label).trim().split(/\s+/);
		if (!name) return;
		entries.push({ name, note: rest.join(" ") || null, children: nested });
	});
	return entries;
}

function Tree({ entries }: Readonly<{ entries: Entry[] }>) {
	return (
		<ul>
			{entries.map((entry) => {
				const isDir = entry.name.endsWith("/") || entry.children.length > 0;
				const Icon = isDir ? HiOutlineFolder : HiOutlineDocument;
				return (
					<li key={entry.name}>
						<span className="file-tree-row" data-dir={isDir || undefined}>
							<Icon aria-hidden size={15} />
							<span className="file-tree-name">{entry.name}</span>
							{entry.note && (
								<span className="file-tree-note">{entry.note}</span>
							)}
						</span>
						{entry.children.length > 0 && <Tree entries={entry.children} />}
					</li>
				);
			})}
		</ul>
	);
}

/**
 * Renders a markdown list as a file tree. The first word of each item is the path,
 * anything after it is shown as a dimmed note:
 *
 * <FileTree>
 * - src/
 *   - app/ Routes
 *   - config.ts Configuration values
 * </FileTree>
 */
export function FileTree({ children }: Readonly<{ children: ReactNode }>) {
	const lists = Children.toArray(children).filter(isList);
	const entries = lists.flatMap(parseList);

	return (
		<div className="file-tree">
			<Tree entries={entries} />
		</div>
	);
}
