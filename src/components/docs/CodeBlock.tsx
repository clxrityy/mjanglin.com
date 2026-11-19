"use client";

import { type ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

type Props = ComponentPropsWithoutRef<"pre"> & { "data-language"?: string };

/**
 * Replaces MDX `pre` (rehype-pretty-code output) and wraps InstallTabs snippets:
 * a toolbar with the language and a copy button above the highlighted code.
 */
export function CodeBlock({ children, ...props }: Readonly<Props>) {
	const pre = useRef<HTMLPreElement>(null);
	const [copied, setCopied] = useState(false);
	const language = props["data-language"];

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), 1500);
		return () => clearTimeout(timer);
	}, [copied]);

	const copy = async () => {
		const text = pre.current?.textContent ?? "";
		try {
			await navigator.clipboard.writeText(text.replace(/\n$/, ""));
			setCopied(true);
		} catch {
			// Clipboard unavailable (insecure context or denied); nothing to do.
		}
	};

	return (
		<div className="code-block">
			<div className="code-block-toolbar">
				{language && language !== "plaintext" ? (
					<span className="code-block-lang">{language}</span>
				) : null}
				<button
					type="button"
					className="code-block-copy"
					onClick={copy}
					aria-label={copied ? "Copied" : "Copy code"}
					title={copied ? "Copied" : "Copy code"}
				>
					{copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
				</button>
			</div>
			<pre ref={pre} {...props}>
				{children}
			</pre>
		</div>
	);
}
