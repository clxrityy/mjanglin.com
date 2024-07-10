import { getGuildMembers } from "@/data/util/functions/guild";
import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";

export default async function birthdayMessageConfigHandler(message: string, userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    const existingGuild = await db.guild.findUnique({
        where: {
            guildId: guildId
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60,
        },
        include: {
            user: true
        }
    });

    const member = (await getGuildMembers(guildId)).find(m => m.user?.id === userId);
    
    if (existingGuild) {
        if (existingGuild.userId === userId) {
            try {
                await db.guild.update({
                    where: {
                        guildId: guildId
                    },
                    data: {
                        birthdayMessage: message
                    }
                });

                embed = {
                    color: Colors.GREEN,
                    description: `Configuration updated!\n\n**Birthday message:** ${message}`,
                    footer: {
                        text: "/config view"
                    }
                }

            } catch (e: any) {
                console.error(e);
                embed = {
                    ...EMBEDS.error,
                    description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\`\`\``,
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
                                    birthdayMessage: message
                                }
                            });

                            embed = {
                                color: Colors.GREEN,
                                description: `Configuration updated!\n\n**Birthday message:** ${message}`,
                                footer: {
                                    text: "/config view"
                                }
                            }

                        } catch (e: any) {
                            console.error(e);
                            embed = {
                                ...EMBEDS.error,
                                description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\`\`\``,
                            }
                        }
                    } else {
                        embed = {
                            color: Colors.RED,
                            description: `You must have the admin role to change this configuration. (<@&${existingGuild.adminRoleId}>)`,
                        }
                    }
                }
            }
        }
    } else {
        embed = {
            color: Colors.RED,
            description: "An error occurred while fetching the server's configuration.",
        }
    }

    return embed;
}