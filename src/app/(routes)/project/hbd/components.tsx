import Image from "next/image";
import Link from "next/link";
import { LawIcon, InviteIcon, GithubIcon, DiscordIcon } from "./icons";

export function Logo() {
    return <Image src="/img/hbd.png" alt="HBD Logo" width={25} height={25} priority fetchPriority="auto"  />
}

export function Banner() {
    return <div className="flex flex-col items-center justify-between lg:flex-row">
        <div className="flex flex-row gap-2 items-center justify-center">
            <Logo />
            <h1>
                <Link href="https://hbd.mjanglin.com">
                    hbd
                </Link>
            </h1>
        </div>
        <Image src="/img/hbd_banner.gif" alt="HBD Banner" width={50} height={50} priority fetchPriority="auto" unoptimized className="hidden lg:block" />
        <div className="flex flex-col items-center text-xs gap-2 font-mono">
            <Link href="https://hbd.mjanglin.com/terms-of-service" className="flex flex-row items-center gap-1">
                <LawIcon /> Terms of Service
            </Link>
            <Link href="https://hbd.mjanglin.com/terms-of-service#privacy-policy" className="flex flex-row items-center gap-1">
                <LawIcon /> Privacy Policy
            </Link>
            <div className="flex flex-row gap-2">
            <Link href="https://discord.com/oauth2/authorize?client_id=1211045842362966077&permissions=2147745792&redirect_uri=https%3A%2F%2Fhbd.mjanglin.com%2Fapi%2Fauth%2Fdiscord%2Fredirect&integration_type=0&scope=bot+applications.commands" className="flex flex-row items-center gap-1">
                <InviteIcon /> Invite
            </Link>
            <Link href="https://discord.gg/n65AVpTFNf" className="flex flex-row items-center gap-1">
                <DiscordIcon /> Discord
            </Link>
            <Link href="https://github.com/clxrityy/mjanglin.com/tree/hbd" className="flex flex-row items-center gap-1">
                <GithubIcon /> GitHub
            </Link>
            </div>
        </div>
    </div>
}