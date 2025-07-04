import { getGuildMember } from "@/data/util/functions/guild";
import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";

export default async function birthdayChannelConfigHandler(channelId: string, userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    const existingGuild = await db.guild.findUnique({
        where: {
            guildId: guildId
        },
        cacheStrategy: {
            ttl: 30,
            swr: 30,
        },
        include: {
            user: true
        }
    });

    const member = await getGuildMember(guildId, userId);

    if (existingGuild) {
        if (existingGuild.userId === userId) {
            try {
                await db.guild.update({
                    where: {
                        guildId: guildId
                    },
                    data: {
                        birthdayChannelId: channelId
                    }
                });

                embed = {
                    color: Colors.GREEN,
                    description: `Configuration updated!\n\n**Birthday channel:** <#${channelId}>`,
                    footer: {
                        text: "/config view"
                    }
                };
            } catch (error) {
                console.error("Error updating birthday channel:", error);

                embed = {
                    ...EMBEDS.error,
                    description: `\`\`\`json\n${JSON.stringify(error, null, 2)}\`\`\``,
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
                } else {
                    if (member.roles.find((role) => role === existingGuild.adminRoleId)) {
                        try {
                            await db.guild.update({
                                where: {
                                    guildId: guildId
                                },
                                data: {
                                    birthdayChannelId: channelId
                                }
                            });
                            embed = {
                                color: Colors.GREEN,
                                description: `Configuration updated!\n\n**Birthday channel:** <#${channelId}>`,
                                footer: {
                                    text: "/config view"
                                }
                            };
                        } catch (e) {
                            console.error("Error updating birthday channel:", e);

                            embed = {
                                ...EMBEDS.error,
                                description: `\`\`\`json\n${JSON.stringify(e, null, 2)}\`\`\``,
                            }
                        }
                    }
                }
            }
        }
    } else {
        embed = {
            color: Colors.RED,
            description: "An error occurred while trying to update the birthday channel configuration.",
        };
    }

    return embed;
}