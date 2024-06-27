import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const HELP_COMMAND: ApplicationCommand = {
    name: "help",
    description: "Get help with commands",
    options: [
        {
            name: "command",
            description: "Get help with a specific command",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ]
} as const;

export default HELP_COMMAND;