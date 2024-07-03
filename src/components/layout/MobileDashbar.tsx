"use client";
import { DashbarItems, ICONS } from "@/config/data/constants";
import { useState } from "react";
import { ActionTooltip } from "../ux/ActionToolTip";
import { SleepUser } from "@prisma/client";
import Link from "next/link";
import { useDashbar } from "@/hooks/useDashboard";

type Props = {
    userData: {
        sleepData: {
            id: string;
            userId: string;
            duration: number;
            date: Date;
        }[]
    } & SleepUser;
}

export default function MobileDashbar({userData}: Props) {

    const { setActive } = useDashbar();
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const handleOpen = () => {
        setOpenMenu(true)
    }
    const handleClose = () => {
        setOpenMenu(false)
    }

    const dashItems = Object.values(DashbarItems);

    return (
        <div className="relative md:hidden border-r border-b rounded-md border-zinc-700 shadow-md mt-5 duration-400 ease-in transition">
            <div className="absolute top-0 left-0 px-4 py-4">
                {!openMenu ? (
                    <ICONS.dashboard size={30} onClick={handleOpen} className="cursor-pointer hover:scale-90 transition-transform hover:shadow-md" />
                ) : (null)}
            </div>
            {openMenu ? (
                <div className="relative bg-zinc-950/25 w-40 shadow-lg transition-transform rounded-md duration-200 h-full mr-auto">
                    <div className="flex justify-end px-4 py-4">
                        <ICONS.close size={30} className="cursor-pointer hover:scale-90 transition-transform hover:shadow-md" onClick={handleClose} />
                    </div>
                    <div className="flex flex-col items-center justify-evenly gap-5 h-2/3 pb-10">
                        {dashItems.map((item, idx) => (
                            <ActionTooltip side="bottom" label={item.description} key={idx}>
                                <Link
                                    onClick={() => setActive({
                                        activePath: item.path
                                    }, userData)}
                                    href={`/dashboard/${userData.userId}/${item.path}`} className="w-full flex items-center justify-center py-4 transition-all rounded-md hover:bg-blue-200/15 focus:ring focus:outline-none focus:ring-offset-2 hover:scale-95 static z-20 gap-2 text-base md:text-lg">
                                <item.icon size={24} />
                                    <span>
                                    {item.title}
                                    </span>
                                </Link>
                            </ActionTooltip>
                        ))}
                    </div>
                </div>
            ) : (null)}
        </div>
    )
}

