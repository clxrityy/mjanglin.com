import { db } from "@/lib/db";
import Image from "next/image";
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
        <div className="w-full items-center justify-center flex">
            <div className="flex flex-col items-center gap-10">
                <div className="flex items-center justify-center flex-col gap-5">
                    <h2>
                        Dashboard
                    </h2>
                    <h3 className="flex flex-row items-center gap-3">
                        <Image src={userData.avatar} width={30} height={30} className="rounded-full" alt={userData.username} />
                        {userData.username}
                    </h3>
                </div>
            </div>
        </div>
    );
}