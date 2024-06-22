
import { env } from "./env.mjs";

const URL = `https://discord.com/api/v10/users/@me`;


/**
 * Changes the avatar for your Discord bot
 * 
 * This file is meant to be run from the command line, and is not used by the
 * application server. It only needs to be run once.
 * Requires Node 18+ for built-in fetch, otherwise you need to polyfill fetch.
 * 
 * ===== Usage =====
 * Run `pnpm change-avatar` from the root of the repository.
 * @see https://discord.com/developers/docs/resources/user#modify-current-user
 * @param {string} avatar - The URL of the new avatar.
 */

async function main(avatar: string) {
    const body = {
        avatar: avatar
    }

    const response = await fetch(URL, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bot ${env.BOT_TOKEN}`
        },
        method: "PATCH",
        body: JSON.stringify(body),
    });

    if (response.ok) {
        console.log("Avatar changed successfully.");
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } else {
        console.error("Failed to change avatar.");
        let errorText = `Error changing avatar \n ${response.url}: ${response.status} | ${response.statusText}`;

        try {
            const error = await response.text();
            if (error) {
                errorText = `${errorText} \n ${error}`
            }
        } catch (e) {
            console.error(`Failed to parse error response: ${e}`)
        }
        console.error(errorText);
    }
}


// REPLACE THIS URL WITH THE URL OF THE NEW AVATAR
main("https://cdn.discordapp.com/attachments/1210719560995700746/1254185292479598592/apple-touch-icon.png?ex=66789293&is=66774113&hm=6bd82661f077243e8f73ff96484ebfddaec034f593e34b7d01a0761992c993be&");