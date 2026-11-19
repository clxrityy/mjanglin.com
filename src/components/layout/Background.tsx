"use client";

import "@/styles/layout/background.css";
import { useEffect, useRef } from "react";

/**
 * A very faint 3D network that turns slowly behind the whole site, with the odd
 * pulse of light tracing a path through it. Drawn on a 2D canvas: no libraries,
 * ~30fps, paused while the tab is hidden, and a single still frame for
 * reduced motion. Frosted surfaces (project cards) blur and recolour it.
 */

type Node = { x: number; y: number; z: number; links: number[] };
type Pulse = { path: number[]; t: number; speed: number };
type Field = {
	nodes: Node[];
	edges: [number, number][];
	rx: number;
	ry: number;
};

const LINE = "150 175 230";
const TRACE = "175 205 255";
const FPS = 30;
const SPIN = (Math.PI * 2) / 260; // one turn every ~4 minutes
const CAMERA = 3.6;
const TRAIL = 0.85; // pulse tail length, in edges

// Small seeded RNG so the network is the same shape on every visit.
function rng(seed: number) {
	let a = seed;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Scatter nodes through an ellipsoid sized to cover the screen, then link near neighbours. */
function build(w: number, h: number): Field {
	const scale = Math.min(w, h) * 0.5;
	const rx = Math.max(1.15, (1.2 * w) / 2 / scale);
	const ry = Math.max(1.15, (1.2 * h) / 2 / scale);
	const rz = rx; // turns about the vertical axis, so keep it round in plan
	const count = w < 640 ? 46 : w < 1280 ? 70 : 86;
	const spacing = Math.cbrt(((4 / 3) * Math.PI * rx * ry * rz) / count) * 0.78;

	const rand = rng(7);
	const nodes: Node[] = [];
	for (let tries = 0; nodes.length < count && tries < count * 60; tries++) {
		const x = (rand() * 2 - 1) * rx;
		const y = (rand() * 2 - 1) * ry;
		const z = (rand() * 2 - 1) * rz;
		if ((x / rx) ** 2 + (y / ry) ** 2 + (z / rz) ** 2 > 1) continue;
		if (nodes.some((n) => Math.hypot(n.x - x, n.y - y, n.z - z) < spacing))
			continue;
		nodes.push({ x, y, z, links: [] });
	}

	const edges: [number, number][] = [];
	const seen = new Set<string>();
	nodes.forEach((n, i) => {
		const near = nodes
			.map((m, j) => ({ j, d: Math.hypot(n.x - m.x, n.y - m.y, n.z - m.z) }))
			.filter(({ j, d }) => j !== i && d < spacing * 2.3)
			.sort((a, b) => a.d - b.d)
			.slice(0, rand() < 0.3 ? 3 : 2);
		for (const { j } of near) {
			const key = i < j ? `${i}-${j}` : `${j}-${i}`;
			if (seen.has(key)) continue;
			seen.add(key);
			edges.push([i, j]);
			n.links.push(j);
			nodes[j].links.push(i);
		}
	});

	return { nodes, edges, rx, ry };
}

/** A short random walk through the network that doesn't double back. */
function walk(field: Field, rand: () => number): Pulse | null {
	const start = Math.floor(rand() * field.nodes.length);
	const path = [start];
	const steps = 4 + Math.floor(rand() * 6);
	for (let s = 0; s < steps; s++) {
		const here = field.nodes[path[path.length - 1]];
		const options = here.links.filter((l) => !path.includes(l));
		if (!options.length) break;
		path.push(options[Math.floor(rand() * options.length)]);
	}
	if (path.length < 3) return null;
	return { path, t: 0, speed: 0.7 + rand() * 0.5 };
}

export function Background() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const still = window.matchMedia("(prefers-reduced-motion: reduce)");
		const rand = rng(Date.now() & 0xffff);
		let field: Field | null = null;
		let w = 0;
		let h = 0;
		let px: Float32Array = new Float32Array(0); // projected x, y, depth per node
		let pulses: Pulse[] = [];
		let nextPulse = 1.5;
		let clock = 40; // start part-way round so it doesn't open face-on
		let last = 0;
		let frame = 0;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = canvas.clientWidth;
			h = canvas.clientHeight;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			// Rebuild only when the shape of the screen really changes, so a phone's
			// address bar sliding in and out doesn't reshuffle everything.
			const next = build(w, h);
			if (
				!field ||
				Math.abs(next.rx - field.rx) / field.rx > 0.15 ||
				Math.abs(next.ry - field.ry) / field.ry > 0.15
			) {
				field = next;
				px = new Float32Array(field.nodes.length * 3);
				pulses = [];
			}
			draw();
		};

		const project = () => {
			if (!field) return;
			const { nodes, rx } = field;
			const scale = Math.min(w, h) * 0.5;
			const yaw = clock * SPIN;
			const tilt = -0.34 + Math.sin(clock * 0.045) * 0.05;
			const cy = Math.cos(yaw);
			const sy = Math.sin(yaw);
			const ct = Math.cos(tilt);
			const st = Math.sin(tilt);
			nodes.forEach((n, i) => {
				const x1 = n.x * cy - n.z * sy;
				const z1 = n.x * sy + n.z * cy;
				const y2 = n.y * ct - z1 * st;
				const z2 = n.y * st + z1 * ct;
				const p = CAMERA / (CAMERA + z2);
				px[i * 3] = w / 2 + x1 * p * scale;
				px[i * 3 + 1] = h / 2 + y2 * p * scale;
				// 1 = nearest, 0 = furthest
				px[i * 3 + 2] = Math.min(1, Math.max(0, 0.5 - z2 / (2 * rx)));
			});
		};

		const draw = () => {
			if (!field) return;
			project();
			ctx.clearRect(0, 0, w, h);
			ctx.lineCap = "round";

			for (const [a, b] of field.edges) {
				const d = (px[a * 3 + 2] + px[b * 3 + 2]) / 2;
				ctx.strokeStyle = `rgb(${LINE} / ${0.016 + d * 0.044})`;
				ctx.lineWidth = 0.6 + d * 0.5;
				ctx.beginPath();
				ctx.moveTo(px[a * 3], px[a * 3 + 1]);
				ctx.lineTo(px[b * 3], px[b * 3 + 1]);
				ctx.stroke();
			}

			field.nodes.forEach((n, i) => {
				const d = px[i * 3 + 2];
				ctx.fillStyle = `rgb(${LINE} / ${0.035 + d * 0.09})`;
				ctx.beginPath();
				ctx.arc(
					px[i * 3],
					px[i * 3 + 1],
					(n.links.length > 3 ? 1.6 : 1) * (0.7 + d * 0.6),
					0,
					Math.PI * 2,
				);
				ctx.fill();
			});

			for (const pulse of pulses) drawPulse(pulse);
		};

		// The pulse's position along its path, in screen space.
		const at = (pulse: Pulse, t: number): [number, number] => {
			const k = Math.min(Math.floor(t), pulse.path.length - 2);
			const f = t - k;
			const a = pulse.path[k] * 3;
			const b = pulse.path[k + 1] * 3;
			return [
				px[a] + (px[b] - px[a]) * f,
				px[a + 1] + (px[b + 1] - px[a + 1]) * f,
			];
		};

		const drawPulse = (pulse: Pulse) => {
			const end = pulse.path.length - 1;
			const head = Math.min(pulse.t, end);
			const tail = Math.max(0, pulse.t - TRAIL);
			if (head <= tail) return;
			// Fade in as it sets off and out as it arrives
			const fade = Math.min(1, pulse.t / 0.6, (end + TRAIL - pulse.t) / 0.8);
			const steps = 10;
			let [x0, y0] = at(pulse, tail);
			for (let s = 1; s <= steps; s++) {
				const t = tail + ((head - tail) * s) / steps;
				const [x1, y1] = at(pulse, t);
				ctx.strokeStyle = `rgb(${TRACE} / ${(s / steps) ** 2 * 0.24 * fade})`;
				ctx.lineWidth = 1.2;
				ctx.beginPath();
				ctx.moveTo(x0, y0);
				ctx.lineTo(x1, y1);
				ctx.stroke();
				x0 = x1;
				y0 = y1;
			}
			if (pulse.t < end) {
				ctx.fillStyle = `rgb(${TRACE} / ${0.32 * fade})`;
				ctx.beginPath();
				ctx.arc(x0, y0, 1.4, 0, Math.PI * 2);
				ctx.fill();
			}
		};

		const tick = (now: number) => {
			frame = requestAnimationFrame(tick);
			const dt = (now - last) / 1000;
			if (dt < 1 / FPS - 0.002) return;
			last = now;
			const step = Math.min(dt, 0.1); // don't lurch after a dropped frame
			clock += step;

			if (field) {
				nextPulse -= step;
				const max = w < 640 ? 2 : 3;
				if (nextPulse <= 0 && pulses.length < max) {
					const p = walk(field, rand);
					if (p) pulses.push(p);
					nextPulse = 2 + rand() * 3;
				}
				for (const p of pulses) p.t += p.speed * step;
				pulses = pulses.filter((p) => p.t < p.path.length - 1 + TRAIL);
			}
			draw();
		};

		const start = () => {
			cancelAnimationFrame(frame);
			if (still.matches || document.hidden) {
				draw();
				return;
			}
			last = performance.now();
			frame = requestAnimationFrame(tick);
		};

		const observer = new ResizeObserver(resize);
		observer.observe(canvas);
		resize();
		start();
		canvas.dataset.ready = "";

		document.addEventListener("visibilitychange", start);
		still.addEventListener("change", start);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			document.removeEventListener("visibilitychange", start);
			still.removeEventListener("change", start);
		};
	}, []);

	return <canvas ref={ref} className="bg-network" />;
}
