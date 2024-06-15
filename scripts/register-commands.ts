/**
 * Registers commands for your Discord bot.
 *
 * This file is meant to be run from the command line, and is not used by the
 * application server. It only needs to be run once.
 * Requires Node 18+ for built-in fetch, otherwise you need to polyfill fetch.
 *
 * ===== Usage =====
 * Run `pnpm register-commands` from the root of the repository.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
 */

import { commands } from "@/data/commands";
import { env } from "./env.mjs";

const URL = `https://discord.com/api/v10/applications/${env.CLIENT_ID}/commands`;

/**
 * Register all commands globally.  This can take o(minutes), so wait until
 * you're sure these are the commands you want.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
 */

async function main() {
    const response = await fetch(URL, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bot ${env.BOT_TOKEN}`
        },
        method: "PUT",
        body: JSON.stringify(Object.values(commands)),
    });

    if (response.ok) {
        console.log("Commands registered successfully.");
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } else {
        console.error("Failed to register commands.");
        let errorText = `Error registering commands \n ${response.url}: ${response.status} | ${response.statusText}`;

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

main();