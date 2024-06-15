import { db } from "@/lib/db";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";
import { EMBEDS } from "../../data/resources/embeds";

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
                        text: "/birthday edit to change it only one time!"
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