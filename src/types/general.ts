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
    thumbnail?: {
        url: string;
        height?: number;
        width?: number;
    }
    footer?: {
        text: string;
        icon_url?: string;
    };
}

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string | null;
    accent_color: number | null;
}

export interface DiscordRole {
    id: string;
    name: string;
    color: number;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    hoist: boolean;
    icon: string | null;
    unicode_emoji: string | null;
    flags: number;
}

export interface DiscordChannel {
    id: string;
    name?: string;
    type: number;
    guild_id?: string;
    position?: number;
    permission_overwrites?: {
        id: string;
        type: number;
        allow: string;
        deny: string;
    }[];
    nsfw?: boolean;
    permissions?: string;
}