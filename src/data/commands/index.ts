/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 *
 * @see https://discord.com/developers/docs/interactions/application-commands#registering-a-command
 */

import SIGN_COMMAND from "./astrology/sign";
import BIRTHDAY_COMMAND from "./birthday";
import PING_COMMAND from "./misc/ping";
import CONFIG_COMMAND from "./admin/config";

export const commands = {
    ping: PING_COMMAND,
    birthday: BIRTHDAY_COMMAND,
    sign: SIGN_COMMAND,
    config: CONFIG_COMMAND
} as const;