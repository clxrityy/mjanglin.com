import { type Row, VitalsTable } from "@/components/vitals/VitalsTable";
import { RATING_TONE, VITAL_KEYS, type VitalKey } from "@/lib/vitals";
import { getVitalsReport, type VitalsReport } from "@/lib/vitals-report";

/**
 * Real-user p75 (or the lab run where there's none), plus status and Lighthouse.
 * With no report it renders the same shape with dashes, so the loading state and
 * the result take exactly the same space.
 */
function FieldView({ report }: Readonly<{ report: VitalsReport | null }>) {
	const field = report?.field ?? null;
	const lab = report?.lab ?? null;
	const pulse = report?.pulse ?? null;

	const rows: Partial<Record<VitalKey, Row>> = {};
	for (const key of VITAL_KEYS) {
		rows[key] = field?.metrics[key] ?? lab?.metrics[key] ?? null;
	}

	const note = !report
		? "Loading…"
		: field
			? "p75 over 28 days, mobile"
			: lab
				? "Lab run, mobile"
				: (report.notice ?? "No data yet");

	const assessmentTone =
		field?.assessment === "passed"
			? "good"
			: field?.assessment === "failed"
				? "poor"
				: "none";

	return (
		<section aria-labelledby="vt-everyone" aria-busy={!report}>
			<h2 id="vt-everyone" className="ro-h2">
				All visitors
			</h2>

			<dl className="ro-facts vt-facts">
				<div data-tone={!pulse ? "none" : pulse.up ? "good" : "poor"}>
					<dt>Status</dt>
					<dd>
						<span className="ro-tone">
							{!pulse ? "—" : pulse.up ? "online" : "down"}
						</span>
						{pulse?.responseMs != null && ` · ${pulse.responseMs} ms`}
					</dd>
				</div>
				<div
					data-tone={lab?.scoreRating ? RATING_TONE[lab.scoreRating] : "none"}
				>
					<dt>Lighthouse</dt>
					<dd className="ro-tone">{lab?.score ?? "—"}</dd>
				</div>
				<div data-tone={assessmentTone}>
					<dt>Core Web Vitals</dt>
					<dd className="ro-tone">{field?.assessment ?? "—"}</dd>
				</div>
			</dl>

			<VitalsTable rows={rows} />

			<p className="ro-muted ro-line vt-note" title={note}>
				{note}
			</p>
		</section>
	);
}

export async function FieldVitals() {
	return <FieldView report={await getVitalsReport()} />;
}

export function FieldVitalsFallback() {
	return <FieldView report={null} />;
}
