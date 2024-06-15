import { InteractionResponseType } from "discord-api-types/v10";
import { DiscordUser, EmbedType } from "./general";

export type ApplicationCommandOption = {
    type: number;
    name: string;
    description: string;
    required?: boolean;
    min_value?: number;
    max_value?: number;
    min_length?: number;
    max_length?: number;
    autocomplete?: boolean;
    choices?: { name: string, value: string }[];
    options?: ApplicationCommandOption[];
    channel_types?: number[];
}

export type ApplicationCommand = {
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
}

export interface InteractionOption {
    name: string;
    type: number;
    value: string | number | boolean | DiscordUser;
}

export interface InteractionData {
    id: string;
    name: string;
    options?: InteractionSubcommandOrOption<InteractionOption>[]
}

export type InteractionResponse = {
    type: InteractionResponseType.Pong | InteractionResponseType.ChannelMessageWithSource | InteractionResponseType.DeferredChannelMessageWithSource;
    data?: {
        content?: string;
        flags?: number;
        embeds?: EmbedType[];
    },
}

export interface InteractionSubcommandOrOption<T extends InteractionOption> {
    name: string;
    type: number;
    options?: T[];
}