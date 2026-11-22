"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
	formatVital,
	RATING_LABEL,
	RATING_TONE,
	rate,
	VITALS,
	worst,
} from "@/lib/vitals";
import "@/styles/readout.css";

type Key = "lcp" | "inp" | "cls";
const KEYS: Key[] = ["lcp", "inp", "cls"];

/** This visit's Core Web Vitals so far, updating as they change. */
function useVisitVitals() {
	const [values, setValues] = useState<Partial<Record<Key, number>>>({});

	useEffect(() => {
		let live = true;
		import("web-vitals").then(({ onCLS, onINP, onLCP }) => {
			const opts = { reportAllChanges: true };
			const set = (key: Key) => (m: { value: number }) => {
				if (live) setValues((v) => ({ ...v, [key]: m.value }));
			};
			onLCP(set("lcp"), opts);
			onINP(set("inp"), opts);
			onCLS(set("cls"), opts);
		});
		return () => {
			live = false;
		};
	}, []);

	const measured = KEYS.filter((k) => values[k] !== undefined);
	const overall = worst(measured.map((k) => rate(k, values[k] as number)));
	const tone = overall ? RATING_TONE[overall] : "none";
	const label = overall
		? `Vitals: this visit is ${RATING_LABEL[overall].toLowerCase()} so far. Open vitals`
		: "Open vitals";

	return { values, tone, label };
}

/** One heartbeat, 60 units wide, starting at x */
const beat = (x: number) =>
	`H${x + 16} L${x + 19} 9 L${x + 21} 12 H${x + 24} L${x + 27} 3 L${x + 30} 18 L${x + 32} 12 H${x + 38} Q${x + 41} 8 ${x + 44} 12 H${x + 60}`;

/** A heartbeat trace: faint full line, with a bright sweep redrawing it like a monitor. */
function Trace({ beats, className }: { beats: number; className: string }) {
	const d = `M0 12 ${Array.from({ length: beats }, (_, i) => beat(i * 60)).join(" ")}`;
	return (
		<svg
			viewBox={`0 0 ${60 * beats} 20`}
			preserveAspectRatio="none"
			className={`vital-trace ${className}`}
			aria-hidden="true"
		>
			<path className="vital-trace-base" d={d} />
			<path className="vital-trace-beat" pathLength={100} d={d} />
		</svg>
	);
}

/** The full vital sign, in the column beside the hero, under the time card. */
export function VitalSign() {
	const { values, tone, label } = useVisitVitals();

	return (
		<Link
			href="/vitals"
			prefetch={false}
			className="vital"
			data-tone={tone}
			aria-label={label}
		>
			<span className="vital-head">
				<span>Vitals</span>
				<span className="vital-go">check →</span>
			</span>
			<Trace beats={3} className="vital-trace-wide" />
			<span className="vital-readings">
				{KEYS.map((k) => {
					const v = values[k];
					return (
						<span
							key={k}
							data-tone={v === undefined ? "none" : RATING_TONE[rate(k, v)]}
						>
							<span className="ro-tone" title={VITALS[k].name}>
								{v === undefined ? "—" : formatVital(k, v)}
							</span>
						</span>
					);
				})}
			</span>
		</Link>
	);
}

/** Compact version for the phone dock, beside the time card. */
export function MiniVitalSign() {
	const { values, tone, label } = useVisitVitals();

	return (
		<Link
			href="/vitals"
			prefetch={false}
			className="vital-mini"
			data-tone={tone}
			aria-label={label}
		>
			<Trace beats={1} className="vital-trace-small" />
			<span className="vital-mini-text">
				<span>vitals</span>
				<span className="ro-tone vital-mini-reading">
					{values.lcp === undefined ? "—" : formatVital("lcp", values.lcp)}
				</span>
			</span>
		</Link>
	);
}
