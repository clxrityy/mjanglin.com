import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Reload from "@/components/ux/Reload";
import { db } from "@/lib/db";
import DataTable from "../table/DataTable";
import columns from "../table/Columns";

type Props = {
    userId: string;
}

export default async function EditDataCard({ userId }: Props) {

    const userData = await db.sleepUser.findUnique({
        where: {
            userId: userId
        }
    });

    if (!userData) {
        return <Card>
            <CardHeader>
                <CardTitle>
                    Data editor
                </CardTitle>
                <CardDescription>
                    <span className="text-red-500 font-bold">
                        No user found
                    </span>
                </CardDescription>
            </CardHeader>
        </Card>
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
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        Data
                    </CardTitle>
                    <CardDescription>
                        Click to delete a specific data entry
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={data} />
                </CardContent>
            </Card>
        );
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Data editor
                </CardTitle>
                <CardDescription>
                    <span className="text-red-500 font-bold">
                        No data found
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Reload />
            </CardContent>
        </Card>
    )
}