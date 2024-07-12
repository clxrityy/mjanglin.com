import {
    fetchGuild,
    getGuildAvatar,
    getGuildMembers,
    // getGuildRoles
} from "@/data/util/functions/guild";
// import { fetchUser } from "@/data/util/functions/user";
import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { GuildSettings } from "@/types/guild";

export default async function viewConfigHandler(userId: string, guildId: string): Promise<EmbedType> {
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

    let guild = await fetchGuild(guildId);
    // let guildRoles = await getGuildRoles(guildId);
    let members = await getGuildMembers(guildId);
    let member = members.find(m => m.user!.id === userId);

    if (existingGuild) {
        if (guild.owner_id === userId) {
            if (existingGuild.userId !== userId) {
                await db.guild.update({
                    where: {
                        guildId: guildId,
                    },
                    data: {
                        user: {
                            connect: {
                                userId: userId
                            }
                        }
                    },
                });

                const settings: GuildSettings = {
                    guildId: existingGuild.guildId,
                    userId: userId,
                    changeable: existingGuild.changeable
                };

                embed = {
                    title: "Config",
                    description: `\n\nChangeable birthdays: ${settings.changeable ? "`true`" : "`false`"}`,
                    color: Colors.GREEN,
                    footer: {
                        text: "/config set"
                    }
                }
            } else if (existingGuild.userId === userId) { 
                const settings: GuildSettings = {
                    guildId: existingGuild.guildId,
                    userId: existingGuild.userId,
                    changeable: existingGuild.changeable
                };
                const guild = await fetchGuild(guildId);
        
                const avatar = await getGuildAvatar(guild);
        
                embed = {
                    thumbnail: {
                        url: avatar
                    },
                    description: `**${guild.name}**\n\nOwner: <@${guild.owner_id}>\n\n\nChangeable birthdays: ${settings.changeable ? "`true`" : "`false`"}`,
                    color: Colors.LIGHT_GREY,
                    footer: {
                        text: "/config set"
                    }
                }
            } 
        } else {
            if (member?.roles.some(role => role === existingGuild.adminRoleId)) {
                const settings: GuildSettings = {
                    guildId: existingGuild.guildId,
                    userId: existingGuild.userId,
                    changeable: existingGuild.changeable
                };
                const guild = await fetchGuild(guildId);
        
                const avatar = await getGuildAvatar(guild);
        
                embed = {
                    thumbnail: {
                        url: avatar
                    },
                    description: `**${guild.name}**\n\nOwner: <@${guild.owner_id}>\n\n\n**Changeable birthdays**: ${settings.changeable ? "`true`" : "`false`"}\n**Admin role**: <@&${existingGuild.adminRoleId}>`,
                    color: Colors.LIGHT_GREY,
                    footer: {
                        text: "/config set"
                    }
                }
            } else {
                embed = {
                    title: "Config",
                    description: "You must have the admin role to view this configuration",
                    color: Colors.RED
                }
            }
            
        }
    } else {
        if (guild.owner_id === userId) { 

            try {
                await db.guild.create({
                    data: {
                        guildId: guild.id,
                        user: {
                            connect: {
                                userId: userId
                            }
                        }
                    },
                });

                embed = {
                    title: "Config",
                    description: "You may now view and alter configurations for this server",
                    color: Colors.GREEN,
                    footer: {
                        text: "/config set"
                    }
                }
            } catch (e: any) {
                console.error(e);
                embed = {
                    title: "Config",
                    description: "Failed to create config",
                    color: Colors.RED
                }
            }
        } else {
            embed = {
                title: "Config",
                description: "You are not the owner of this server",
                color: Colors.RED
            }
        }
    }


    return embed;
}