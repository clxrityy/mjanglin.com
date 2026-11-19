"use client";

import "@/styles/home.css";
import { type ReactNode, useId, useState } from "react";
import { Fit } from "./Fit";

type Slots = {
	hero: ReactNode;
	time: ReactNode;
	music: ReactNode;
	miniTime: ReactNode;
	miniMusic: ReactNode;
	about: ReactNode;
	projects: ReactNode;
};

const TABS = [
	{ id: "about", label: "About" },
	{ id: "projects", label: "Projects" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * Home layout. Always fits one screen:
 * - Phone: hero, a dock of mini time/music cards, and an About / Projects switch.
 * - Tablet: hero beside time + music, description below, projects in a strip at the bottom.
 * - Desktop: the same, with projects in a rail on the right.
 */
export function HomeShell({
	hero,
	time,
	music,
	miniTime,
	miniMusic,
	about,
	projects,
}: Readonly<Slots>) {
	const id = useId();
	const [tab, setTab] = useState<TabId>("about");

	const onKeyDown = (event: React.KeyboardEvent) => {
		if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
		event.preventDefault();
		const next = tab === "about" ? "projects" : "about";
		setTab(next);
		document.getElementById(`${id}-tab-${next}`)?.focus();
	};

	return (
		<div className="home" data-tab={tab}>
			<Fit className="home-main">
				<div className="home-stage">
					<div className="home-hero rise-in" style={stagger(0)}>
						{hero}
					</div>

					<div className="home-side">
						<div className="rise-in w-full" style={stagger(1)}>
							{time}
						</div>
						<div className="rise-in" style={stagger(2)}>
							{music}
						</div>
					</div>

					<nav
						className="home-dock rise-in"
						style={stagger(1)}
						aria-label="Time and music"
					>
						{miniTime}
						{miniMusic}
					</nav>

					<div
						className="home-tabs rise-in"
						style={stagger(2)}
						role="tablist"
						aria-label="Home sections"
						onKeyDown={onKeyDown}
					>
						<span className="home-tabs-indicator" aria-hidden="true" />
						{TABS.map((t) => (
							<button
								key={t.id}
								id={`${id}-tab-${t.id}`}
								type="button"
								role="tab"
								aria-selected={tab === t.id}
								aria-controls={`${id}-panel-${t.id}`}
								tabIndex={tab === t.id ? 0 : -1}
								className="home-tab"
								onClick={() => setTab(t.id)}
							>
								{t.label}
							</button>
						))}
					</div>

					<div
						id={`${id}-panel-about`}
						className="home-panel home-about"
						data-panel="about"
						role="tabpanel"
						aria-labelledby={`${id}-tab-about`}
					>
						<div className="rise-in" style={stagger(3)}>
							{about}
						</div>
					</div>

					<div
						id={`${id}-panel-projects`}
						className="home-panel home-projects-mobile"
						data-panel="projects"
						role="tabpanel"
						aria-labelledby={`${id}-tab-projects`}
					>
						<div className="rise-in w-full" style={stagger(3)}>
							{projects}
						</div>
					</div>
				</div>
			</Fit>

			<aside className="home-rail">
				<Fit className="home-rail-fit">
					<div className="home-rail-inner rise-in" style={stagger(4)}>
						{projects}
					</div>
				</Fit>
			</aside>
		</div>
	);
}
