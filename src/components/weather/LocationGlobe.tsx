"use client";

import { useEffect, useRef } from "react";
import { isLand } from "@/lib/geo/land";

type Props = {
	lat: number;
	lon: number;
	label: string;
};

const D2R = Math.PI / 180;
const FPS = 30;
const INTRO = 2.6; // seconds to fly in to the location
const STEP = 1.4; // degrees between dots

type Vec = [number, number, number];

const toVec = (lat: number, lon: number): Vec => {
	const c = Math.cos(lat * D2R);
	return [
		c * Math.sin(lon * D2R),
		Math.sin(lat * D2R),
		c * Math.cos(lon * D2R),
	];
};

let DOTS: Float32Array | null = null;

/** Land as evenly spaced points on the unit sphere (x, y, z per dot). */
function dots(): Float32Array {
	if (DOTS) return DOTS;
	const out: number[] = [];
	for (let lat = -86 + STEP / 2; lat < 86; lat += STEP) {
		const lonStep = STEP / Math.max(Math.cos(lat * D2R), 0.12);
		for (let lon = -180; lon < 180; lon += lonStep) {
			if (isLand(lat, lon)) out.push(...toVec(lat, lon));
		}
	}
	DOTS = new Float32Array(out);
	return DOTS;
}

/** The point on Earth with the sun directly overhead (good to a degree or so). */
function subsolar(date: Date): Vec {
	const start = Date.UTC(date.getUTCFullYear(), 0, 0);
	const day = (date.getTime() - start) / 864e5;
	const decl = -23.44 * Math.cos(((2 * Math.PI) / 365) * (day + 10));
	const hours = date.getUTCHours() + date.getUTCMinutes() / 60;
	return toVec(decl, -15 * (hours - 12));
}

