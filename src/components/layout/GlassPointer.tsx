"use client";

import { useEffect } from "react";

/**
 * Moves the sheen on whichever `.glass` surface is under the pointer
 * (see globals.css). One passive listener for the whole site, one write a frame.
 */
export function GlassPointer() {
	useEffect(() => {
		if (!window.matchMedia("(hover: hover)").matches) return;
		let frame = 0;
		let event: PointerEvent | null = null;

		const apply = () => {
			frame = 0;
			const e = event;
			if (!e) return;
			const el = (e.target as Element | null)?.closest?.(
				".glass",
			) as HTMLElement | null;
			if (!el) return;
			// Percentages, so it stays right inside scaled (fit-to-screen) content
			const r = el.getBoundingClientRect();
			el.style.setProperty(
				"--mx",
				`${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`,
			);
			el.style.setProperty(
				"--my",
				`${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`,
			);
		};

		const onMove = (e: PointerEvent) => {
			event = e;
			if (!frame) frame = requestAnimationFrame(apply);
		};

		document.addEventListener("pointermove", onMove, { passive: true });
		return () => {
			cancelAnimationFrame(frame);
			document.removeEventListener("pointermove", onMove);
		};
	}, []);

	return null;
}
