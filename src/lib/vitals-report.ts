/**
 * Server-side vitals report for mjanglin.com.
 *
 * - Field data: Chrome UX Report p75 over the last 28 days, via the PageSpeed
 *   Insights API (needs PAGESPEED_API_KEY; Google gives keyless callers no quota).
 * - Lab data: the Lighthouse performance score from the same PSI run.
 * - Pulse: a live probe timing how long the homepage takes to start responding.
 *
 * PSI runs take 10-30 s, so its response is cached in the Next data cache.
 */

import {
	type Rating,
	rate,
	rateScore,
	SITE_URL,
	VITAL_KEYS,
	type VitalKey,
	worst,
} from "@/lib/vitals";

export { SITE_URL };

const PSI_ENDPOINT =
	"https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
/** How long a PSI result is reused before it's fetched again */
export const PSI_REVALIDATE_S = 6 * 60 * 60;

export type Reading = { value: number; rating: Rating };

export type VitalsReport = {
	site: string;
	generatedAt: string;
	/** Live probe of the homepage */
	pulse: {
		up: boolean;
		status: number | null;
		responseMs: number | null;
		rating: Rating | null;
	};
	/** Real-user p75 over 28 days (mobile). null when unavailable. */
	field: {
		source: "crux";
		formFactor: "mobile";
		/** Core Web Vitals assessment: passes when LCP, INP and CLS are all good */
		assessment: "passed" | "failed" | null;
		metrics: Partial<Record<VitalKey, Reading>>;
	} | null;
	/** Lighthouse lab run (mobile). null when unavailable. */
	lab: {
		source: "lighthouse";
		score: number | null;
		scoreRating: Rating | null;
		fetchedAt: string | null;
		metrics: Partial<Record<VitalKey, Reading>>;
	} | null;
	/** Why field/lab are missing, if they are */
	notice: string | null;
};

// ---------- PageSpeed Insights ----------

type PsiMetric = { percentile?: number; category?: string };
type PsiResponse = {
	originLoadingExperience?: { metrics?: Record<string, PsiMetric> };
	lighthouseResult?: {
		fetchTime?: string;
		categories?: { performance?: { score?: number | null } };
		audits?: Record<string, { numericValue?: number }>;
	};
	error?: { message?: string };
};

const CRUX_KEYS: Record<string, VitalKey> = {
	LARGEST_CONTENTFUL_PAINT_MS: "lcp",
	INTERACTION_TO_NEXT_PAINT: "inp",
	CUMULATIVE_LAYOUT_SHIFT_SCORE: "cls",
	FIRST_CONTENTFUL_PAINT_MS: "fcp",
	EXPERIMENTAL_TIME_TO_FIRST_BYTE: "ttfb",
};

const LAB_AUDITS: Partial<Record<VitalKey, string>> = {
	lcp: "largest-contentful-paint",
	cls: "cumulative-layout-shift",
	fcp: "first-contentful-paint",
	ttfb: "server-response-time",
};

const reading = (key: VitalKey, value: number): Reading => ({
	value,
	rating: rate(key, value),
});

async function fetchPsi(): Promise<
	{ ok: true; data: PsiResponse } | { ok: false; reason: string }
> {
	const key = process.env.PAGESPEED_API_KEY;
	if (!key) {
		return {
			ok: false,
			reason: "Field data needs a PAGESPEED_API_KEY on the server.",
		};
	}

	const url = new URL(PSI_ENDPOINT);
	url.searchParams.set("url", SITE_URL);
	url.searchParams.set("strategy", "mobile");
	url.searchParams.set("category", "performance");
	url.searchParams.set("key", key);

	try {
		const res = await fetch(url, {
			next: { revalidate: PSI_REVALIDATE_S, tags: ["vitals"] },
			signal: AbortSignal.timeout(60_000),
		});
		const data = (await res.json()) as PsiResponse;
		if (!res.ok || data.error) {
			return {
				ok: false,
				reason: `PageSpeed Insights: ${data.error?.message ?? res.statusText}`,
			};
		}
		return { ok: true, data };
	} catch (err) {
		return {
			ok: false,
			reason: `PageSpeed Insights unreachable (${(err as Error).name}).`,
		};
	}
}

function parseField(data: PsiResponse): VitalsReport["field"] {
	const raw = data.originLoadingExperience?.metrics;
	if (!raw) return null;

	const metrics: Partial<Record<VitalKey, Reading>> = {};
	for (const [cruxKey, key] of Object.entries(CRUX_KEYS)) {
		const p75 = raw[cruxKey]?.percentile;
		if (typeof p75 !== "number") continue;
		// CrUX reports CLS multiplied by 100
		metrics[key] = reading(key, key === "cls" ? p75 / 100 : p75);
	}
	if (Object.keys(metrics).length === 0) return null;

	const core = (["lcp", "inp", "cls"] as const).map((k) => metrics[k]);
	const assessment = core.every(Boolean)
		? worst(core.map((m) => (m as Reading).rating)) === "good"
			? "passed"
			: "failed"
		: null;

	return { source: "crux", formFactor: "mobile", assessment, metrics };
}

function parseLab(data: PsiResponse): VitalsReport["lab"] {
	const lr = data.lighthouseResult;
	if (!lr) return null;

	const rawScore = lr.categories?.performance?.score;
	const score =
		typeof rawScore === "number" ? Math.round(rawScore * 100) : null;

	const metrics: Partial<Record<VitalKey, Reading>> = {};
	for (const key of VITAL_KEYS) {
		const audit = LAB_AUDITS[key];
		const value = audit ? lr.audits?.[audit]?.numericValue : undefined;
		if (typeof value === "number") metrics[key] = reading(key, value);
	}

	return {
		source: "lighthouse",
		score,
		scoreRating: score === null ? null : rateScore(score),
		fetchedAt: lr.fetchTime ?? null,
		metrics,
	};
}

// ---------- Pulse ----------

/** Time to response headers for the homepage, straight from the server. */
async function probe(): Promise<VitalsReport["pulse"]> {
	const start = performance.now();
	try {
		const res = await fetch(SITE_URL, {
			cache: "no-store",
			headers: { "user-agent": "mjanglin-vitals-probe" },
			signal: AbortSignal.timeout(10_000),
		});
		const responseMs = Math.round(performance.now() - start);
		await res.body?.cancel();
		return {
			up: res.ok,
			status: res.status,
			responseMs,
			rating: rate("ttfb", responseMs),
		};
	} catch {
		return { up: false, status: null, responseMs: null, rating: null };
	}
}

// ---------- Report ----------

export async function getVitalsReport(): Promise<VitalsReport> {
	const [pulse, psi] = await Promise.all([probe(), fetchPsi()]);

	const field = psi.ok ? parseField(psi.data) : null;
	const lab = psi.ok ? parseLab(psi.data) : null;
	let notice: string | null = psi.ok ? null : psi.reason;
	if (psi.ok && !field) {
		notice = "Not enough Chrome traffic yet for real-user field data.";
	}

	return {
		site: SITE_URL,
		generatedAt: new Date().toISOString(),
		pulse,
		field,
		lab,
		notice,
	};
}
