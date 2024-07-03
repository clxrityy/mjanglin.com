"use client";
import { Line, LineChart, CartesianGrid } from "recharts";


type Props = {
    data: { date: Date, value: number}[]
}

export default function OrdersByDayChart({data}: Props) {
    return <LineChart data={data} width={350} height={350}>
        <Line type={"monotone"} dataKey={"value"} />
        <CartesianGrid stroke="#6666666a" strokeDasharray={"5 5"} />
    </LineChart>
}

