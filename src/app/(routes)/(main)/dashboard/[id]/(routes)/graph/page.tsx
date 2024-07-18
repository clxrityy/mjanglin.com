"use server";

import BigButton from "@/components/ui/bigButton";
import { db } from "@/lib/db";
import Link from "next/link";
import OrdersByWeekdayAreaChart from "./_components/charts/OrdersByWeekdayAreaChart";
import Reload from "@/components/ux/Reload";
import RecentBarChart from "./_components/charts/RecentBarChart";

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

    const data = userSleepData.map((data) => {
        return {
            date: data.date,
            value: data.duration
        }
    });

    if (data.length > 0)
        return <div className="w-full h-full">
            <div className="flex items-center justify-evenly w-full mx-auto flex-col xl:flex-row gap-20">
                <div className="w-full flex items-center justify-center max-h-[50rem]">
                    <OrdersByWeekdayAreaChart data={data} />
                </div>
                <div className="w-full flex-1 items-center justify-center">
                    <RecentBarChart data={data} />
                </div>
            </div>
        </div>

    return <div className="my-20 flex items-center justify-center container flex-col gap-8">
        <h1>
            No data found
        </h1>
        <Reload />
        <BigButton variant="outline">
            <Link href={`/dashboard/${params.id}/new`}>
                Add new data
            </Link>
        </BigButton>
    </div>
}