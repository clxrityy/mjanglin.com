import { fetchGuild, getGuildAvatar } from "@/data/util/functions/guild";
import { Guild as GuildData } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function Guild(guildData: GuildData) {
    const guild = await fetchGuild(guildData.guildId);
    const avatar = await getGuildAvatar(guild);

    return <Link href={`/guilds/${guildData.guildId}`} className="hover:scale-95 transition-all shadow-md border p-4 rounded-md border-blue-400 hover:border-blue-600 hover:shadow-lg bg-blue-400/10 hover:bg-blue-400/25 box-shadow-box focus:ring focus:ring-blue-300/50">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
            <Image src={avatar} alt={guild.name} width={64} height={64} className="rounded-full" />
            <h3 className="text-xl font-semibold">{guild.name}</h3>
        </div>
    </Link>
}