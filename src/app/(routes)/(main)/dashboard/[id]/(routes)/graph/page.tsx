"use server";

import BigButton from "@/components/ui/bigButton";
import { db } from "@/lib/db";
import Link from "next/link";
import OrdersByWeekdayBarChart from "./_components/charts/OrdersByWeekdayBarChart";
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

    const data = userSleepData.map((data) => {
        return {
            date: data.date,
            value: data.duration
        }
    });

    if (data.length > 0)
        return <div className="w-full h-full">
            <div className="flex items-center justify-evenly w-full mx-auto flex-col xl:flex-row gap-20">
                <div className="flex flex-col justify-center items-end lg:items-stretch w-full gap-4">
                    <h4>
                        Weekday average
                    </h4>
                    <OrdersByWeekdayBarChart data={data} />
                </div>
            </div>
        </div>

    return <div className="my-20 flex items-center justify-center container flex-col gap-8">
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
}