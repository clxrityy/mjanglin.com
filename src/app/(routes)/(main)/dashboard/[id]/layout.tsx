import DashLayout from "@/components/layout/DashLayout";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import MobileDashbar from "@/components/layout/MobileDashbar";
import { Toaster } from "react-hot-toast";

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
            <div className="w-full flex flex-row">
                <MobileDashbar userData={userData} />
                <div className="flex w-full py-20 px-16">
                    {children}
                </div>
            </div>
            <Toaster />
        </DashLayout>
    )
}