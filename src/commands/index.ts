/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#registering-a-command
 */

import PING_COMMAND from "./test/ping";

export const commands = {
    ping: PING_COMMAND
} as const;