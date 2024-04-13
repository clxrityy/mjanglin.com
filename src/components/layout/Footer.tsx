import configurations from "@/config";
import Link from "next/link";
import { ComponentPropsWithRef } from "react";

type Props = ComponentPropsWithRef<"footer">;

const { icons } = configurations;

export default function Footer({ ...props }: Props) {

    return <footer {...props} className="absolute bottom-0 left-0 z-10">
        <div className="flex flex-row px-3 py-3 gap-4">
            <Link aria-label="instagram" href="https://instagram.com/mjxnglin" className="social-link">
                <icons.instagram size={20} />
            </Link>
            <Link aria-label="spotify" href="https://open.spotify.com/artist/0HaFO6TLXEZ2De3d67dThV" className="social-link">
                <icons.spotify size={20} />
            </Link>
        </div>
    </footer>
}