import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const BIRTHDAY_COMMAND: ApplicationCommand = {
    name: "birthday",
    description: "Birthday commands",
    options: [
        {
            name: "set",
            description: "Set your birthday, you can only set it once!",
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
            name: "countdown",
            description: "Countdown to your birthday",
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
            name: "wish",
            description: "Wish a user a happy birthday!",
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: "send",
                    description: "Send a wish",
                    type: ApplicationCommandOptionType.Subcommand,
                    required: false,
                    options: [
                        {
                            name: "user",
                            description: "User to wish",
                            type: ApplicationCommandOptionType.User,
                            required: true
                        },
                        {
                            name: "message",
                            description: "Message to send",
                            type: ApplicationCommandOptionType.String,
                            required: true
                        }
                    ]
                },
                {
                    name: "list",
                    description: "View your birthday wishes",
                    type: ApplicationCommandOptionType.Subcommand,
                    required: false,
                    options: [
                        {
                            name: "year",
                            description: "Year to view",
                            type: ApplicationCommandOptionType.Integer,
                            required: false,
                            max_value: new Date().getFullYear(),
                            min_value: 2024
                        }
                    ]
                }
            ]
        }

    ]
} as const;

export default BIRTHDAY_COMMAND;