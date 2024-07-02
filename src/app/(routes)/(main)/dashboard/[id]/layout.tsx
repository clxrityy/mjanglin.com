import DashLayout from "@/components/layout/DashLayout";
import Dashbar from "@/components/layout/Dashbar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ICONS } from "@/config/data/constants";
import MobileDashbar from "@/components/layout/MobileDashbar";

type Props = {
    children: React.ReactNode;
    params: { id: string; };
}

export default async function Layout({ children, params }: Props) {

    const userData = await db.sleepUser.findFirst({
        where: {
            userId: params.id
        },
        include: {
            sleepData: true
        }
    });

    if (!userData) {
        return redirect("/");
    }

    return (
        <DashLayout userData={userData}>
            <MobileDashbar userData={userData} />
            <div className="flex w-full py-20 px-16">
                {children}
            </div>
        </DashLayout>
    )
}