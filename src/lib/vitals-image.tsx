import { ImageResponse } from "next/og";
import {
	formatVital,
	gaugePosition,
	RATING_LABEL,
	type Rating,
	VITAL_KEYS,
	VITALS,
} from "@/lib/vitals";
import { getVitalsReport } from "@/lib/vitals-report";

export const VITALS_IMAGE_SIZE = { width: 1200, height: 630 };

// Same palette as the page (styles/page/vitals.css)
const TONE: Record<Rating | "none", string> = {
	good: "rgb(150, 205, 150)",
	"needs-improvement": "rgb(225, 195, 130)",
	poor: "rgb(225, 140, 130)",
	none: "rgb(120, 120, 120)",
};
const MUTED = "rgb(150, 150, 145)";
const CELLS = 16;

/** Social preview for /vitals: the same readout as the page, as an image. */
export async function renderVitalsImage() {
	const { pulse, field, lab } = await getVitalsReport();
	const source = field
		? "p75 over 28 days, mobile"
		: lab
			? "lab run, mobile"
			: "open the page to measure your visit";

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				padding: "64px 80px",
				background: "#111110",
				color: "rgb(225, 225, 220)",
				fontSize: 30,
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "baseline",
				}}
			>
				<div
					style={{
						display: "flex",
						fontSize: 64,
						fontWeight: 700,
						letterSpacing: 6,
					}}
				>
					VITALS
				</div>
				<div style={{ display: "flex", color: MUTED }}>mjanglin.com</div>
			</div>

			<div
				style={{
					display: "flex",
					gap: 40,
					marginTop: 20,
					paddingBottom: 20,
					borderBottom: "2px dashed rgba(255, 255, 255, 0.2)",
				}}
			>
				<div style={{ display: "flex" }}>
					<span style={{ color: MUTED }}>status:&nbsp;</span>
					<span style={{ color: TONE[pulse.up ? "good" : "poor"] }}>
						{pulse.up ? "online" : "down"}
					</span>
					{pulse.responseMs !== null && (
						<span>&nbsp;· {pulse.responseMs} ms</span>
					)}
				</div>
				{lab?.score != null && (
					<div style={{ display: "flex" }}>
						<span style={{ color: MUTED }}>lighthouse:&nbsp;</span>
						<span style={{ color: TONE[lab.scoreRating ?? "none"] }}>
							{lab.score}
						</span>
					</div>
				)}
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: 14,
					marginTop: 28,
				}}
			>
				{VITAL_KEYS.map((key) => {
					const r = field?.metrics[key] ?? lab?.metrics[key] ?? null;
					const tone = TONE[r?.rating ?? "none"];
					const filled = r
						? Math.max(1, Math.round(gaugePosition(key, r.value) * CELLS))
						: 0;
					return (
						<div key={key} style={{ display: "flex", alignItems: "center" }}>
							<div style={{ display: "flex", width: 110, fontWeight: 700 }}>
								{VITALS[key].short}
							</div>
							<div style={{ display: "flex", width: 200 }}>
								{r ? formatVital(key, r.value) : "—"}
							</div>
							<div style={{ display: "flex", gap: 5 }}>
								{Array.from({ length: CELLS }, (_, i) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length bar
										key={i}
										style={{
											width: 24,
											height: 26,
											background:
												i < filled ? tone : "rgba(255, 255, 255, 0.1)",
										}}
									/>
								))}
							</div>
							<div style={{ display: "flex", marginLeft: "auto", color: tone }}>
								{r ? RATING_LABEL[r.rating] : ""}
							</div>
						</div>
					);
				})}
			</div>

			<div
				style={{
					display: "flex",
					marginTop: "auto",
					fontSize: 24,
					color: MUTED,
				}}
			>
				{source}
			</div>
		</div>,
		{
			...VITALS_IMAGE_SIZE,
			headers: {
				"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
			},
		},
	);
}
