"use client";

import { useEffect, useRef } from "react";
import type { Condition, Phase } from "@/lib/sky";

type Props = {
	condition: Condition;
	phase: Phase;
	intensity: number;
	/** 0–1 across the daylight hours, or null at night */
	daylight: number | null;
	cloudCover: number;
	windSpeed: number;
};

type Drop = { x: number; y: number; v: number; len: number; a: number };
type Flake = {
	x: number;
	y: number;
	v: number;
	r: number;
	phase: number;
	a: number;
};
type Star = { x: number; y: number; r: number; phase: number; speed: number };
type Mote = {
	x: number;
	y: number;
	r: number;
	vx: number;
	vy: number;
	phase: number;
};

const FPS = 30;

/**
 * The weather page's backdrop: soft washes of the sky's colours (set as CSS
 * variables on an ancestor, see lib/sky.ts), drifting clouds, and a canvas for
 * whatever is falling or shining. Translucent throughout, so the site's network
 * background still shows. Paused while hidden; one still frame for reduced motion.
 */
export function SkyScene({
	condition,
	phase,
	intensity,
	daylight,
	cloudCover,
	windSpeed,
}: Readonly<Props>) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const flashRef = useRef<HTMLDivElement>(null);

	const night = phase === "night";
	const wet =
		condition === "rain" || condition === "drizzle" || condition === "storm";
	const clouds =
		condition === "fog"
			? 0
			: Math.round(
					Math.min(
						5,
						(cloudCover / 100) * 5 +
							(condition === "cloudy" || wet || condition === "snow" ? 1 : 0),
					),
				);

	// Sun (or moon) glow: rises on the left, sets on the right.
	const arc = daylight ?? 0.25;
	const glowX = night ? 78 : 12 + arc * 76;
	const glowY = night ? 10 : 34 - Math.sin(arc * Math.PI) * 28;

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const still = window.matchMedia("(prefers-reduced-motion: reduce)");
		let w = 0;
		let h = 0;
		let frame = 0;
		let last = 0;
		let clock = 0;
		let drops: Drop[] = [];
		let flakes: Flake[] = [];
		let stars: Star[] = [];
		let motes: Mote[] = [];
		let flashTimer = 0;

		const slant = Math.min(0.35, windSpeed / 60);
		const rainy = wet;
		const snowy = condition === "snow";
		const starry = night && (condition === "clear" || condition === "partly");
		const sunny = !night && (condition === "clear" || condition === "partly");

		const seed = () => {
			const area = (w * h) / (1440 * 900);
			if (rainy) {
				const light = condition === "drizzle";
				const n = Math.round((light ? 50 : 90 + 220 * intensity) * area);
				drops = Array.from({ length: n }, () => ({
					x: Math.random() * (w + 200) - 100,
					y: Math.random() * h,
					v: (light ? 520 : 900) + Math.random() * 400,
					len: light ? 6 + Math.random() * 6 : 12 + Math.random() * 16,
					a: 0.08 + Math.random() * 0.2,
				}));
			}
			if (snowy) {
				const n = Math.round((50 + 150 * intensity) * area);
				flakes = Array.from({ length: n }, () => ({
					x: Math.random() * w,
					y: Math.random() * h,
					v: 22 + Math.random() * 46,
					r: 0.8 + Math.random() * 2,
					phase: Math.random() * Math.PI * 2,
					a: 0.25 + Math.random() * 0.5,
				}));
			}
			if (starry) {
				const n = Math.round(150 * area);
				stars = Array.from({ length: n }, () => ({
					x: Math.random() * w,
					y: Math.random() ** 1.6 * h * 0.75,
					r: Math.random() < 0.08 ? 1.3 : 0.5 + Math.random() * 0.6,
					phase: Math.random() * Math.PI * 2,
					speed: 0.4 + Math.random() * 1.4,
				}));
			}
			if (sunny) {
				motes = Array.from({ length: 14 }, () => ({
					x: Math.random() * w,
					y: Math.random() * h,
					r: 30 + Math.random() * 90,
					vx: (Math.random() - 0.5) * 6,
					vy: -3 - Math.random() * 6,
					phase: Math.random() * Math.PI * 2,
				}));
			}
		};

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = canvas.clientWidth;
			h = canvas.clientHeight;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			seed();
			draw(0);
		};

		const styles = getComputedStyle(canvas);
		const accent =
			styles.getPropertyValue("--sky-accent").trim() || "200 210 255";
		const glow = styles.getPropertyValue("--sky-glow").trim() || "255 230 180";

		const draw = (dt: number) => {
			ctx.clearRect(0, 0, w, h);

			for (const s of stars) {
				const tw = 0.5 + 0.5 * Math.sin(clock * s.speed + s.phase);
				ctx.fillStyle = `rgb(235 238 255 / ${0.12 + tw * 0.5})`;
				ctx.beginPath();
				ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
				ctx.fill();
			}

			for (const m of motes) {
				m.x += m.vx * dt;
				m.y += m.vy * dt;
				if (m.y < -m.r) {
					m.y = h + m.r;
					m.x = Math.random() * w;
				}
				const a = 0.035 + 0.025 * Math.sin(clock * 0.4 + m.phase);
				const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r);
				g.addColorStop(0, `rgb(${glow} / ${a})`);
				g.addColorStop(1, `rgb(${glow} / 0)`);
				ctx.fillStyle = g;
				ctx.beginPath();
				ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
				ctx.fill();
			}

			if (drops.length) {
				ctx.lineCap = "round";
				ctx.lineWidth = 1;
				for (const d of drops) {
					d.y += d.v * dt;
					d.x += d.v * slant * dt;
					if (d.y - d.len > h) {
						d.y = -d.len - Math.random() * 60;
						d.x = Math.random() * (w + 200) - 100 - h * slant;
					}
					ctx.strokeStyle = `rgb(${accent} / ${d.a})`;
					ctx.beginPath();
					ctx.moveTo(d.x, d.y);
					ctx.lineTo(d.x - d.len * slant, d.y - d.len);
					ctx.stroke();
				}
			}

			for (const f of flakes) {
				f.y += f.v * dt;
				f.x += (Math.sin(clock * 0.8 + f.phase) * 18 + windSpeed * 0.6) * dt;
				if (f.y - f.r > h) {
					f.y = -f.r;
					f.x = Math.random() * w;
				}
				if (f.x > w + 4) f.x = -4;
				ctx.fillStyle = `rgb(245 248 255 / ${f.a})`;
				ctx.beginPath();
				ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
				ctx.fill();
			}
		};

		const tick = (now: number) => {
			frame = requestAnimationFrame(tick);
			const elapsed = (now - last) / 1000;
			if (elapsed < 1 / FPS - 0.002) return;
			last = now;
			const dt = Math.min(elapsed, 0.1);
			clock += dt;
			draw(dt);
		};

		// Lightning: an occasional double flicker of the whole sky
		const flash = () => {
			const el = flashRef.current;
			if (el && !document.hidden) {
				el.classList.remove("is-flashing");
				void el.offsetWidth; // restart the animation
				el.classList.add("is-flashing");
			}
			flashTimer = window.setTimeout(flash, 5000 + Math.random() * 9000);
		};

		const start = () => {
			cancelAnimationFrame(frame);
			window.clearTimeout(flashTimer);
			if (still.matches || document.hidden) {
				draw(0);
				return;
			}
			last = performance.now();
			frame = requestAnimationFrame(tick);
			if (condition === "storm") {
				flashTimer = window.setTimeout(flash, 2500 + Math.random() * 3000);
			}
		};

		const observer = new ResizeObserver(resize);
		observer.observe(canvas);
		resize();
		start();
		document.addEventListener("visibilitychange", start);
		still.addEventListener("change", start);
		return () => {
			cancelAnimationFrame(frame);
			window.clearTimeout(flashTimer);
			observer.disconnect();
			document.removeEventListener("visibilitychange", start);
			still.removeEventListener("change", start);
		};
	}, [condition, intensity, night, wet, windSpeed]);

	return (
		<div
			className="wx-sky"
			data-condition={condition}
			data-phase={phase}
			aria-hidden="true"
			style={
				{
					"--glow-x": `${glowX}%`,
					"--glow-y": `${glowY}%`,
				} as React.CSSProperties
			}
		>
			<div className="wx-wash" />
			<div className="wx-orb" />
			<div className="wx-haze" />
			{Array.from({ length: clouds }, (_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative list
					key={i}
					className="wx-cloud"
					style={{ "--n": i } as React.CSSProperties}
				/>
			))}
			{condition === "fog" && (
				<>
					<div className="wx-fog" />
					<div className="wx-fog wx-fog-2" />
				</>
			)}
			<canvas ref={canvasRef} className="wx-particles" />
			<div ref={flashRef} className="wx-flash" />
		</div>
	);
}
