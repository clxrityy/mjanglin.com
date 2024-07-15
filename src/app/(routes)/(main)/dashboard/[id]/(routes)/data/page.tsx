"use server";
import { ICONS } from "@/config/data/constants";
import { db } from "@/lib/db";
import OrdersByDayChart from "./_components/charts/OrdersByDayChart";
import BigButton from "@/components/ui/bigButton";
import Link from "next/link";
import Reload from "@/components/ux/Reload";

type Props = {
    params: { id: string };
}

export default async function Page({ params }: Props) {

    const userData = await db.sleepUser.findUnique({
        where: {
            userId: params.id
        }
    });

    if (!userData) {
        return <div>
            User not found...
        </div>
    }

    const userSleepData = await db.sleepData.findMany({
        where: {
            userId: userData.userId
        },
        orderBy: {
            date: 'asc'
        }
    });

    // let info: Serie[] = [];
    // data(userSleepData).forEach((data) => info.push(data));

    const data = userSleepData.map((data) => {
        return {
            date: data.date,
            value: data.duration
        }
    });

    if (data.length > 0)
        return <div className="w-full h-full">
            <div className="flex items-center justify-evenly w-full mx-auto flex-col xl:flex-row gap-20">
                <div className="flex flex-col items-center gap-10">
                    <div className="flex flex-row items-center text-center justify-center gap-2">
                        <h2>
                            data
                        </h2>
                        <ICONS.viewData />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-10 w-full mt-10">
                        <div className="flex flex-col items-center justify-between gap-1 border-b border-zinc-600 py-2">
                            <h6 className="text-xl">
                                <span className="font-bold tracking-wide text-blue-400/95">{userData.username}</span>'s sleep schedule
                            </h6>
                            <p className="flex flex-row items-center gap-2 text-sm font-bold">
                                <span className="font-mono">
                                    {data[0].date.toDateString().toUpperCase()}
                                </span>
                                —
                                <span className="font-mono">
                                    {data[data.length - 1].date.toDateString().toUpperCase()}
                                </span>
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-center h-full">
                            <OrdersByDayChart data={data} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 items-center mt-10 h-fit">
                    <div className="border-b border-zinc-600 py-2">
                        <h4 className="font-normal text-center text-zinc-300">
                            raw data
                        </h4>
                    </div>
                    <div className="relative border rounded-md border-zinc-700 shadow">
                        <pre className="h-[10pc] lg:h-[20pc] xl:h-[30pc] overflow-y-scroll relative bg-zinc-900 px-4 py-4 max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-auto text-zinc-300/85 text-sm">
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    return (
        <div className="my-20 flex items-center justify-center container flex-col gap-8">
            <h1>
                No data found
            </h1>
            <BigButton variant="outline">
                <Link href={`/dashboard/${params.id}/new`}>
                    Add new data
                </Link>
            </BigButton>
            <Reload />
        </div>
    );
}