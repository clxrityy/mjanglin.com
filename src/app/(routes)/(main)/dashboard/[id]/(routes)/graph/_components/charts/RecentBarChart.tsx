"use client";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer, type ChartConfig, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const chartConfig = {
    value: {
        label: "Hours",
        color: "#8884d8",
    },
} satisfies ChartConfig;

type Props = {
    data: { date: Date, value: number }[]
}

export default function RecentBarChart({ data }: Props) {

    const total = useMemo(() => ({
        value: data.reduce((acc, curr) => acc + curr.value, 0),
    }), [data]);

    return <Card>
        <CardHeader className="flex items-center justify-between">
            <h4>
                Recent sleep duration
            </h4>
            <div>
                <span className="text-xl font-bold font-mono">{total.value}</span> hours
            </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-4">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey={"date"} tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US",
                            {
                                month: "short",
                                day: "numeric"
                            })
                    }} />
                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                                className="w-[150px]"
                                nameKey="value"
                                labelFormatter={(_d, i) => { 
                                    const date: Date = new Date(i[0].payload.date);

                                    return date.toLocaleDateString("en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        })
                                }}
                            />
                        }
                    />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ChartContainer>
        </CardContent>
    </Card>
}