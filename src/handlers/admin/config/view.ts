import { fetchGuild } from "@/data/util/functions/guild";
import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";

export default async function viewConfigHandler(userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    const existingGuild = await db.guild.findUnique({
        where: {
            guildId: guildId
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60,
        }
    });

    if (existingGuild) {

        embed = EMBEDS.error;

    } else {
        const guild = await fetchGuild(guildId);

        if (guild.owner_id === userId) { 
            embed = {
                title: "Config",
                description: "You are the owner of this server",
                color: Colors.GREEN
            }
        } else {
            embed = {
                title: "Config",
                description: "You are not the owner of this server",
                color: Colors.RED
            }
        }
    }


    return embed;
}