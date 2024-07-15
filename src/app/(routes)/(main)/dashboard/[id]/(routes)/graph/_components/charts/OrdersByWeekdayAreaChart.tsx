"use client";

import { difference } from '@/util/math';
import { mapDataByWeekday } from '@/util/mapData';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, Rectangle, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


type Props = {
    data: { date: Date, value: number }[]
}

const chartConfig = {
    value: {
        label: "Hours",
        color: "#8884d8",
    },
} satisfies ChartConfig;


export default function OrdersByWeekdayAreaChart({ data }: Props) {

    const newData = mapDataByWeekday(data);

    const newDataWithRate = newData.map((d) => {
        
        let values: number[] = [];

        values.push(d.value);

        let sum = values.reduce((a, b) => a + b, 0);
        let diff = difference(sum, d.value);

        return {
            ...d,
            rate: diff
        }
    });



    return <Card className='w-full'>
        <CardHeader>
            <CardTitle>
                Weekday average
            </CardTitle>
            <CardDescription>
                Overall average sleep duration by weekday
            </CardDescription>
        </CardHeader>
        <CardContent className='w-full'>
            <ChartContainer config={chartConfig}>
                <AreaChart
                    data={newDataWithRate}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#82ca9d" />
                    <Bar dataKey="rate" fill="#82ca9d" fillOpacity={0.4} />
                    <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent
                            className='w-[150px]'
                            nameKey="value"
                                labelFormatter={(_d, i) => { 
                                return i[0].payload.day
                            }}
                        />
                        }
                    />
                </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>

    // return <ResponsiveContainer width="100%" height={350}>
    //     <AreaChart
    //         width={500}
    //         height={400}
    //         data={newDataWithRate}
    //         margin={{
    //             top: 20,
    //             right: 20,
    //             bottom: 20,
    //             left: 20,
    //         }}
    //     >
    //         <CartesianGrid strokeDasharray="3 3"/>
    //         <XAxis dataKey="day" />
    //         <YAxis />
    //         <Tooltip />
    //         {/* <Legend /> */}
    //         <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
    //     </AreaChart>
    // </ResponsiveContainer>
}