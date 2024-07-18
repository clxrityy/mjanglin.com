"use client";
import { Line, LineChart, CartesianGrid } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";


type Props = {
    username: string;
    data: { date: Date, value: number }[]
}

export default function OrdersByDayChart({ username, data }: Props) {

    const chartConfig = {
        value: {
            label: "Hours",
            color: "#8884d8",
        },
    } satisfies ChartConfig;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <span className="text-blue-400/95 font-bold tracking-wide">
                        {username}
                    </span>'s sleep schedule
                </CardTitle>
                <CardDescription>
                    <span className="font-mono">
                        {data[0].date.toDateString().toUpperCase()}
                    </span>
                    —
                    <span className="font-mono">
                        {data[data.length - 1].date.toDateString().toUpperCase()}
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        data={data}
                        accessibilityLayer
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <Line
                            type={"monotone"}
                            dataKey={"value"}
                            stroke={"#8884d8"}
                        />
                        <CartesianGrid stroke="#6666666a" strokeDasharray={"5 5"} />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="value"
                                    labelFormatter={(_d, i) => {
                                        const date: Date = new Date(i[0].payload.date);

                                        return date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )

    // return <LineChart data={data} width={350} height={350}>
    //     <Line type={"monotone"} dataKey={"value"} />
    //     <CartesianGrid stroke="#6666666a" strokeDasharray={"5 5"} />
    // </LineChart>
}

