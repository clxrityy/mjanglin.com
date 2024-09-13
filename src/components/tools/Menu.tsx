
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import Link from "next/link";
import configurations from "@/config";

const { icons } = configurations;


export default async function Menu() {

    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:scale-95 transition-transform">
                    <Image src="/apple-touch-icon.png" alt="logo" width={30} height={30} />
                </MenubarTrigger>
                <MenubarContent className="">
                    <MenubarItem>
                        <Link href={"/"} className="hover:underline hover:text-blue-500 transition flex flex-row items-center gap-2">
                            <icons.home /> Home
                        </Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>
                            <icons.sub />
                        </MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>
                                <Link href={"https://hbd.mjanglin.com"} className="hover:underline hover:text-blue-500 transition">
                                    hbd.mjanglin.com
                                </Link>
                            </MenubarItem>
                            <MenubarItem>
                                <Link href={"https://sleepgraph.mjanglin.com"} className="hover:underline hover:text-blue-500 transition">
                                    sleepgraph.mjanglin.com
                                </Link>
                            </MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}