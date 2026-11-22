import {
	BADGE_IDS,
	badgeEndpoint,
	badgeImage,
	badgeMarkdown,
	buildBadge,
} from "@/lib/vitals-badges";
import { getVitalsReport } from "@/lib/vitals-report";

/**
 * GET /api/vitals
 * The full vitals report, plus every badge with its endpoint and markdown.
 */
export async function GET() {
	const report = await getVitalsReport();

	const badges = Object.fromEntries(
		BADGE_IDS.map((id) => [
			id,
			{
				...buildBadge(id, report),
				endpoint: badgeEndpoint(id),
				image: badgeImage(id),
				markdown: badgeMarkdown(id),
			},
		]),
	);

	return Response.json(
		{ ...report, badges },
		{
			headers: {
				"Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
				"Access-Control-Allow-Origin": "*",
			},
		},
	);
}
