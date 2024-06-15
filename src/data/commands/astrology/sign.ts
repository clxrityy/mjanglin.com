import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const SIGN_COMMAND: ApplicationCommand = {
    name: "sign",
    description: "View user zodiac signs",
    options: [
        {
            name: "user",
            description: "User to view",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ]
} as const;

export default SIGN_COMMAND;