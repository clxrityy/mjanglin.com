import { db } from "@/lib/db";


type Props = {
    date: Date;
    userId: string;
}


export default async function DataEditor({ date, userId }: Props) {
    const data = await db.sleepData.findFirst({
        where: {
            date: date,
            userId: userId
        }
    });

    if (!data) {
        return null;
    }

    return 
}