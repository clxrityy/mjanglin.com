"use client";

import { useDashbar } from "@/hooks/useDashboard";
import { SleepData, SleepUser } from "@prisma/client";
import { ICONS } from "@/config/data/constants";
import Link from "next/link";
import { ActionTooltip } from "../ux/ActionToolTip";
import { DashbarItems } from "@/config/data/constants";

type Props = {
    userData: SleepUser & {
        sleepData: SleepData[];
    };
}

const dashItems = Object.values(DashbarItems);

export default function Dashbar({ userData }: Props) {

    const { setActive } = useDashbar();

    return (
        <div className="relative w-52 left-0 top-0">
            <div className="h-full text-white">
                <div className="flex items-center justify-center">
                    <Link href="/" className="py-10">
                        <ICONS.clock size={50} />
                    </Link>
                </div>
                <div className="h-full">
                    <div className="flex items-center flex-col justify-evenly h-[40vh] w-full">
                        {dashItems.map((item, idx) => (
                            <ActionTooltip side="right" label={item.description} key={idx}>
                                <Link
                                    onClick={() => setActive({
                                        activePath: item.path
                                    }, userData)}
                                    href={`/dashboard/${userData.userId + item.path}`} className="w-full flex items-center justify-center py-4 transition-all rounded-md hover:bg-blue-200/15 focus:ring focus:outline-none focus:ring-offset-2 hover:scale-95 static z-20 gap-2 text-base md:text-lg">
                                <item.icon size={24} />
                                    <span>
                                    {item.title}
                                    </span>
                                </Link>
                            </ActionTooltip>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}