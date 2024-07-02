import { db } from "@/lib/db";
import { z } from "zod";
import { useForm } from "react-hook-form";
import NewRecordForm from "@/components/NewRecord";

type Props = {
    params: { id: string };
}

export default async function Page({params}: Props) {

    const userData = await db.sleepUser.findUnique({
        where: {
            userId: params.id
        },
        include: {
            sleepData: true
        }
    });

    if (userData)
        return <div>
        <NewRecordForm userData={userData} />
    
        </div>
    
}