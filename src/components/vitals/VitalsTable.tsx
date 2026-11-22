import { Bar } from "@/components/readout/Bar";
import {
	formatVital,
	gaugePosition,
	RATING_LABEL,
	RATING_TONE,
	type Rating,
	VITAL_KEYS,
	VITALS,
	type VitalKey,
} from "@/lib/vitals";

export type Row = { value: number; rating: Rating } | null;

/** All five vitals, one row each. Fixed layout, so values arriving never shift it. */
export function VitalsTable({
	rows,
	pending = "—",
}: Readonly<{
	rows: Partial<Record<VitalKey, Row>>;
	/** Shown per metric while there's no value */
	pending?: string | Partial<Record<VitalKey, string>>;
}>) {
	return (
		<table className="ro-table vt-table">
			<colgroup>
				<col className="vt-col-metric" />
				<col className="vt-col-value" />
				<col />
				<col className="vt-col-rating" />
			</colgroup>
			<thead className="sr-only">
				<tr>
					<th>Metric</th>
					<th>Value</th>
					<th>Scale</th>
					<th>Rating</th>
				</tr>
			</thead>
			<tbody>
				{VITAL_KEYS.map((key) => {
					const row = rows[key] ?? null;
					const def = VITALS[key];
					const wait =
						typeof pending === "string" ? pending : (pending[key] ?? "—");
					return (
						<tr key={key} data-tone={row ? RATING_TONE[row.rating] : "none"}>
							<th scope="row">
								<abbr title={def.name}>{def.short}</abbr>
							</th>
							<td>
								{row ? (
									formatVital(key, row.value)
								) : (
									<span className="ro-muted">{wait}</span>
								)}
							</td>
							<td>
								<Bar value={row ? gaugePosition(key, row.value) : null} />
							</td>
							<td className="ro-tone">{row ? RATING_LABEL[row.rating] : ""}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
