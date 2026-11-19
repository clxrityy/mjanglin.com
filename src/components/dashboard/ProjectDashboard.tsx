"use client";

import "@/styles/dashboard.css";
import Link from "next/link";
import {
	type CSSProperties,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { HiArrowRight, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { DASHBOARD } from "@/utils/constants";
import type { Project } from "@/utils/types";
import { ProjectTile } from "./ProjectTile";
import { useRotatingDeck } from "./useRotatingDeck";

type Props = {
	/** Already ordered by the server; the first SLOTS are rendered initially. */
	projects: Project[];
};

function preloadImage(project: Project) {
	return new Promise<void>((resolve) => {
		if (!project.mainImage) return resolve();
		const img = new window.Image();
		const done = () => resolve();
		img.onload = done;
		img.onerror = done;
		// Never hold a swap hostage to a slow image.
		window.setTimeout(done, 2500);
		img.src = project.mainImage;
	});
}

function usePageVisible() {
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		const update = () => setVisible(document.visibilityState === "visible");
		update();
		document.addEventListener("visibilitychange", update);
		return () => document.removeEventListener("visibilitychange", update);
	}, []);
	return visible;
}

function useReducedMotion() {
	const [reduced, setReduced] = useState(false);
	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduced(query.matches);
		update();
		query.addEventListener("change", update);
		return () => query.removeEventListener("change", update);
	}, []);
	return reduced;
}

function useOnScreen<T extends Element>(ref: React.RefObject<T | null>) {
	const [onScreen, setOnScreen] = useState(false);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => setOnScreen(entry.isIntersecting),
			{ threshold: 0.35 },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [ref]);
	return onScreen;
}

export function ProjectDashboard({ projects }: Readonly<Props>) {
	const rootRef = useRef<HTMLElement>(null);
	const pageVisible = usePageVisible();
	const onScreen = useOnScreen(rootRef);
	const reducedMotion = useReducedMotion();
	const [hovered, setHovered] = useState(false);
	const [focused, setFocused] = useState(false);
	const [paused, setPaused] = useState(false);

	const active = pageVisible && onScreen && !hovered && !focused && !paused;

	const { slots, settle, shuffleAll, rotating, canShuffle } = useRotatingDeck(
		projects,
		{
			slots: DASHBOARD.SLOTS,
			startDelayMs: DASHBOARD.START_DELAY_MS,
			intervalMs: DASHBOARD.ROTATE_INTERVAL_MS,
			transitionMs: DASHBOARD.TRANSITION_MS,
			passes: DASHBOARD.PASSES,
			active,
			disabled: reducedMotion,
			preload: preloadImage,
		},
	);

	const onBlur = useCallback((event: React.FocusEvent<HTMLUListElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
			setFocused(false);
		}
	}, []);

	return (
		<section
			ref={rootRef}
			aria-labelledby="dashboard-heading"
			className="dashboard"
			style={
				{
					"--tile-transition": `${DASHBOARD.TRANSITION_MS}ms`,
				} as CSSProperties
			}
			onPointerEnter={() => setHovered(true)}
			onPointerLeave={() => setHovered(false)}
		>
			<header className="dashboard-header">
				<h2 id="dashboard-heading" className="dashboard-title">
					Projects
				</h2>
				<div className="dashboard-controls">
					{rotating ? (
						<button
							type="button"
							className="dashboard-button"
							onClick={() => setPaused((p) => !p)}
							aria-pressed={paused}
						>
							{paused ? "Play" : "Pause"}
						</button>
					) : (
						canShuffle && (
							<button
								type="button"
								className="dashboard-button"
								onClick={shuffleAll}
								aria-label="Show other projects"
							>
								<HiOutlineSwitchHorizontal aria-hidden size={14} />
								<span>Shuffle</span>
							</button>
						)
					)}
					<Link href="/projects" className="dashboard-button">
						<span>All</span>
						<HiArrowRight aria-hidden size={14} />
					</Link>
				</div>
			</header>

			{/* Pause while a tile has keyboard focus so it can't swap out from under the user. */}
			<ul
				className="dashboard-grid"
				onFocus={() => setFocused(true)}
				onBlur={onBlur}
			>
				{slots.map((slot, index) => (
					<li
						// Slots are positional; their contents change.
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed slot positions
						key={index}
						className="dashboard-slot"
					>
						{slot.previous && (
							<div
								className="tile-layer tile-exit"
								inert
								onAnimationEnd={() => settle(index, slot.version)}
							>
								<ProjectTile project={slot.previous} hidden />
							</div>
						)}
						<div
							key={`${slot.current.slug}-${slot.version}`}
							className={`tile-layer ${slot.version > 0 ? "tile-enter" : ""}`}
						>
							<ProjectTile project={slot.current} />
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
