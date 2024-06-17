import { CONFIG } from "@/config";
import { Guild } from "@/types/guild";


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