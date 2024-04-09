import configurations from "@/config";
import Link from "next/link";
import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"footer">;

const { icons } = configurations;

export default function Footer({...props}: Props) {

    return <footer {...props} className="h-full w-full">
        <div className="relative">
            <div className="absolute bottom-0 left-0">
                <div className="flex flex-row px-3 py-3 gap-4">
                    <Link href="https://instagram.com/mjxnglin" className="social-link">
                        <icons.instagram size={20} />
                    </Link>
                    <Link href="" className="social-link">
                        <icons.spotify size={20} />
                    </Link>
                </div>
            </div>
        </div>
    </footer>
}