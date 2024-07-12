import { fetchGuild, getGuildAvatar, getGuildMembers } from "@/data/util/functions/guild";
import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";

export default async function changeableConfigHandler(optionValue: boolean, userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    const existingGuild = await db.guild.findUnique({
        where: {
            guildId: guildId
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60,
        },
    });

    let guild = await fetchGuild(guildId);

    const members = await getGuildMembers(guildId);

    console.log(members) // debug

    const member = members.find(m => m.user?.id === userId);

    console.log(member) // debug

    if (existingGuild) {

        if (guild.owner_id === userId) {
            try {
                await db.guild.update({
                    where: {
                        guildId: guildId
                    },
                    data: {
                        changeable: optionValue
                    }
                });

                embed = {
                    color: Colors.GREEN,
                    description: `Configuration updated!\n\n**Changeable birthdays:** ${optionValue ? "`true`" : "`false`"}`,
                    footer: {
                        text: "/config view"
                    },
                    thumbnail: {
                        url: await getGuildAvatar(guild)
                    }
                }
            } catch (e: any) {
                console.error(e);
                embed = {
                    ...EMBEDS.error,
                    description: `\`\`\`\n${e.message}\`\`\``,
                }
            }
        } else {
            if (!existingGuild.adminRoleId) {
                embed = {
                    color: Colors.RED,
                    description: "You must be the owner of the server to change this configuration.",
                }
            } else {

                if (!member) {
                    embed = EMBEDS.error;
                }

                const memberRoles = member?.roles.map(r => r);

                if (memberRoles?.includes(existingGuild.adminRoleId) || member?.permissions.includes("ADMINISTRATOR")) {
                    try {
                        await db.guild.update({
                            where: {
                                guildId: guildId
                            },
                            data: {
                                changeable: optionValue
                            }
                        });

                        embed = {
                            color: Colors.GREEN,
                            description: `Configuration updated!\n\n**Changeable birthdays:** ${optionValue ? "`true`" : "`false`"}`,
                            footer: {
                                text: "/config view"
                            },
                            thumbnail: {
                                url: await getGuildAvatar(guild)
                            }
                        }
                    } catch (e: any) {
                        console.error(e);
                        embed = {
                            ...EMBEDS.error,
                            description: `\`\`\`\n${e.message}\`\`\``,
                        }
                    }
                } else {
                    embed = {
                        color: Colors.RED,
                        description: "You must have the admin role to change this configuration.",
                    }
                }
            }
        }
    } else {

        if (guild.owner_id === userId) {
            try {
                await db.guild.create({
                    data: {
                        guildId: guildId,
                        changeable: optionValue,
                        user: {
                            connect: {
                                userId: userId
                            }
                        }
                    }
                })

            } catch (e: any) {
                console.error(e);
                embed = {
                    ...EMBEDS.error,
                    description: `\`\`\`\n${e.message}\`\`\``,
                }
            }
        } else {
            embed = {
                color: Colors.RED,
                description: "You must an administrator of the server to change this configuration.",
            }
        }
    }

    return embed;
}