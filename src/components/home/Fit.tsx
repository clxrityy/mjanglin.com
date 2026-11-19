"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Pre-paint sizing: the same calculation as `fit()` below, run inline as soon as the
 * HTML arrives so the first paint is already the right size. If the content isn't
 * laid out yet (streamed into a hidden container, or display:none at this breakpoint)
 * it retries for a few seconds, then leaves it to the React effect.
 */
const FIT_SCRIPT = `(function(){function fit(o){var n=o.firstElementChild;if(!n)return false;var h=n.offsetHeight,w=n.scrollWidth;if(!h||!w)return false;var s=Math.min(1,o.clientHeight/h,o.clientWidth/w);var prev=parseFloat(o.style.getPropertyValue('--fit-scale'));if(isNaN(prev)||Math.abs(prev-s)>=0.005)o.style.setProperty('--fit-scale',String(s));o.setAttribute('data-ready','');return true}var tries=0;function run(){var all=document.querySelectorAll('.fit:not([data-ready])'),pending=0;for(var i=0;i<all.length;i++)if(!fit(all[i]))pending++;if(pending&&++tries<250)setTimeout(run,16)}run()})();`;

/** Place once after the fitted content so the first paint is already sized. */
export function FitScript() {
	// biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party sizing script
	return <script dangerouslySetInnerHTML={{ __html: FIT_SCRIPT }} />;
}

function fit(outer: HTMLElement) {
	const inner = outer.firstElementChild as HTMLElement | null;
	if (!inner) return;
	const h = inner.offsetHeight;
	const w = inner.scrollWidth;
	if (!h || !w) return;
	const next = Math.min(1, outer.clientHeight / h, outer.clientWidth / w);
	const prev = Number.parseFloat(outer.style.getPropertyValue("--fit-scale"));
	// Ignore sub-pixel jitter so nothing shimmers while images load.
	if (Number.isNaN(prev) || Math.abs(prev - next) >= 0.005) {
		outer.style.setProperty("--fit-scale", String(next));
	}
	outer.setAttribute("data-ready", "");
}

/**
 * Keeps the home page on one screen at any size without scrolling.
 * Content is measured at its natural size (CSS transforms don't affect layout),
 * so resizing never feeds back into itself.
 */
export function Fit({
	children,
	className,
}: Readonly<{ children: ReactNode; className?: string }>) {
	const outer = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const o = outer.current;
		const i = o?.firstElementChild;
		if (!o || !i) return;
		const measure = () => fit(o);
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(o);
		observer.observe(i);
		return () => observer.disconnect();
	}, []);

	return (
		// The pre-paint script sets the scale and data-ready before React hydrates.
		<div ref={outer} className={cn("fit", className)} suppressHydrationWarning>
			<div className="fit-inner">{children}</div>
		</div>
	);
}
