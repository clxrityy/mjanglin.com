"use server";

import { db } from "@/lib/db";

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

    return <div className="w-full h-full">
        <div className="flex items-center justify-center w-full h-full">
            
        </div>
    </div>;
}