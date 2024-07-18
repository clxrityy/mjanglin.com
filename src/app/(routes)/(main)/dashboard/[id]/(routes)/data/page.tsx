"use server";
import { ICONS } from "@/config/data/constants";
import { db } from "@/lib/db";
import OrdersByDayChart from "./_components/charts/OrdersByDayChart";
import BigButton from "@/components/ui/bigButton";
import Link from "next/link";
import Reload from "@/components/ux/Reload";
import EditDataCard from "./_components/edit/EditDataCard";

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
                <div className="flex flex-col items-center gap-10 flex-1">
                    {/* <div className="flex flex-row items-center text-center justify-center gap-2">
                        <h2>
                            data
                        </h2>
                        <ICONS.viewData />
                    </div> */}
                    <div className="flex flex-col items-center justify-center gap-10 w-full mt-10">
                        <div className="w-full flex items-center justify-center h-full">
                            <OrdersByDayChart username={userData.username} data={data} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 items-center mt-10 h-fit w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <div className="relative rounded-md shadow w-full h-full">
                        <EditDataCard userId={userData.userId} />
                    </div>
                </div>
            </div>
        </div>
    return (
        <div className="my-20 flex items-center justify-center container flex-col gap-8">
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
    );
}