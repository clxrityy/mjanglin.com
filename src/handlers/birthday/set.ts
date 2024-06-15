import { db } from "@/lib/db";
import { InteractionOption } from "@/types/interactions";
import { EmbedType } from "@/types/general";
import EMBEDS from "./constants";

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
                description: `\`\`\`\n${e.message}\`\`\``,
            }
        }
    }

    return embed;
}