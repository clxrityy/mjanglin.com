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

export interface DiscordUser {
    id: string;
    username: string;
    avatar: string | null;
    accent_color: number | null;
}