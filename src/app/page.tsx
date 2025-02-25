import { Button } from "@/components/ui/Button";
import MainButton from "@/components/ui/MainButton";
import { CONFIG } from "@/config";
import { fetchGuild, getGuildAvatar } from "@/data/util/functions/guild";
import { db } from "@/lib/db";
import { parseUser } from "@/utils/parseUser";
import Image from "next/image";
import Link from "next/link";
import { type Guild as GuildType } from "@/types/guild";

export default async function Page() {
    const user = await parseUser();

    const Guild = (await import("@/components/elements/Guild")).default;

    const getGuildInfo = async ({guildId}: { guildId:string }) => {
        const guild = await fetchGuild(guildId);
        const avatar = await getGuildAvatar({id: guild.id, icon: guild.icon ?? ""});
        return {guild, avatar};
    }

    if (!user) {
        return <main>
            <div className="flex justify-center items-center flex-col gap-10">
                <div className="flex flex-row items-center justify-center gap-5">
                    <h1 className="text-[#F69FC2]">hbd</h1>
                    <Image src="/apple-touch-icon.png" alt="hbd" width={64} height={64} className="animate-spin-slow" />
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
                        Sign in to add guilds!
                    </h2>
                    <Button className="bg-[#5865F2] text-white text-lg opacity-75 hover:opacity-100 focus:ring focus:ring-offset-4" >
                        <Link href={CONFIG.URLS.OAUTH2_INVITE_URL}>Sign in</Link>
                    </Button>
                </div>
            </div>
        </main>
    }

    const userGuilds = await db.user.findUnique({
        where: {
            userId: user.id
        },
        include: {
            guilds: true
        }
    }) as {guilds: {guildId: string}[]};

    return (
        <main>
            <div className="flex justify-center items-center flex-col gap-10">
                <div className="flex flex-row items-center justify-center gap-5">
                    <h1 className="text-[#F69FC2]">hbd</h1>
                    <Image src="/apple-touch-icon.png" alt="hbd" width={64} height={64} className="animate-spin-slow" />
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
                            {userGuilds?.guilds.map((guild) => {
                                let avatar: string = "";
                                let gld: GuildType = {id: "", name: "", icon: null, owner_id: ""};

                                getGuildInfo({guildId: guild.guildId}).then((r) => {
                                    avatar = r.avatar;
                                    gld = r.guild;
                                });
                                
                                return <Guild key={guild.guildId} guildData={guild as {guildId: string, id: string, userId: string, changeable: boolean, adminRoleId: string | null, birthdayMessage: string | null, birthdayRoleId: string | null}} avatar={avatar} guild={gld} />
                            })}
                            <Link href={CONFIG.URLS.INVITE_URL} className="px-4 py-4 text-4xl border rounded-md flex items-center justify-center hover:scale-95 transition-all shadow hover:opacity-90 hover:text-emerald-400 hover:border-emerald-400 font-extrabold hover:bg-emerald-400/15 box-shadow-box-important focus:ring focus:ring-emerald-300/50" aria-label="Add to guild">
                                +
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}