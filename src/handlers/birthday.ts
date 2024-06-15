import { db } from "@/lib/db";
import { Colors, EmbedType, InteractionOption } from "@/utils/types";

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

export default async function birthdaySet(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
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
                    userId: userId
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
        } catch (e) {
            console.error(e);
            embed = EMBEDS.error;
        }
    }

    return embed;
}