import { CONFIG } from "@/config";
import { OAuth2UserResponse } from "@/types/auth";

export async function fetchUser(userId: string): Promise<OAuth2UserResponse> {
    const apiUrl = CONFIG.URLS.DISCORD_API_BASE_URL + `/users/${userId}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bot ${CONFIG.VALUES.BOT_TOKEN}`
            }
        });

        const user = JSON.parse(JSON.stringify(await response.json())) as OAuth2UserResponse;

        return user;
    } catch (e: any) {
        console.error(e);
        throw new Error("Failed to fetch user");
    }
}