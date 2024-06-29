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
import HOROSCOPE_COMMAND from "./astrology/horoscope";
import AVATAR_COMMAND from "./misc/avatar";
import HELP_COMMAND from "./help";
import COMPATIBILITY_COMMAND from "./astrology/compatibility";
import EMBED_COMMAND from "./misc/embed";

export const commands = {
    ping: PING_COMMAND,
    birthday: BIRTHDAY_COMMAND,
    sign: SIGN_COMMAND,
    config: CONFIG_COMMAND,
    horoscope: HOROSCOPE_COMMAND,
    avatar: AVATAR_COMMAND,
    help: HELP_COMMAND,
    compatibility: COMPATIBILITY_COMMAND,
    embed: EMBED_COMMAND,
} as const;