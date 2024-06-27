import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const AVATAR_COMMAND: ApplicationCommand = {
    name: "avatar",
    description: "Get the avatar of a user",
    options: [
        {
            name: "user",
            description: "User to get the avatar of",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ]
}

export default AVATAR_COMMAND;