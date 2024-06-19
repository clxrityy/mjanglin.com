import { userMention } from "@/data/util/functions/misc";
import { timeLeft } from "@/data/util/functions/timeLeft";
import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";

export default async function birthdayCountdown(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    let birthday;
    let targetUser;

    if (options) {
        if (options.find((option) => option.name === "user")) {
            targetUser = options.find((option) => option.name === "user")?.value as string;
        }
    }

    if (!targetUser) {
        try {
            birthday = await db.birthday.findUnique({
                where: {
                    userId: userId,
                    guildId: guildId
                },
                cacheStrategy: {
                    ttl: 60,
                    swr: 60,
                }
            });

            if (birthday) {
                const remainingDays = timeLeft(birthday.month, birthday.day);

                embed = {
                    description: `There are **${remainingDays}** days until your birthday!`,
                    color: Colors.AQUA
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
        try {
            birthday = await db.birthday.findUnique({
                where: {
                    userId: targetUser,
                    guildId: guildId
                },
                cacheStrategy: {
                    ttl: 60,
                    swr: 60,
                }
            });

            if (birthday) {
                const remainingDays = timeLeft(birthday.month, birthday.day);

                embed = {
                    description: `There are **${remainingDays}** days until ${userMention(targetUser)}'s birthday!`,
                    color: Colors.AQUA
                }

            } else {
                embed = {
                    ...EMBEDS.noBirthdayFound,
                    description: `${userMention(targetUser)} has not set their birthday yet!`,
                }
            }
            
        } catch (e: any) {
            console.error(e);
            embed = {
                ...EMBEDS.error,
                description: `\`\`\`\n${e.message}\`\`\``,
            }
        }
    }


    return embed;
}