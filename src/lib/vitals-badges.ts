/**
 * shields.io "endpoint" badges built from the vitals report.
 * @see https://shields.io/badges/endpoint-badge
 */

import {
	formatVital,
	RATING_SHIELDS,
	SITE_URL,
	VITAL_KEYS,
	VITALS,
	type VitalKey,
} from "@/lib/vitals";
import type { VitalsReport } from "@/lib/vitals-report";

export type ShieldsEndpoint = {
	schemaVersion: 1;
	label: string;
	message: string;
	color: string;
	cacheSeconds?: number;
	isError?: boolean;
};

export const BADGE_IDS = [
	"status",
	"response",
	"cwv",
	"performance",
	...VITAL_KEYS,
] as const;
export type BadgeId = (typeof BADGE_IDS)[number];

export const BADGE_LABELS: Record<BadgeId, string> = {
	status: "status",
	response: "response",
	cwv: "core web vitals",
	performance: "lighthouse",
	lcp: "LCP",
	inp: "INP",
	cls: "CLS",
	fcp: "FCP",
	ttfb: "TTFB",
};

export const isBadgeId = (id: string): id is BadgeId =>
	(BADGE_IDS as readonly string[]).includes(id);

const NO_DATA = { message: "no data", color: "lightgrey" };

export function buildBadge(id: BadgeId, report: VitalsReport): ShieldsEndpoint {
	const base = { schemaVersion: 1 as const, label: BADGE_LABELS[id] };

	switch (id) {
		case "status":
			return {
				...base,
				cacheSeconds: 300,
				...(report.pulse.up
					? { message: "online", color: "brightgreen" }
					: { message: "down", color: "red" }),
			};

		case "response": {
			const { responseMs, rating } = report.pulse;
			return {
				...base,
				cacheSeconds: 300,
				...(responseMs === null || !rating
					? NO_DATA
					: { message: `${responseMs} ms`, color: RATING_SHIELDS[rating] }),
			};
		}

		case "cwv": {
			const a = report.field?.assessment;
			return {
				...base,
				cacheSeconds: 3600,
				...(a
					? {
							message: a,
							color: a === "passed" ? "brightgreen" : "red",
						}
					: NO_DATA),
			};
		}

		case "performance": {
			const lab = report.lab;
			return {
				...base,
				cacheSeconds: 3600,
				...(lab?.score == null || !lab.scoreRating
					? NO_DATA
					: {
							message: `${lab.score}`,
							color: RATING_SHIELDS[lab.scoreRating],
						}),
			};
		}

		default: {
			// Real-user p75 first; fall back to the lab run (INP has no lab value)
			const key: VitalKey = id;
			const r = report.field?.metrics[key] ?? report.lab?.metrics[key];
			return {
				...base,
				cacheSeconds: 3600,
				...(r
					? {
							message: formatVital(key, r.value),
							color: RATING_SHIELDS[r.rating],
						}
					: NO_DATA),
			};
		}
	}
}

export function badgeEndpoint(id: BadgeId, origin = SITE_URL) {
	return `${origin}/api/vitals/${id}`;
}

export function badgeImage(id: BadgeId, origin = SITE_URL) {
	return `https://img.shields.io/endpoint?url=${encodeURIComponent(badgeEndpoint(id, origin))}`;
}

export function badgeMarkdown(id: BadgeId, origin = SITE_URL) {
	const alt = id in VITALS ? VITALS[id as VitalKey].name : BADGE_LABELS[id];
	return `[![${alt}](${badgeImage(id, origin)})](${origin}/vitals)`;
}
