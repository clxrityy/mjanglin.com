import { ApplicationCommand } from '@/types/interactions';
import { ApplicationCommandOptionType } from 'discord-api-types/v10';

const HOLIDAYS_COMMAND: ApplicationCommand = {
    name: "holidays",
    description: "View upcoming holidays",
    options: [
        {
            name: "country_code",
            description: "The country code to view holidays for (US if not specified)",
            type: ApplicationCommandOptionType.String,
            min_length: 2,
            max_length: 3,
        },
        {
            name: "month",
            description: "The month to view holidays for (current month if not specified)",
            type: ApplicationCommandOptionType.Integer,
            required: false,
            min_value: 1,
            max_value: 12
        },
        {
            name: "day",
            description: "The day to view holidays for (current day if not specified)",
            type: ApplicationCommandOptionType.Integer,
            required: false,
            min_value: 1,
            max_value: 31
        },
    ]
} as const;

export default HOLIDAYS_COMMAND;