import { Button } from "@nextui-org/react";
import Link from "next/link";
import configurations from "@/config";

const { icons } = configurations;

export default function Discord() {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-xl flex items-center justify-center mx-auto">
                <div className="w-full h-full">
                    <Button className={`hover:border-[#7289DA] border-2 border-white/50 cursor-pointer w-full h-full px-10 py-3 focus:ring-[#7289DA] focus:ring bg-transparent hover:scale-90 transition-transform bg-gradient-to-b from-[#7289da72] to-[#7289da49]`}>
                        <Link href="https://discord.gg/6G87pRmBG8" className="text-white text-lg uppercase tracking-widest font-semibold flex flex-col gap-1 text-center items-center justify-center">
                            <span className="flex flex-row items-center gap-2 justify-center">
                                <icons.discord /> Discord
                            </span>
                            <span className="text-xs lowercase tracking-wide opacity-80 flex justify-end w-full items-end">
                                @clxrity_
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}