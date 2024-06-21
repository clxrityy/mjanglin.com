import { userMention } from "@/data/util/functions/misc";
import { mutualBirthday } from "@/data/util/functions/mutualBday";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";
import { EMBEDS } from "../../../../data/util/resources/embeds";

export default async function birthdayView(options: InteractionOption[], userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    let birthday;
    let targetUser;

    if (options && options.find((option) => option.name === "user")) {
        targetUser = options.find((option) => option.name === "user")?.value as string;

        console.log(targetUser); //

        try {

            birthday = await db.birthday.findFirst({
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
    } else {
        try {
            birthday = await db.birthday.findFirst({
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

                const mutual = await mutualBirthday({
                    month: birthday.month,
                    day: birthday.day,
                    userId: userId,
                    guildId: guildId
                });

                if (mutual) {
                    embed = {
                        description: `Your birthday is set to \`${birthday.month}/${birthday.day}\`\n\n🎉 You share a birthday with ${userMention(mutual)}`,
                        color: Colors.WHITE
                    }
                } else {
                    embed = {
                        description: `Your birthday is set to \`${birthday.month}/${birthday.day}\``,
                        color: Colors.WHITE
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