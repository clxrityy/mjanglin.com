import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
    params: { id: string };
}

export default async function Page({ params }: Props) { 
    const userData = await db.sleepUser.findFirst({
        where: {
            userId: params.id
        }
    });

    if (!userData) {
        return redirect("/");
    }

    return (
        <div>
            {userData.username}
        </div>
    );
}