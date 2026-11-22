"use client";

import { useEffect, useState } from "react";
import { type Row, VitalsTable } from "@/components/vitals/VitalsTable";
import { rate, type VitalKey } from "@/lib/vitals";

/** Web Vitals measured in this browser, updating as they change. */
export function LiveVitals() {
	const [rows, setRows] = useState<Partial<Record<VitalKey, Row>>>({});

	useEffect(() => {
		let live = true;
		const set = (key: VitalKey) => (m: { value: number }) => {
			if (live)
				setRows((r) => ({
					...r,
					[key]: { value: m.value, rating: rate(key, m.value) },
				}));
		};

		import("web-vitals").then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
			const opts = { reportAllChanges: true };
			onLCP(set("lcp"), opts);
			onINP(set("inp"), opts);
			onCLS(set("cls"), opts);
			onFCP(set("fcp"), opts);
			onTTFB(set("ttfb"), opts);
		});

		return () => {
			live = false;
		};
	}, []);

	return (
		<section aria-labelledby="vt-visit">
			<h2 id="vt-visit" className="ro-h2">
				Your visit
			</h2>
			<VitalsTable rows={rows} pending={{ inp: "click anything" }} />
		</section>
	);
}
