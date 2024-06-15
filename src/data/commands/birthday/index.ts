import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const BIRTHDAY_COMMAND: ApplicationCommand = {
    name: "birthday",
    description: "Birthday commands",
    options: [
        {
            name: "set",
            description: "Set your birthday",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "month",
                    description: "Month of your birthday",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                    min_value: 1,
                    max_value: 12
                },
                {
                    name: "day",
                    description: "Day of your birthday",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                    min_value: 1,
                    max_value: 31
                },
            ],
        },
        {
            name: "view",
            description: "View a birthday",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "user",
                    description: "User to view",
                    type: ApplicationCommandOptionType.User,
                    required: false
                }
            ]
        },
        {
            name: "edit",
            description: "Edit your birthday (only one time)",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "month",
                    description: "Month of your birthday",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                    min_value: 1,
                    max_value: 12
                },
                {
                    name: "day",
                    description: "Day of your birthday",
                    type: ApplicationCommandOptionType.Integer,
                    required: true,
                    min_value: 1,
                    max_value: 31
                },
            ],
        }
    ]
} as const;

export default BIRTHDAY_COMMAND;