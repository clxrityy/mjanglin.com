import { APIApplicationCommandInteractionData, APIChatInputApplicationCommandInteraction, APIChatInputApplicationCommandInteractionData, APIPingInteraction, InteractionResponseType } from "discord-api-types/v10";

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
    color: number;
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
    image?: {
        url: string;
    }
    thumbnail?: string;
    footer?: {
        text: string;
        icon_url?: string;
    };
}

export type InteractionResponse = {
    type: InteractionResponseType.Pong | InteractionResponseType.ChannelMessageWithSource | InteractionResponseType.DeferredChannelMessageWithSource;
    data?: {
        content?: string;
        flags?: number;
        embeds?: EmbedType[];
    },
}


export interface InteractionData <T extends APIChatInputApplicationCommandInteraction | APIPingInteraction> { 
    data: T & {
        options?: {
            name: string;
            type: number;
            value?: string | number | boolean;
        }[];
    }
}

export enum Colors {
    DEFAULT = 0x000000,
    WHITE = 0xFFFFFF,
    AQUA = 0x1ABC9C,
    GREEN = 0x2ECC71,
    BLUE = 0x3498DB,
    YELLOW = 0xFFFF00,
    PURPLE = 0x9B59B6,
    LUMINOUS_VIVID_PINK = 0xE91E63,
    GOLD = 0xF1C40F,
    ORANGE = 0xE67E22,
    RED = 0xE74C3C,
    GREY = 0x95A5A6,
    NAVY = 0x34495E,
    DARK_AQUA = 0x11806A,
    DARK_GREEN = 0x1F8B4C,
    DARK_BLUE = 0x206694,
    DARK_PURPLE = 0x71368A,
    DARK_VIVID_PINK = 0xAD1457,
    DARK_GOLD = 0xC27C0E,
    DARK_ORANGE = 0xA84300,
    DARK_RED = 0x992D22,
    DARK_GREY = 0x979C9F,
    DARKER_GREY = 0x7F8C8D,
    LIGHT_GREY = 0xBCC0C0,
    DARK_NAVY = 0x2C3E50,
    BLURPLE = 0x7289DA,
    GREYPLE = 0x99AAB5,
    DARK_BUT_NOT_BLACK = 0x2C2F33,
    NOT_QUITE_BLACK = 0x23272A
}

// export interface InteractionRawBody {
//     app_permissions: string;
//     application_id: string;
//     authorizing_integration_owners: {
//         [key: string]: string;
//     };
//     channel: {
//         flags: number;
//         guild_id: string;
//         id: string;
//         last_message_id: string;
//         last_pin_timestamp: string;
//         name: string;
//         nsfw: boolean;
//         parent_id: string;
//         permissions: string;
//         position: number;
//         rate_limit_per_user: number;
//         topic: string | null;
//         type: number;
//     };
//     channel_id: string;
//     context: number;
//     data: {
//         id: string;
//         name: string;
//         type: number;
//     };
//     entitlement_sku_ids: string[];
//     entitlements: string[];
//     guild: {
//         features: string[];
//         id: string;
//         locale: string;
//     };
//     guild_id: string;
//     guild_locale: string;
//     id: string;
//     locale: string;
//     member: {
//         avatar: string | null;
//         communication_disabled_until: string | null;
//         deaf: boolean;
//         flags: number;
//         joined_at: string;
//         mute: boolean;
//         nick: string | null;
//         pending: boolean;
//         permissions: string;
//         premium_since: string | null;
//         roles: string[];
//         unusual_dm_activity_until: string | null;
//         user: {
//             avatar: string;
//             avatar_decoration_data: {
//                 asset: string;
//                 sku_id: string;
//             };
//             clan: string | null;
//             discriminator: string;
//             global_name: string;
//             id: string;
//             public_flags: number;
//             username: string;
//         }
//     }
//     token: string;
//     type: number;
//     version: number;
// }