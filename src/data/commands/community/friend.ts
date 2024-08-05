import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const FRIEND_COMMAND: ApplicationCommand = {
    name: "friend",
    description: "Friend command",
    options: [
        {
            name: "request",
            description: "Send a friend request to a user",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "User to send a friend request to",
                    type: ApplicationCommandOptionType.User,
                    required: true
                },
            ],
            
        },
        {
            name: "list",
            description: "List all of your friends",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "remove",
            description: "Remove a friend",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "User to remove from friends",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        },
        {
            name: "accept",
            description: "Accept a friend request",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "User to accept friend request from",
                    type: ApplicationCommandOptionType.User,
                    required: true
                }
            ]
        }
    ]
} as const;

export default FRIEND_COMMAND;