import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { InteractionOption } from "@/types/interactions";
import { userMention } from "@/utils/misc";
import { DiscordUser, EmbedType } from "@/types/general";
import EMBEDS from "./constants";

export default async function birthdayView(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    if (options.length <= 0) { 

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
                description: `\`\`\`\n${e.message}\`\`\``,
            }
        }
    }

    return embed;
}