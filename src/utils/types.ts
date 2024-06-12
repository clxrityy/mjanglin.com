import { APIChatInputApplicationCommandInteractionData, ColorResolvable } from "discord.js";

export type OAuth2CrendialsResponse = {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
}

export type CreateUserParams = {
    userId: string;
    accessToken: string;
    refreshToken: string;
}

export type OAuth2UserResponse = {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    email?: string;
    verified?: boolean;
    public_flags: number;
    flags: number;
    banner: string | null;
    banner_color: string | null;
    accent_color: number | null;
    locale: string;
    mfa_enabled: boolean;
}

export type OAuthTokenExchangeRequestParams = {
    client_id: string;
    client_secret: string;
    grant_type: string;
    code: string;
    redirect_uri: string;
    scope: string;
}

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

export type EmbedType = {
    color: ColorResolvable;
    title?: string;
    description?: string;
    url?: string;
    author?: {
        name: string;
        url?: string;
        icon_url?: string;
    };
    fields?: {
        name: string;
        value: string;
        inline?: boolean;
    }[];
    image?: string;
    thumbnail?: string;
    footer?: {
        text: string;
        icon_url?: string;
    };
}

export type InteractionResponse = {
    type: number;
    data: {
        content?: string;
        flags?: number;
        embeds?: EmbedType[];
    },
    ephemeral?: boolean;
}

export type InteractionData = {
    data: APIChatInputApplicationCommandInteractionData & {
        options?: {
            name: string;
            value: any;
        }[];
    };
    guildId?: string;
    channelId?: string;
    member?: {
        user: {
            id: string;
            username: string;
            discriminator: string;
            avatar: string | null;
        }
    }
    application_id: string;
    token: string;
    locale?: string;
    version: number;
}