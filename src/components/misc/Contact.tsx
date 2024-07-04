import { Button } from "@nextui-org/react";
import Link from "next/link";
import configuration from "@/config";

const { icons } = configuration;

export default function Contact() {

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-xl flex items-center justify-center mx-auto">
                <div className="w-full h-full">
                    <Button className="bg-gradient-to-tlcursor-pointer w-full h-full px-10 py-3 focus:ring-white focus:ring border-white/50 border-2">
                        <Link href="mailto:contact@mjanglin.com" className="text-white text-lg uppercase tracking-widest font-semibold flex flex-col gap-1 text-center items-center justify-center">
                            <span className="flex flex-row items-center gap-2 justify-center">
                                <icons.email /> Contact
                            </span>
                            <span className="text-xs lowercase tracking-tight opacity-80 flex justify-end w-full items-end">
                                contact@mjanglin.com
                            </span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}