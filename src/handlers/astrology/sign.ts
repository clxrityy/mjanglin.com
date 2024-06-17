import { EMBEDS } from "@/data/resources/embeds";
import { Sign, getZodiacSign } from "@/data/resources/signs";
import { db } from "@/lib/db";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";
import { userMention } from "@/utils/misc";

export default async function astrologySignHandler(userId: string, guildId: string, options?: InteractionOption[]): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    let targetUser;
    let birthday;
    let sign: Sign;

    if (options?.length) {
        targetUser = options.find((option) => option.name === "user")?.value as string;

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
                sign = getZodiacSign(birthday.month, birthday.day);

                embed = {
                    color: sign.color,
                    title: `${sign.symbol} ${sign.name}`,
                    description: `\n\n${userMention(targetUser)}\n\n\`${sign.startDate}\` - \`${sign.endDate}\``,
                }
            } else {
                embed = {
                    ...EMBEDS.noBirthdayFound,
                    description: `${userMention(targetUser)} has not set their birthday yet`,
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
                    userId: userId,
                    guildId: guildId
                },
                cacheStrategy: {
                    ttl: 60,
                    swr: 60,
                }
            });

            if (birthday) {
                sign = getZodiacSign(birthday.month, birthday.day);

                embed = {
                    color: sign.color,
                    title: `${sign.symbol} ${sign.name}`,
                    description: `\n\n\`${sign.startDate}\` - \`${sign.endDate}\``,
                }


            } else {
                embed = {
                    ...EMBEDS.noBirthdayFound,
                    footer: {
                        text: "Set your birthday using `/birthday set`"
                    }
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