/** Seeded RNG, so a place always gets the same set of arcs. */
function rng(seed: number) {
	let a = seed | 0;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const slerp = (a: Vec, b: Vec, t: number, omega: number): Vec => {
	const s = Math.sin(omega);
	const ka = Math.sin((1 - t) * omega) / s;
	const kb = Math.sin(t * omega) / s;
	return [a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb];
};

const easeOut = (t: number) => 1 - (1 - t) ** 3;

/** A few great-circle arcs out from the location to land elsewhere, like links in a network. */
function buildArcs(lat: number, lon: number) {
	const rand = rng(Math.round(lat * 100) * 7919 + Math.round(lon * 100));
	const from = toVec(lat, lon);
	const arcs: { points: Vec[]; offset: number; speed: number }[] = [];
	for (let tries = 0; arcs.length < 5 && tries < 400; tries++) {
		const tLat = lat + (rand() - 0.5) * 110;
		const tLon = lon + (rand() - 0.5) * 160;
		if (Math.abs(tLat) > 70 || !isLand(tLat, tLon)) continue;
		const to = toVec(tLat, tLon);
		const omega = Math.acos(
			Math.min(1, from[0] * to[0] + from[1] * to[1] + from[2] * to[2]),
		);
		if (omega < 22 * D2R || omega > 75 * D2R) continue;
		const lift = 0.08 + omega * 0.22;
		const points: Vec[] = [];
		for (let i = 0; i <= 48; i++) {
			const t = i / 48;
			const p = slerp(from, to, t, omega);
			const k = 1 + Math.sin(t * Math.PI) * lift;
			points.push([p[0] * k, p[1] * k, p[2] * k]);
		}
		arcs.push({ points, offset: rand() * 3, speed: 0.22 + rand() * 0.12 });
	}
	return arcs;
}

/**
 * A slowly turning dot-matrix globe that flies in to the visitor's rough
 * location and marks it. Day and night are lit from the sun's real position.
 * Drag to spin it; it eases back. Colours come from the page's sky variables.
 */
export function LocationGlobe({ lat, lon, label }: Readonly<Props>) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		const styles = getComputedStyle(canvas);
		const accent =
			styles.getPropertyValue("--sky-accent").trim() || "160 180 255";
		const glow = styles.getPropertyValue("--sky-glow").trim() || "200 210 255";

		const still = window.matchMedia("(prefers-reduced-motion: reduce)");
		const pts = dots();
		const count = pts.length / 3;
		const light = new Float32Array(count);
		const arcs = buildArcs(lat, lon);
		const target = toVec(lat, lon);

		// Light each dot by the sun, refreshed once a minute.
		let lastSun = 0;
		const relight = () => {
			const sun = subsolar(new Date());
			for (let i = 0; i < count; i++) {
				light[i] =
					pts[i * 3] * sun[0] +
					pts[i * 3 + 1] * sun[1] +
					pts[i * 3 + 2] * sun[2];
			}
			lastSun = Date.now();
		};
		relight();

		// Buckets of dots by brightness, so each frame is a few fills, not thousands.
		const LEVELS = 10;
		const buckets = Array.from(
			{ length: LEVELS * 2 },
			() => new Float32Array(count * 3),
		);
		const fill = new Int32Array(LEVELS * 2);

		let w = 0;
		let h = 0;
		let clock = still.matches ? INTRO + 1 : 0;
		let last = 0;
		let frame = 0;
		let visible = true;

		// Drag offset (degrees), springing back after release
		let dragLon = 0;
		let dragLat = 0;
		let velLon = 0;
		let velLat = 0;
		let dragging: { x: number; y: number; lon: number; lat: number } | null =
			null;

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			w = canvas.clientWidth;
			h = canvas.clientHeight;
			canvas.width = Math.round(w * dpr);
			canvas.height = Math.round(h * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			draw();
		};

		const draw = () => {
			if (!w || !h) return;
			const intro = easeOut(Math.min(1, clock / INTRO));
			const R = (Math.min(w, h) / 2) * (0.74 + 0.08 * intro);
			const cx = w / 2;
			const cy = h / 2;

			// View centre: fly in from the far side, then sway gently.
			const sway = clock > INTRO ? clock - INTRO : 0;
			const viewLon =
				lon +
				(1 - intro) * 150 +
				Math.sin(sway * 0.16) * 9 * Math.min(1, sway / 3) +
				dragLon;
			const viewLat = Math.max(
				-80,
				Math.min(
					80,
					lat * (0.35 + 0.65 * intro) +
						Math.sin(sway * 0.11) * 3 * Math.min(1, sway / 3) +
						dragLat,
				),
			);
			const cl = Math.cos(viewLon * D2R);
			const sl = Math.sin(viewLon * D2R);
			const ct = Math.cos(viewLat * D2R);
			const st = Math.sin(viewLat * D2R);
			const project = (x: number, y: number, z: number): Vec => {
				const x1 = x * cl - z * sl;
				const z1 = z * cl + x * sl;
				const y2 = y * ct - z1 * st;
				const z2 = y * st + z1 * ct;
				return [cx + x1 * R, cy - y2 * R, z2];
			};

			ctx.clearRect(0, 0, w, h);

			// Atmosphere and the body of the globe
			const atmo = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.28);
			atmo.addColorStop(0, `rgb(${glow} / 0.2)`);
			atmo.addColorStop(1, `rgb(${glow} / 0)`);
			ctx.fillStyle = atmo;
			ctx.beginPath();
			ctx.arc(cx, cy, R * 1.28, 0, Math.PI * 2);
			ctx.fill();

			const body = ctx.createRadialGradient(
				cx - R * 0.35,
				cy - R * 0.4,
				R * 0.1,
				cx,
				cy,
				R,
			);
			body.addColorStop(0, `rgb(${accent} / 0.13)`);
			body.addColorStop(0.7, `rgb(${accent} / 0.04)`);
			body.addColorStop(1, "rgb(0 0 0 / 0.25)");
			ctx.fillStyle = body;
			ctx.beginPath();
			ctx.arc(cx, cy, R, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = `rgb(${accent} / 0.22)`;
			ctx.lineWidth = 1;
			ctx.stroke();

			// Land
			fill.fill(0);
			const size = Math.max(1, R / 150);
			for (let i = 0; i < count; i++) {
				const [sx, sy, z] = project(pts[i * 3], pts[i * 3 + 1], pts[i * 3 + 2]);
				let level: number;
				let side: number;
				if (z <= 0) {
					// The far side, faint, like looking through the glass
					if (z < -0.92) continue;
					level = 0;
					side = 1;
				} else {
					const day = Math.min(1, Math.max(0, (light[i] + 0.08) / 0.2));
					side = day > 0.5 ? 0 : 1;
					level = Math.min(
						LEVELS - 1,
						Math.round((0.3 + 0.7 * z) * (0.5 + 0.5 * day) * (LEVELS - 1)),
					);
				}
				const b = side * LEVELS + level;
				const o = fill[b]++ * 3;
				buckets[b][o] = sx;
				buckets[b][o + 1] = sy;
				buckets[b][o + 2] = z;
			}
			for (let side = 0; side < 2; side++) {
				for (let level = 0; level < LEVELS; level++) {
					const b = side * LEVELS + level;
					const n = fill[b];
					if (!n) continue;
					const a =
						level === 0 && side === 1
							? 0.06
							: 0.12 + (level / (LEVELS - 1)) * 0.78;
					ctx.fillStyle =
						side === 0
							? `rgb(236 240 255 / ${a})`
							: `rgb(${accent} / ${a * 0.85})`;
					ctx.beginPath();
					const arr = buckets[b];
					for (let k = 0; k < n; k++) {
						const z = arr[k * 3 + 2];
						const s = z > 0 ? size * (0.8 + 0.7 * z) : size * 0.7;
						ctx.rect(arr[k * 3] - s / 2, arr[k * 3 + 1] - s / 2, s, s);
					}
					ctx.fill();
				}
			}

			// Arcs, once it has landed
			const arcFade = Math.min(1, Math.max(0, (clock - INTRO + 0.3) / 1.2));
			if (arcFade > 0) {
				ctx.lineCap = "round";
				for (const arc of arcs) {
					const proj = arc.points.map((p) => {
						const q = project(p[0], p[1], p[2]);
						const dx = q[0] - cx;
						const dy = q[1] - cy;
						// Hidden only when behind the globe's disc
						const shown = q[2] > 0 || dx * dx + dy * dy > R * R;
						return { x: q[0], y: q[1], shown };
					});
					ctx.strokeStyle = `rgb(${accent} / ${0.16 * arcFade})`;
					ctx.lineWidth = 1;
					ctx.beginPath();
					let pen = false;
					for (const p of proj) {
						if (!p.shown) {
							pen = false;
							continue;
						}
						if (pen) ctx.lineTo(p.x, p.y);
						else ctx.moveTo(p.x, p.y);
						pen = true;
					}
					ctx.stroke();

					// A pulse travelling outwards along it
					const t = ((clock * arc.speed + arc.offset) % 1.4) / 1.0;
					if (t <= 1.15) {
						const head = Math.min(t, 1) * (proj.length - 1);
						const tail = Math.max(0, head - 9);
						const fade = arcFade * Math.min(1, (1.15 - t) / 0.2);
						for (let i = Math.floor(tail); i < Math.floor(head); i++) {
							const a = proj[i];
							const b = proj[i + 1];
							if (!a.shown || !b.shown) continue;
							const k = (i - tail) / Math.max(1, head - tail);
							ctx.strokeStyle = `rgb(${glow} / ${k * k * 0.85 * fade})`;
							ctx.lineWidth = 1.6;
							ctx.beginPath();
							ctx.moveTo(a.x, a.y);
							ctx.lineTo(b.x, b.y);
							ctx.stroke();
						}
						const tip = proj[Math.floor(head)];
						if (tip?.shown && t < 1) {
							ctx.fillStyle = `rgb(255 255 255 / ${0.8 * fade})`;
							ctx.beginPath();
							ctx.arc(tip.x, tip.y, 1.6, 0, Math.PI * 2);
							ctx.fill();
						}
					}
				}
			}

			// The marker
			const [mx, my, mz] = project(target[0], target[1], target[2]);
			if (mz > 0) {
				const landed = Math.min(1, Math.max(0, (clock - INTRO * 0.7) / 0.6));
				if (landed > 0) {
					for (let r = 0; r < 2; r++) {
						const k = (((clock * 0.45 + r * 0.5) % 1) + 1) % 1;
						ctx.strokeStyle = `rgb(${glow} / ${(1 - k) * 0.7 * landed})`;
						ctx.lineWidth = 1.4;
						ctx.beginPath();
						ctx.arc(mx, my, 4 + k * R * 0.2, 0, Math.PI * 2);
						ctx.stroke();
					}
					const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 22);
					halo.addColorStop(0, `rgb(${glow} / ${0.55 * landed})`);
					halo.addColorStop(1, `rgb(${glow} / 0)`);
					ctx.fillStyle = halo;
					ctx.beginPath();
					ctx.arc(mx, my, 22, 0, Math.PI * 2);
					ctx.fill();
					ctx.fillStyle = `rgb(255 255 255 / ${landed})`;
					ctx.beginPath();
					ctx.arc(mx, my, 3.2 * (0.6 + 0.4 * landed), 0, Math.PI * 2);
					ctx.fill();
					ctx.strokeStyle = `rgb(${accent} / ${landed})`;
					ctx.lineWidth = 1.5;
					ctx.beginPath();
					ctx.arc(mx, my, 5.5, 0, Math.PI * 2);
					ctx.stroke();
				}
			}

			// Specular highlight, so it reads as a glass ball
			const spec = ctx.createRadialGradient(
				cx - R * 0.45,
				cy - R * 0.5,
				0,
				cx - R * 0.45,
				cy - R * 0.5,
				R * 0.7,
			);
			spec.addColorStop(0, "rgb(255 255 255 / 0.09)");
			spec.addColorStop(1, "rgb(255 255 255 / 0)");
			ctx.fillStyle = spec;
			ctx.beginPath();
			ctx.arc(cx, cy, R, 0, Math.PI * 2);
			ctx.fill();
		};

		const tick = (now: number) => {
			frame = requestAnimationFrame(tick);
			const elapsed = (now - last) / 1000;
			if (elapsed < 1 / FPS - 0.002) return;
			last = now;
			const dt = Math.min(elapsed, 0.1);
			clock += dt;
			if (!dragging) {
				// Critically damped spring back to centre
				const k = 7;
				velLon += (-k * k * dragLon - 2 * k * velLon) * dt;
				velLat += (-k * k * dragLat - 2 * k * velLat) * dt;
				dragLon += velLon * dt;
				dragLat += velLat * dt;
			}
			if (Date.now() - lastSun > 60_000) relight();
			draw();
		};

		const start = () => {
			cancelAnimationFrame(frame);
			if (still.matches || document.hidden || !visible) {
				draw();
				return;
			}
			last = performance.now();
			frame = requestAnimationFrame(tick);
		};

		const onDown = (e: PointerEvent) => {
			dragging = { x: e.clientX, y: e.clientY, lon: dragLon, lat: dragLat };
			velLon = 0;
			velLat = 0;
			canvas.setPointerCapture(e.pointerId);
		};
		const onMove = (e: PointerEvent) => {
			if (!dragging) return;
			const scale = 180 / Math.max(120, Math.min(w, h));
			dragLon = dragging.lon - (e.clientX - dragging.x) * scale;
			dragLat = dragging.lat + (e.clientY - dragging.y) * scale;
			if (still.matches) draw();
		};
		const onUp = () => {
			dragging = null;
			if (still.matches) {
				dragLon = 0;
				dragLat = 0;
				draw();
			}
		};

		const resizer = new ResizeObserver(resize);
		resizer.observe(canvas);
		const io = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			start();
		});
		io.observe(canvas);
		resize();
		start();

		canvas.addEventListener("pointerdown", onDown);
		canvas.addEventListener("pointermove", onMove);
		canvas.addEventListener("pointerup", onUp);
		canvas.addEventListener("pointercancel", onUp);
		document.addEventListener("visibilitychange", start);
		still.addEventListener("change", start);
		return () => {
			cancelAnimationFrame(frame);
			resizer.disconnect();
			io.disconnect();
			canvas.removeEventListener("pointerdown", onDown);
			canvas.removeEventListener("pointermove", onMove);
			canvas.removeEventListener("pointerup", onUp);
			canvas.removeEventListener("pointercancel", onUp);
			document.removeEventListener("visibilitychange", start);
			still.removeEventListener("change", start);
		};
	}, [lat, lon]);

	return (
		<canvas
			ref={ref}
			className="wx-globe-canvas"
			role="img"
			aria-label={`Globe marking ${label}`}
		/>
	);
}
