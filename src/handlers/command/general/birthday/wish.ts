import { checkIfBirthdayToday } from "@/data/util/functions/bday";
import { userMention } from "@/data/util/functions/misc";
import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";

/**
 * /birthday wish send {...options}
 * @param options 
 * @param userId 
 * @param guildId 
 * @returns {EmbedType}
 */
export async function birthdayWishSend(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    let birthday;
    let targetUser: string;
    let message: string;

    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();

    if (options && options.find((option) => option.name === "user") && options.find((option) => option.name === "message")) {
        targetUser = options.find((option) => option.name === "user")?.value as string;

        if (targetUser === userId) {
            embed = {
                color: Colors.DARK_ORANGE,
                description: "You can't wish yourself a happy birthday!",
                footer: {
                    text: "That's just sad..."
                }
            }
        }

        message = options.find((option) => option.name === "message")?.value as string;

        try {
            birthday = await db.birthday.findFirst({
                where: {
                    userId: targetUser,
                    guildId: guildId
                },
                cacheStrategy: {
                    ttl: 60,
                    swr: 60
                }
            });

            if (birthday) {
                const isBirthdayToday = checkIfBirthdayToday(birthday.month, birthday.day);

                if (!isBirthdayToday) {
                    embed = {
                        color: Colors.RED,
                        description: `**${userMention(targetUser)}'s birthday is not today!**\n\nCurrent date: \`${currentMonth}/${currentDay}\`\n${userMention(targetUser)}'s birthday: \`${birthday.month}/${birthday.day}\``
                    }
                } else {
                    const existingWish = await db.wish.findFirst({
                        where: {
                            userId: userId,
                            targetUserId: targetUser,
                            year: new Date().getFullYear(),
                            guildId: guildId
                        },
                        cacheStrategy: {
                            ttl: 60,
                            swr: 60
                        }
                    });

                    if (existingWish) {
                        embed = {
                            color: Colors.RED,
                            description: `You've already wished ${userMention(targetUser)} a happy birthday!`
                        }
                    } else {
                        try {
                            await db.wish.create({
                                data: {
                                    userId: userId,
                                    targetUserId: targetUser,
                                    message: message,
                                    year: new Date().getFullYear(),
                                    guildId: guildId
                                }
                            });

                            embed = {
                                color: Colors.GREEN,
                                description: `You've successfully wished ${userMention(targetUser)} a happy birthday!`
                            }

                        } catch (e: any) {
                            embed = {
                                title: "Error sending wish",
                                description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\`\`\``,
                                color: Colors.RED
                            }
                        }
                    }
                }
            } else {
                embed = {
                    color: Colors.DARK_ORANGE,
                    description: `${userMention(targetUser)} hasn't set their birthday!`,
                    footer: {
                        text: "/birthday set"
                    }
                }
            }
        } catch (e: any) {
            embed = {
                ...EMBEDS.error,
                description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\`\`\``,
                color: Colors.RED
            }
        }
    } else {
        embed = EMBEDS.error;
    }

    return embed;
}

/**
 * /birthday wish list
 * @param userId 
 * @param guildId 
 * @returns {EmbedType}
 */

export async function birthdayWishList(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    let year;

    if (options && options.find((option) => option?.name === "year")) {
        year = options.find((option) => option.name === "year")?.value as number;
    }

    try {
        const wishes = await db.wish.findMany({
            where: {
                targetUserId: userId,
                year: year && year,
                guildId: guildId
            },
            cacheStrategy: {
                ttl: 60,
                swr: 60
            }
        });

        if (wishes.length > 0) {
            embed = {
                color: Colors.WHITE,
                title: "Your birthday wishes",
                description: wishes.map((wish) => {
                    return `**${userMention(wish.userId)}** - ${wish.message}`;
                }).join("\n")
            }
        } else {
            embed = {
                color: Colors.DARKER_GREY,
                description: "You don't have any birthday wishes yet!",
            }
        }
    } catch (e: any) {
        embed = {
            ...EMBEDS.error,
            description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\`\`\``,
            color: Colors.RED
        }
    }

    return embed;
}