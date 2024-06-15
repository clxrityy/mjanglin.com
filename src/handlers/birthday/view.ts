import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { InteractionOption } from "@/types/interactions";
import { userMention } from "@/utils/misc";
import { DiscordUser, EmbedType } from "@/types/general";
import EMBEDS from "./constants";

export default async function birthdayView(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    let birthday;

    if (options.length <= 0) { 

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
        const targetUser: any = JSON.parse(JSON.stringify(options.find((option) => option.name === "user")?.value));

        if (!targetUser) {
            embed = EMBEDS.error;
        }

        console.log(targetUser); //

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
                embed = {
                    description: `${userMention(targetUser)}'s birthday is set to \`${birthday.month}/${birthday.day}\``,
                    color: Colors.WHITE
                }
            } else {
                embed = {
                    ...EMBEDS.noBirthdayFound,
                    description: `${userMention(targetUser)} hasn't set their birthday.`,
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