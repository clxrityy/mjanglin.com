import { AI } from "@/data/util/classes/ai";
import { userMention } from "@/data/util/functions/misc";
import { fetchUser } from "@/data/util/functions/user";
import { COOLDOWNS } from "@/data/util/resources/cooldowns";
import { EMBEDS } from "@/data/util/resources/embeds";
import { getZodiacSign } from "@/data/util/resources/signs";
import { db } from "@/lib/db";
import openai from "@/lib/openai";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";

export default async function astrologyCompatibilityHandler(userId: string, guildId: string, options: InteractionOption[]): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    const cooldown = COOLDOWNS.compatibility;

    const ai = new AI(openai);

    const userOneBirthdayData = await db.birthday.findFirst({
        where: {
            userId: userId,
            guildId: guildId
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60
        }
    });

    if (!userOneBirthdayData?.month || !userOneBirthdayData?.day) {
        embed = {
            color: Colors.ORANGE,
            description: `**You have not set your birthday yet!**`,
        }
    } else {
        const userOne = await fetchUser(userId);

        const user2Id = options.find((option) => option.name === "user")?.value as string;

        if (user2Id === userId) {
            embed = {
                color: Colors.RED,
                description: `**You can't check compatibility with yourself!**`,
            }
        }

        if (user2Id) {
            const userOneZodiacSign = getZodiacSign(userOneBirthdayData!.month, userOneBirthdayData!.day);

            try {
                const user2BirthdayData = await db.birthday.findFirst({
                    where: {
                        userId: user2Id,
                        guildId: guildId
                    },
                    cacheStrategy: {
                        ttl: 60,
                        swr: 60
                    }
                });

                const userTwo = await fetchUser(user2Id);

                if (!user2BirthdayData) {
                    embed = {
                        color: Colors.ORANGE,
                        description: `${userMention(user2Id)} has not set their birthday yet!**`,
                    }
                } else {
                    const userTwoZodiacSign = getZodiacSign(user2BirthdayData.month, user2BirthdayData.day);

                    try {
                        const timeLeft = await cooldown.checkCooldown(userId, guildId, "compatibility");

                        if (timeLeft === 0) {
                            await cooldown.setCooldown(userId, guildId);

                            const compatibility = await ai.compatibilityQuery({
                                username1: userOne.username,
                                username2: userTwo.username,
                                zodiacSign1: userOneZodiacSign.name,
                                zodiacSign2: userTwoZodiacSign.name
                            });

                            if (compatibility) {
                                embed = {
                                    color: Colors.GREEN,
                                    title: `${userOne.username} & ${userTwo.username}`,
                                    description: compatibility,
                                }
                            } else {
                                embed = {
                                    ...EMBEDS.error,
                                    description: `**An error occured while generating the compatibility**`
                                }
                            }
                        } else {
                            embed = {
                                ...EMBEDS.cooldown,
                                description: `Please wait ${Math.round(timeLeft * 0.001)} more seconds before using this command`
                            }
                        }
                    } catch (e: any) {
                        embed = {
                            color: Colors.RED,
                            description: `**An error occured:**\n\n\`\`\`json\n${JSON.stringify(e, null, 2)}\`\`\``
                        }
                    }
                }


            } catch (e: any) {

            }
        } else {
            embed = {
                ...EMBEDS.error,
                description: `**Target user not found**`
            }
        }
    }



    return embed;
}