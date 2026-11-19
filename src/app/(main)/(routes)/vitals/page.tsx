"use client";

import { useEffect, useState } from "react";
import { performanceMonitor, trackWebVitals } from "@/lib/performance";

// Pie chart coloring and thresholds for each metric
const METRIC_THRESHOLDS: Record<
	string,
	{ good: number; medium: number; max: number }
> = {
	TTFB: { good: 200, medium: 600, max: 2000 },
	FCP: { good: 1000, medium: 2500, max: 4000 },
	LCP: { good: 2500, medium: 4000, max: 6000 },
	CLS: { good: 0.1, medium: 0.25, max: 1 },
};
function renderMetricValue(metric: MetricDisplay, loading: boolean) {
	if (metric.value !== null) {
		return (
			<span className="inline-flex items-center gap-2.5">
				<MetricPie metric={metric.name} value={metric.value} />
				{metric.name === "CLS"
					? metric.value.toFixed(3)
					: `${metric.value.toFixed(0)} ms`}
			</span>
		);
	} else if (loading) {
		return (
			<span className="inline-block align-middle">
				<span
					className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"
					style={{ borderTopColor: "#6366f1" }}
				/>
			</span>
		);
	} else {
		return <span className="text-gray-400">N/A</span>;
	}
}

function renderMetricTimestamp(metric: MetricDisplay, loading: boolean) {
	if (metric.timestamp) {
		return new Date(metric.timestamp).toLocaleTimeString();
	} else if (loading) {
		return (
			<span className="inline-block align-middle">
				<span
					className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"
					style={{ borderTopColor: "#6366f1" }}
				/>
			</span>
		);
	} else {
		return <span className="text-gray-400">N/A</span>;
	}
}
function getPieColor(metric: string, value: number) {
	const t = METRIC_THRESHOLDS[metric] || { good: 0, medium: 0, max: 1 };
	if (value <= t.good) return "#22c55e"; // green
	if (value <= t.medium) return "#eab308"; // yellow
	return "#ef4444"; // red
}

/** Small status ring coloured by the metric's rating; the number sits next to it. */
function MetricPie({ metric, value }: { metric: string; value: number }) {
	const size = 16;
	const stroke = 3;
	const radius = (size - stroke) / 2;
	const color = getPieColor(metric, value);
	return (
		<svg width={size} height={size} className="shrink-0" aria-hidden="true">
			<circle
				cx={size / 2}
				cy={size / 2}
				r={radius}
				fill="none"
				stroke={color}
				strokeWidth={stroke}
				style={{ transition: "stroke 0.5s" }}
			/>
		</svg>
	);
}

const METRIC_NAMES = ["TTFB", "FCP", "LCP", "CLS"];

type MetricDisplay = {
	name: string;
	value: number | null;
	timestamp: number | null;
};

function getLatestMetric(
	allMetrics: { name: string; value: number; timestamp: number }[],
	name: string,
): MetricDisplay {
	const found = [...allMetrics].reverse().find((m) => m.name === name);
	return found
		? { name, value: found.value, timestamp: found.timestamp }
		: { name, value: null, timestamp: null };
}

export default function Page() {
	const [metrics, setMetrics] = useState<MetricDisplay[]>(
		METRIC_NAMES.map((name) => ({ name, value: null, timestamp: null })),
	);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		trackWebVitals();

		function updateMetrics() {
			const allMetrics = performanceMonitor.getMetrics();
			const mapped = METRIC_NAMES.map((name) =>
				getLatestMetric(allMetrics, name),
			);
			setMetrics(mapped);
		}

		const interval = setInterval(updateMetrics, 1000);
		const timeout = setTimeout(() => setLoading(false), 3000);

		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, []);

	return (
		<div className="mx-auto w-full max-w-3xl px-6 pt-20 pb-16">
			<h1 className="mb-2 text-3xl font-bold">Web Vitals</h1>
			<p className="mb-8 text-sm text-zinc-400">
				Measured live in your browser for this page load.
			</p>
			<div className="overflow-x-auto rounded-xl border border-white/10">
				<table className="min-w-full text-sm">
					<thead>
						<tr className="bg-white/5 text-zinc-300">
							<th className="py-3 px-4 text-left font-semibold">Metric</th>
							<th className="py-3 px-4 text-left font-semibold">Value</th>
							<th className="py-3 px-4 text-left font-semibold">Timestamp</th>
						</tr>
					</thead>
					<tbody>
						{metrics.map((metric) => (
							<tr key={metric.name} className="border-t border-white/10">
								<td className="py-3 px-4 font-semibold">{metric.name}</td>
								<td className="py-3 px-4 font-mono">
									{renderMetricValue(metric, loading)}
								</td>
								<td className="py-3 px-4 text-zinc-400">
									{renderMetricTimestamp(metric, loading)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
