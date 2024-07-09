import { CONFIG } from "@/config";
import { Guild, GuildMember, GuildRole } from "@/types/guild";


/**
 * 
 * @param guildId 
 * @see https://discord.com/developers/docs/resources/guild#get-guild
 */

export async function fetchGuild(guildId: string): Promise<Guild> {
    const apiUrl = CONFIG.URLS.DISCORD_API_BASE_URL + `/guilds/${guildId}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bot ${CONFIG.VALUES.BOT_TOKEN}`
            }
        });
    
        const guild = JSON.parse(JSON.stringify(await response.json())) as Guild;
    
        return guild;
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch guild");
    }
}

export async function getGuildAvatar(guild: Guild): Promise<string> {
    return guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : "/placeholder-discord.png";
}

export async function getGuildRoles(guildId: string): Promise<string[]> {
    const apiUrl = CONFIG.URLS.DISCORD_API_BASE_URL + `/guilds/${guildId}/roles`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bot ${CONFIG.VALUES.BOT_TOKEN}`
            }
        });

        const roles = JSON.parse(JSON.stringify(await response.json())) as string[];

        return roles;
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch guild roles");
     }
}

export async function getGuildMembers(guildId: string): Promise<GuildMember[]> {
    const apiUrl = CONFIG.URLS.DISCORD_API_BASE_URL + `/guilds/${guildId}/members`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bot ${CONFIG.VALUES.BOT_TOKEN}`
            }
        });

        const members = JSON.parse(JSON.stringify(await response.json())) as GuildMember[];

        return members;
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch guild members");
    }
}