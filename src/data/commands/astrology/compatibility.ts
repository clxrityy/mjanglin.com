import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const COMPATIBILITY_COMMAND: ApplicationCommand = {
    name: "compatibility",
    description: "View the compatibility between yourself and another user",
    options: [
        {
            name: "user",
            description: "The user to check compatibility with",
            type: ApplicationCommandOptionType.User,
            required: true
        },
    ]
} as const;

export default COMPATIBILITY_COMMAND;