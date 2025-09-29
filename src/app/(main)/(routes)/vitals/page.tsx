"use client";

import { useEffect, useState } from "react";
import { trackWebVitals, performanceMonitor } from "@/lib/performance";

// Pie chart coloring and thresholds for each metric
const METRIC_THRESHOLDS: Record<string, { good: number; medium: number; max: number }> = {
    TTFB: { good: 200, medium: 600, max: 2000 },
    FCP: { good: 1000, medium: 2500, max: 4000 },
    LCP: { good: 2500, medium: 4000, max: 6000 },
    CLS: { good: 0.1, medium: 0.25, max: 1 },
};
function Spinner() {
    return (
        <div className="flex items-center justify-center p-8 w-screen h-screen">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
    );
}

function renderMetricValue(metric: MetricDisplay, loading: boolean) {
    if (metric.value !== null) {
        return (
            <>
                <MetricPie metric={metric.name} value={metric.value} />
                {metric.name === "CLS" ? metric.value.toFixed(3) : metric.value.toFixed(0)}
            </>
        );
    } else if (loading) {
        return (
            <span className="inline-block align-middle">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" style={{ borderTopColor: '#6366f1' }} />
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
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" style={{ borderTopColor: '#6366f1' }} />
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


function MetricPie({ metric, value }: { metric: string; value: number }) {
    const size = 44;
    const stroke = 4;
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const color = getPieColor(metric, value);
    return (
        <svg width={size} height={size} className="inline-block align-middle mr-2" style={{ verticalAlign: "middle" }}>
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="#18181b"
                stroke="#27272a"
                strokeWidth={stroke}
            />
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={stroke}
                strokeDasharray={circumference}
                strokeDashoffset={0}
                strokeLinecap="round"
                style={{ transition: "stroke 0.5s" }}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="1.05rem"
                fill="#fff"
                fontFamily="monospace"
                style={{ pointerEvents: "none" }}
            >
                {metric === "CLS" ? value.toFixed(3) : value.toFixed(0)}
            </text>
        </svg>
    );
}

const METRIC_NAMES = ["TTFB", "FCP", "LCP", "CLS"];

type MetricDisplay = {
    name: string;
    value: number | null;
    timestamp: number | null;
};

function getLatestMetric(allMetrics: { name: string; value: number; timestamp: number }[], name: string): MetricDisplay {
    const found = [...allMetrics].reverse().find((m) => m.name === name);
    return found
        ? { name, value: found.value, timestamp: found.timestamp }
        : { name, value: null, timestamp: null };
}


export default function Page() {
    const [metrics, setMetrics] = useState<MetricDisplay[]>(
        METRIC_NAMES.map((name) => ({ name, value: null, timestamp: null }))
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        trackWebVitals();

        function updateMetrics() {
            const allMetrics = performanceMonitor.getMetrics();
            const mapped = METRIC_NAMES.map((name) => getLatestMetric(allMetrics, name));
            setMetrics(mapped);
        }

        const interval = setInterval(updateMetrics, 1000);
        const timeout = setTimeout(() => setLoading(false), 3000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Web Vitals</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-800">
                            <th className="py-2 px-4 text-left">Metric</th>
                            <th className="py-2 px-4 text-left">Value</th>
                            <th className="py-2 px-4 text-left">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metrics.map((metric) => (
                            <tr key={metric.name} className="border-t">
                                <td className="py-1 px-2 font-semibold">{metric.name}</td>
                                <td className="py-1 px-2 font-mono">
                                    {renderMetricValue(metric, loading)}
                                </td>
                                <td className="py-1 px-2 text-xs">
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
