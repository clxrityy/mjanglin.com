import { CONFIG } from "@/config";
import { giveBirthdayRole } from "@/data/util/functions/birthdayRole";
import { getGuildMember } from "@/data/util/functions/guild";
import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";

export default async function hbdHandler(userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    let message: string;

    const member = await getGuildMember(guildId, userId);
    
    const birthdays = await db.birthday.findMany({
        where: {
            guildId: guildId,
            day: new Date().getDate(),
            month: new Date().getMonth() + 1
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60,
        },
    });

    let birthdayUsers = birthdays.map(b => b.userId);

    const existingGuild = await db.guild.findFirst({
        where: {
            guildId: guildId
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60,
        }
    });

    if (existingGuild?.birthdayMessage) {
        message = existingGuild.birthdayMessage;
    } else {
        message = CONFIG.DEFAULTS.HBD_MESSAGE;
    }

    const birthdayMessageFunc = () => {
        let response: string[] = [];
        birthdayUsers.forEach((user) => {
            response.push(message.replace("{user}", `<@${user}>`))
        });

        return response;
    }

    const bdayMsg = birthdayMessageFunc().join("\n");

    if (existingGuild && existingGuild.userId === userId) {

        if (existingGuild.birthdayRoleId) {
            
            if (birthdayUsers.length > 0) {
                try {
                    birthdayUsers.forEach(async (user) => {
                        await giveBirthdayRole(guildId, user, existingGuild.birthdayRoleId!);
                    });
    
                    embed = {
                        color: Colors.GOLD,
                        description: bdayMsg,
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
                    description: "No birthdays today.",
                }
            }
        } else {
            embed = {
                color: Colors.RED,
                description: "Birthday role not set.",
            }
        }
    } else {
        if (existingGuild?.adminRoleId && member?.roles.find((role) => role === existingGuild.adminRoleId)) {
            if (birthdayUsers.length > 0) {
                try {
                    birthdayUsers.forEach(async (user) => {
                        await giveBirthdayRole(guildId, user, existingGuild.birthdayRoleId!);
                    });
    
                    embed = {
                        color: Colors.GOLD,
                        description: bdayMsg,
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
                    description: "No birthdays today.",
                }
            }
        } else {
            embed = {
                color: Colors.RED,
                description: "You must have the admin role to give birthday roles.",
            }
        }
    }
    
    return embed;
}