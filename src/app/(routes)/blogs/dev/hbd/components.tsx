import Image from "next/image";
import Link from "next/link";
import { LawIcon, InviteIcon, GithubIcon, DiscordIcon } from "./icons";
import { RiNextjsLine } from "react-icons/ri";
import { FaDiscord } from "react-icons/fa";
import { FaReact } from "react-icons/fa6";
import { SiPrisma, SiVercel } from "react-icons/si";
import { TbBrandTypescript } from "react-icons/tb";

export function Logo() {
    return <Image src="/img/hbd.png" alt="HBD Logo" width={25} height={25} priority fetchPriority="auto" />
}

export function Banner() {
    return <div className="flex flex-col items-center justify-center gap-5">
        <div className="flex flex-row gap-2 items-center justify-center">
            <Logo />
            <h1>
                <Link href="https://hbd.mjanglin.com">
                    hbd
                </Link>
            </h1>
        </div>
        <Image src="/img/hbd_banner.gif" alt="HBD Banner" width={50} height={50} priority fetchPriority="auto" unoptimized className="hidden lg:block" />
        <div className="flex flex-col items-center text-sm gap-2 font-mono">
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
        <div className="flex items-center justify-end w-full">
            <Tags />
        </div>
    </div>
}

const TAGS = [
    {
        title: "Nextjs",
        className: "bg-transparent text-white",
        icon: RiNextjsLine,
    },
    {
        title: "Discord",
        className: "bg-transparent text-[#5865F2]",
        icon: FaDiscord,
    },
    {
        title: "TypeScript",
        className: "bg-transparent text-[#3178C6]",
        icon: TbBrandTypescript,
    },
    {
        title: "React",
        className: "bg-transarent text-[#61DAFB]",
        icon: FaReact,
    },
    {
        title: "Prisma",
        className: "bg-transparent text-white",
        icon: SiPrisma,
    },
    {
        title: "Vercel",
        className: "bg-transparent text-white/75",
        icon: SiVercel,
    },
]

export function Tags() {
    return <div className="grid grid-cols-2 md:grid-cols-3 gap-2 items-center">
        {TAGS.map((tag, idx) => {
            return <div key={idx} className={`flex flex-row items-center gap-1 p-2 rounded-full text-[0.75rem] font-semibold bg-slate-950/50 justify-center transition hover:drop-shadow cursor-pointer hover:scale-90 ease-linear`}>
                <tag.icon size={22} className={`rounded-full p-[0.175rem] ${tag.className}`} />
                <span className="font-700 tracking-wide opacity-90">{tag.title}</span>
            </div>
        })}
    </div>
}

export function Footer() {
    return <footer className="relative w-full">
        <div className="flex flex-row items-center justify-start gap-4 absolute py-5">

            <Image src="/img/hbd.png" alt="HBD Logo" width={50} height={50} priority fetchPriority="auto" className="hover:scale-110 transition cursor-pointer" />

            <Link href="https://hbd.mjanglin.com/commands">
                Commands
            </Link>
            <Link href="">
                Invite
            </Link>
        </div>
        <div className="absolute">
        </div>
    </footer>
}
