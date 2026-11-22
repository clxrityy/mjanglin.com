import { BADGE_IDS, buildBadge, isBadgeId } from "@/lib/vitals-badges";
import { getVitalsReport } from "@/lib/vitals-report";

/**
 * GET /api/vitals/:metric
 * A shields.io endpoint badge for one metric:
 *   https://img.shields.io/endpoint?url=https://mjanglin.com/api/vitals/lcp
 *
 * Optional ?label= overrides the badge label.
 */
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ metric: string }> },
) {
	const metric = (await params).metric.toLowerCase();

	if (!isBadgeId(metric)) {
		return Response.json(
			{ error: `Unknown metric "${metric}"`, metrics: BADGE_IDS },
			{ status: 404 },
		);
	}

	const badge = buildBadge(metric, await getVitalsReport());
	const label = new URL(request.url).searchParams.get("label");
	if (label) badge.label = label.slice(0, 40);

	return Response.json(badge, {
		headers: {
			"Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
			"Access-Control-Allow-Origin": "*",
		},
	});
}
