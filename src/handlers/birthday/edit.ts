import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";
import { EMBEDS } from "./resources";
import { db } from "@/lib/db";

export default async function birthdayEdit(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
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
                await db.birthday.update({
                    where: {
                        userId: userId,
                        guildId: guildId
                    },
                    data: {
                        month,
                        day
                    }
                });

                embed = {
                    ...EMBEDS.birthdaySet,
                    description: `Your birthday has been edited to \`${month}/${day}\`!`,
                    footer: {
                        text: "This cannot be undone!"
                    }
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