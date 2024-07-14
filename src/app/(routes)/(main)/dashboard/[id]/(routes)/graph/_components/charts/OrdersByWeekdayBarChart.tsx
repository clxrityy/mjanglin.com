"use client";

import { difference } from '@/util/math';
import { mapDataByWeekday } from '@/util/mapData';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, Rectangle, AreaChart } from 'recharts';

type Props = {
    data: { date: Date, value: number }[]
}




export default function OrdersByWeekdayBarChart({ data }: Props) {

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
    })

    return <ResponsiveContainer width="100%" height={350}>
        <AreaChart
            width={500}
            height={400}
            data={newDataWithRate}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            }}
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Area type="monotone" dataKey="value" fill="#8884d8" stroke="#8884d8" />
        </AreaChart>
    </ResponsiveContainer>
}