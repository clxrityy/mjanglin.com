import { PERMISSIONS } from "@/types/constants";
import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const CONFIG_COMMAND: ApplicationCommand = {
    name: "config",
    description: "View or change the bot's configuration (admin only)",
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
                    description: "Whether or not a birthday can be changed after it is set",
                    type: ApplicationCommandOptionType.Boolean,
                    required: false
                },
                {
                    name: "admin_role",
                    description: "The role that can use admin commands",
                    type: ApplicationCommandOptionType.Role,
                    required: false
                },
            ]
        }
    ]
} as const;

export default CONFIG_COMMAND;