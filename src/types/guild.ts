export type Guild = {
    id: string
    name: string
    icon: string | null
    owner_id: string
}

export type GuildSettings = {
    changeable?: boolean;
    guildId: string;
    userId: string;
}

export type GuildRole = {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string;
    unicode_emoji?: string;
    position: number;
    permissions: string;
}

export type GuildMember = {
    user?: {
        id: string;
        username: string;
        discriminator: string;
        avatar: string | null;
        bot?: boolean;
        system?: boolean;
        mfa_enabled?: boolean;
        locale: string;
        verified?: boolean;
        email: string | null;
        flags?: number;
    };
    nick: string | null;
    roles: string[];
    joined_at: string;
    premium_since: string | null;
    deaf: boolean;
    mute: boolean;
    pending: boolean;
    permissions: string;
}