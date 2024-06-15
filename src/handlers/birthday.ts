import { db } from "@/lib/db";
import { InteractionOption } from "@/types/interactions";
import { DiscordUser, EmbedType } from "@/types/general";
import { Colors } from "@/types/constants";
import { userMention } from "@/utils/misc";

const EMBEDS = {
    noSubcommand: {
        description: "Please provide a subcommand",
        color: Colors.RED,
    } as EmbedType,
    birthdayAlreadySet: {
        title: "You've already set your birthday!",
        color: Colors.ORANGE
    } as EmbedType,
    birthdaySet: {
        title: "Birthday set!",
        color: Colors.GREEN
    } as EmbedType,
    noBirthdayFound: {
        description: "No birthday found",
        color: Colors.YELLOW
    } as EmbedType,
    error: {
        title: "An error occurred",
        color: Colors.RED
    } as EmbedType,
}

export async function birthdaySet(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    if (options.length === 0) {
        embed = EMBEDS.noSubcommand;
    }

    const month = options.find((option) => option.name === "month")?.value as number;
    const day = options.find((option) => option.name === "day")?.value as number;

    if (month && day) {
        try {
            const existingBirthday = await db.birthday.findUnique({
                where: {
                    userId: userId,
                    guildId: guildId
                },
                cacheStrategy: {
                    ttl: 60,
                    swr: 60,
                }
            });

            if (existingBirthday) {
                embed = {
                    ...EMBEDS.birthdayAlreadySet,
                    description: `Your birthday is already set to \`${existingBirthday.month}/${existingBirthday.day}\``,
                    footer: {
                        text: "Only admins can change your birthday."
                    }
                }
            } else {
                await db.birthday.create({
                    data: {
                        userId,
                        guildId,
                        month,
                        day
                    }
                });

                embed = {
                    ...EMBEDS.birthdaySet,
                    description: `Your birthday is set to \`${month}/${day}\`!`
                }
            }
        } catch (e: any) {
            console.error(e);
            embed = {
                ...EMBEDS.error,
                description: `\`\`\`\`\n${e.message}\`\`\``,
            }
        }
    }

    return embed;
}

export async function birthdayView(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    if (options.length === 0) { 
        try {
            const birthday = await db.birthday.findUnique({
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
                embed = {
                    description: `Your birthday is set to \`${birthday.month}/${birthday.day}\``,
                    color: Colors.WHITE
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
                description: `\`\`\`\`\n${e.message}\`\`\``,
            }
        }
    } else {
        const targetUser = options.find((option) => option.name === "user")?.value as DiscordUser;

        if (!targetUser) {
            embed = EMBEDS.error;
        }

        try {
            const birthday = await db.birthday.findUnique({
                where: {
                    userId: targetUser.id,
                    guildId: guildId
                },
                cacheStrategy: {
                    ttl: 60,
                    swr: 60,
                }
            });

            if (birthday) {
                embed = {
                    description: `${userMention(targetUser.id)}'s birthday is set to \`${birthday.month}/${birthday.day}\``,
                    color: Colors.WHITE
                }
            } else {
                embed = {
                    ...EMBEDS.noBirthdayFound,
                    description: `${userMention(targetUser.id)} hasn't set their birthday.`,
                }
            }

        } catch (e: any) {
            console.error(e);
            embed = {
                ...EMBEDS.error,
                description: `\`\`\`\`\n${e.message}\`\`\``,
            }
        }
    }

    return embed;
}