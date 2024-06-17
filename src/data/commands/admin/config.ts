import { PERMISSIONS } from "@/types/constants";
import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const CONFIG_COMMAND: ApplicationCommand = {
    name: "config",
    description: "View or change the bot's configuration",
    permissions: [PERMISSIONS.ADMINISTRATOR],
    options: [
        {
            name: "view",
            description: "View the bot's configuration",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "set",
            description: "Set the bot's configuration",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "changeable",
                    description: "Changeable birthdays",
                    type: ApplicationCommandOptionType.Boolean,
                    required: false
                }
            ]
        }
    ]
} as const;

export default CONFIG_COMMAND;