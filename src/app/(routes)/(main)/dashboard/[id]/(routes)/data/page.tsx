"use server";
import { ICONS } from "@/config/data/constants";
import { db } from "@/lib/db";
import OrdersByDayChart from "./_components/charts/OrdersByDayChart";

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
    })

    return <div className="w-full h-full">
        <div className="flex items-center justify-around w-full mx-auto flex-col xl:flex-row gap-20">
            <div className="flex flex-col items-center gap-10">
                <div className="flex flex-row items-center text-center justify-center gap-2">
                    <h2>
                        data
                    </h2>
                    <ICONS.viewData />
                </div>
                <div className="flex flex-col items-center justify-center gap-5 w-full">
                    <div className="border-b">
                        <h4 className="font-normal text-center text-zinc-300">
                            <span className="text-blue-500">
                            {userData.username}</span> | raw data
                        </h4>
                    </div>
                    <div className="relative border rounded-md border-zinc-700 shadow">
                        <pre className="h-30 overflow-auto relative bg-zinc-900 px-4 py-4 max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-auto text-zinc-300/85 text-sm">
                            {JSON.stringify(userSleepData, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center justify-center h-full xl:mt-40">
                <OrdersByDayChart data={data}/>
            </div>
        </div>
    </div>
}