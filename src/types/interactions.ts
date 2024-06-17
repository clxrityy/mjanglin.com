import {  InteractionResponseType } from "discord-api-types/v10";
import { EmbedType } from "./general";

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
    permissions?: number[];
}

export interface InteractionOption {
    name: string;
    type: number;
    value: string | number | boolean;
}

export interface InteractionData {
    id: string;
    name: string;
    options?: InteractionSubcommand<InteractionOption>[] | InteractionOption[];
}

export type InteractionResponse = {
    type: InteractionResponseType.Pong | InteractionResponseType.ChannelMessageWithSource | InteractionResponseType.DeferredChannelMessageWithSource;
    data?: {
        content?: string;
        flags?: number;
        embeds?: EmbedType[];
    },
}

export interface InteractionSubcommand<T extends InteractionOption> {
    name: string;
    type: number;
    options?: T[];
}

export interface CommandData {
    id: string,
    application_id: string,
    default_member_permissions: string | null;
    version: string;
    name: string;
    type: number;
    description: string;
    dm_permission: boolean | null;
    contexts: any | null;
    integration_types: number[];
    nswf: boolean | null;
    options?: CommandDataSubCommandOrOption[];
}

export interface CommandDataSubCommandOrOption {
    type: number;
    name: string;
    description: string;
    required?: boolean;
    choices?: { name: string, value: string }[];
    options?: {
        type: number;
        name: string;
        description: string;
        required?: boolean;
        min_value?: number;
        max_value?: number;
        min_length?: number;
        max_length?: number;
    }[];
};