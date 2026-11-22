import { Suspense } from "react";
import { BadgeShelf } from "@/components/vitals/BadgeShelf";
import {
	FieldVitals,
	FieldVitalsFallback,
} from "@/components/vitals/FieldVitals";
import { LiveVitals } from "@/components/vitals/LiveVitals";

export default function Page() {
	return (
		<div className="ro">
			<header>
				<h1 className="ro-h1">Vitals</h1>
				<p className="ro-muted">How fast mjanglin.com loads and responds.</p>
			</header>

			<LiveVitals />

			<Suspense fallback={<FieldVitalsFallback />}>
				<FieldVitals />
			</Suspense>

			<BadgeShelf />
		</div>
	);
}
