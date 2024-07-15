import { DashbarItems } from "@/config/data/constants";
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
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

    const dashItems = Object.values(DashbarItems);

    const addNewRecord = dashItems.find(item => item.title === "Add Record");
    const viewData = dashItems.find(item => item.title === "Data");
    const viewPattern = dashItems.find(item => item.title === "Graph");

    const renderDashItems = (items: typeof dashItems) => {

        const addRecord = items.find(item => item === addNewRecord);
        const data = items.find(item => item === viewData);
        const pattern = items.find(item => item === viewPattern);

        let className = "border border-zinc-500 px-32 py-20 rounded-md cursor-pointer hover:border-zinc-300 transition hover:scale-95 hover:shadow grid grid-flow-col items-center justify-center gap-2 w-full opacity-70 hover:opacity-90 focus:ring focus:outline-none focus:ring-offset-2";



        return items.map((item, index) => {
            
            if (item === addRecord) {

                className = "border border-zinc-500 px-32 py-20 rounded-md cursor-pointer hover:border-emerald-500/95 transition hover:scale-95 hover:shadow grid grid-flow-col items-center justify-center gap-2 w-full opacity-70 hover:opacity-90 focus:ring focus:outline-none focus:ring-offset-2 hover:text-emerald-500/80"

                return (
                    <Link key={index} href={`/dashboard/${userData.userId}${item.path}`} className={className}>
                        <item.icon className="h-20 w-20 font-light" />
                        <div className="flex flex-col items-start justify-center gap-2 min-w-40">
                            <h4 className="uppercase font-mono tracking-wider">{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                );
            } else if (item === data) {

                className = "border border-zinc-500 px-32 py-20 rounded-md cursor-pointer hover:border-blue-500/95 transition hover:scale-95 hover:shadow grid grid-flow-col items-center justify-center gap-2 w-full opacity-70 hover:opacity-90 focus:ring focus:outline-none focus:ring-offset-2 hover:text-blue-500/80"

                return (
                    <Link key={index} href={`/dashboard/${userData.userId}${item.path}`} className={className}>
                        <item.icon className="h-20 w-20 font-light" />
                        <div className="flex flex-col items-start justify-center gap-2 min-w-40">
                            <h4 className="uppercase font-mono tracking-wider">{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                );
            } else if (item === pattern) {
                    
                    className = "border border-zinc-500 px-32 py-20 rounded-md cursor-pointer hover:border-yellow-500/95 transition hover:scale-95 hover:shadow grid grid-flow-col items-center justify-center gap-2 w-full opacity-70 hover:opacity-90 focus:ring focus:outline-none focus:ring-offset-2 hover:text-yellow-500/80"
    
                return (
                    <Link key={index} href={`/dashboard/${userData.userId}${item.path}`} className={className}>
                        <item.icon className="h-20 w-20 font-light" />
                        <div className="flex flex-col items-start justify-center gap-2 min-w-40">
                            <h4 className="uppercase font-mono tracking-wider">{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    </Link>
                );
             }

            
        });
    }

    return (
        <div className="w-full items-center justify-center flex">
            <div className="flex flex-col items-center gap-20 lg:gap-40">
                <div className="flex items-center justify-center flex-col gap-5">
                    <h2>
                        Dashboard
                    </h2>
                    <h4 className="flex flex-row items-center gap-3">
                        <Image src={userData.avatar} width={30} height={30} className="rounded-full" alt={userData.username} />
                        {userData.username}
                    </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:grid-cols-3 justify-normal w-full">
                    {renderDashItems(dashItems)}
                </div>
            </div>
        </div>
    );
}