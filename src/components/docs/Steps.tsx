import type { ReactNode } from "react";

/**
 * Numbered walkthrough. Each `### Heading` inside becomes a numbered step:
 *
 * <Steps>
 * ### Clone the repo
 * ...
 * ### Install dependencies
 * ...
 * </Steps>
 */
export function Steps({ children }: Readonly<{ children: ReactNode }>) {
	return <div className="steps">{children}</div>;
}
