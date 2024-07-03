"use client";

import { useDashbar } from "@/hooks/useDashboard";
import { SleepData, SleepUser } from "@prisma/client";
import { ICONS } from "@/config/data/constants";
import Link from "next/link";
import { ActionTooltip } from "../ux/ActionToolTip";
import { DashbarItems } from "@/config/data/constants";
import Image from "next/image";

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
            <div className="h-full text-white/70">
                <div className="flex items-center justify-center">
                    <Link href={`/dashboard/${userData.userId}`} className="py-10 cursor-pointer hover:scale-110 transition-transform duration-100 ease-out">
                        <Image src="/apple-touch-icon.png" width={50} height={50} alt="dashboard" />
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
                                    href={`/dashboard/${userData.userId + item.path}`} className="w-full flex items-center justify-center py-4 transition-all rounded-md hover:bg-blue-200/15 focus:ring focus:outline-none focus:ring-offset-2 hover:scale-95 z-20 gap-2 text-base md:text-lg lg:py-10">
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