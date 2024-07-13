import { db } from "@/lib/db";
import NewRecordForm from "@/components/elements/NewRecord";

type Props = {
    params: { id: string };
}

export default async function Page({ params }: Props) {

    const userData = await db.sleepUser.findUnique({
        where: {
            userId: params.id
        },
        include: {
            sleepData: true
        }
    });

    if (userData)
        return <div className="w-full flex items-center justify-center">
            <NewRecordForm userData={userData} />
        </div>

    return <div className="min-w-sm flex justify-center max-w-md">
        <h1>
            User data not found...
        </h1>
    </div>

}