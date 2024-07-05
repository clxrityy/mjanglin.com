"use client"
import Image from "next/image";
import { BarChart, Bar} from 'recharts';

export function Logo() {
    return <Image src="/img/sleep-graph.png" alt="sleep graph logo" width={25} height={25} priority fetchPriority="auto" />
}

export function Banner() {
    return (
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-row items-center gap-5 w-full">
                    <Logo />
                    <h1 className="text-3xl font-bold">sleepgraph</h1>
                </div>
            </div>
            <div className="flex flex-row items-center gap-3">
                <Chart data={data} />
                <Chart2 data={data} />
            </div>
        </div>
    )
}

// BAR CHART

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

type Props = {
    data: {
        name: string;
        uv: number;
        pv: number;
        amt: number;
    }[]
}

export function Chart({ data }: Props) {

    return (
        <BarChart width={200} height={75} data={data} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}>
            <Bar type="monotone" dataKey="uv" fill="#E33332" />
        </BarChart>
    )
}

export function Chart2({ data }: Props) { 
    return (
        <BarChart width={200} height={75} data={data} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}>
            <Bar animationEasing="ease-in" type="monotone" dataKey="pv" fill="#eee" />
        </BarChart>
    );
}