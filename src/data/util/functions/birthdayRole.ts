import { CONFIG } from "@/config";

/**
 * @see https://discord.com/developers/docs/resources/guild#add-guild-member-role
 */

export async function giveBirthdayRole(guildId: string, userId: string, roleId: string) {
    const apiUrl = CONFIG.URLS.DISCORD_API_BASE_URL + `/guilds/${guildId}/members/${userId}/roles/${roleId}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bot ${CONFIG.VALUES.BOT_TOKEN}`
            },
            method: "PUT"
        });

        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }

    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to give birthday role");
    }
}