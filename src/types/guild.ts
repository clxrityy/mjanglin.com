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