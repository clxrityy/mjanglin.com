/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#registering-a-command
 */

import BIRTHDAY_COMMAND from "./birthday";
import PING_COMMAND from "./misc/ping";

export const commands = {
    ping: PING_COMMAND,
    birthday: BIRTHDAY_COMMAND
} as const;