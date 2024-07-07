import Guild from "@/components/elements/Guild";
import MainButton from "@/components/ui/MainButton";
import { CONFIG } from "@/config";
import { db } from "@/lib/db";
import { parseUser } from "@/utils/parseUser";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
    const user = parseUser();

    if (!user) {
        return redirect(CONFIG.URLS.OAUTH2_INVITE_URL);
    }

    const userGuilds = await db.user.findUnique({
        where: {
            userId: user.id
        },
        include: {
            guilds: true
        }
    });

    return (
        <main>
            <div className="flex justify-center items-center flex-col gap-10">
                <div className="flex flex-row items-center justify-center gap-5">
                    <h1 className="text-[#F69FC2]">hbd</h1>
                    <Image src="/apple-touch-icon.png" alt="hbd" width={64} height={64} />
                </div>
                <div className="flex items-center justify-center flex-col gap-2">
                    <h3>
                        Welcome, <span className="text-blue-400 tracking-wide">{user.username}</span>!
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center h-full max-w-sm md:max-w-xl lg:max-w-4xl gap-8">
                    <MainButton color="tertiary">
                        <Link href={CONFIG.URLS.INVITE_URL} className="flex flex-row gap-2 items-center text-center justify-center">
                            Invite <span className="">
                                <CONFIG.ICONS.INVITE size={24} />
                            </span>
                        </Link>
                    </MainButton>
                    <MainButton color="tertiary">
                        <Link href="/commands" className="flex flex-row gap-2 items-center text-center justify-center">
                            Commands <span className=""><CONFIG.ICONS.COMMANDS size={24} /></span>
                        </Link>
                    </MainButton>
                    <MainButton color="primary">
                        <Link href={CONFIG.URLS.TEST_GUILD_URL} className="flex flex-row gap-2 items-center text-center justify-center">
                            Developer Server <span className="text-[#5865F2]"><CONFIG.ICONS.DISCORD size={24} /></span>
                        </Link>
                    </MainButton>
                    <MainButton color="primary">
                        <Link href={CONFIG.URLS.GITHUB_REPO} className="flex flex-row gap-2 items-center text-center justify-center">
                            GitHub <span className="bg-transparent rounded-full text-zinc-800"><CONFIG.ICONS.GITHUB size={24} /></span>
                        </Link>
                    </MainButton>
                </div>
                <div className="flex flex-col items-center justify-center gap-5">
                    <h2>
                        Guilds
                    </h2>
                    <div className="flex items-center justify-center">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4">
                            {userGuilds?.guilds.map((guild) => (
                                <Guild key={guild.guildId} {...guild} />
                            ))}
                            <Link href={CONFIG.URLS.INVITE_URL} className="px-4 py-4 text-4xl border rounded-md flex items-center justify-center hover:scale-95 transition-all shadow hover:opacity-90 hover:text-emerald-400 hover:border-emerald-400 font-extrabold hover:bg-emerald-400/15" aria-label="Add to guild">
                                +
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}