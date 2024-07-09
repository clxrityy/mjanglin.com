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
                {
                    name: "birthday_role",
                    description: "The role to give to users on their birthday",
                    type: ApplicationCommandOptionType.Role,
                    required: false
                },
                {
                    name: "birthday_message",
                    description: "The message to send when it's someone's birthday (use {user} for the user's mention)",
                    type: ApplicationCommandOptionType.String,
                    required: false
                }
            ]
        }
    ]
} as const;

export default CONFIG_COMMAND;