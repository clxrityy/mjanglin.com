"use client";

import {
	Children,
	isValidElement,
	type ReactNode,
	useId,
	useState,
} from "react";

type TabProps = { label: string; children: ReactNode };

/** A single panel inside `<Tabs>`. Only used for its props. */
export function Tab({ children }: Readonly<TabProps>) {
	return <>{children}</>;
}

/**
 * <Tabs>
 *   <Tab label="pnpm">...</Tab>
 *   <Tab label="npm">...</Tab>
 * </Tabs>
 */
export function Tabs({ children }: Readonly<{ children: ReactNode }>) {
	const id = useId();
	const tabs = Children.toArray(children).filter(
		(child): child is React.ReactElement<TabProps> =>
			isValidElement<TabProps>(child) && typeof child.props.label === "string",
	);
	const [active, setActive] = useState(0);

	const onKeyDown = (event: React.KeyboardEvent) => {
		if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
		event.preventDefault();
		const dir = event.key === "ArrowRight" ? 1 : -1;
		const next = (active + dir + tabs.length) % tabs.length;
		setActive(next);
		document.getElementById(`${id}-tab-${next}`)?.focus();
	};

	return (
		<div className="tabs">
			<div className="tabs-list" role="tablist" onKeyDown={onKeyDown}>
				{tabs.map((tab, i) => (
					<button
						key={tab.props.label}
						id={`${id}-tab-${i}`}
						type="button"
						role="tab"
						aria-selected={i === active}
						aria-controls={`${id}-panel-${i}`}
						tabIndex={i === active ? 0 : -1}
						className="tabs-trigger"
						onClick={() => setActive(i)}
					>
						{tab.props.label}
					</button>
				))}
			</div>
			{tabs.map((tab, i) => (
				<div
					key={tab.props.label}
					id={`${id}-panel-${i}`}
					role="tabpanel"
					aria-labelledby={`${id}-tab-${i}`}
					hidden={i !== active}
					className="tabs-panel"
				>
					{tab.props.children}
				</div>
			))}
		</div>
	);
}
