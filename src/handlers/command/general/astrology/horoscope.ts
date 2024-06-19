import { AI } from "@/data/util/classes/ai";
import { fetchUser } from "@/data/util/functions/user";
import { COOLDOWNS } from "@/data/util/resources/cooldowns";
import { EMBEDS } from "@/data/util/resources/embeds";
import { getZodiacSign } from "@/data/util/resources/signs";
import { db } from "@/lib/db";
import openai from "@/lib/openai";
import { EmbedType } from "@/types/general";

export default async function astrologyHoroscopeHandler(userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    const cooldown = COOLDOWNS.horoscope;

    const ai = new AI(openai);

    const birthdayData = await db.birthday.findUnique({
        where: {
            userId: userId,
            guildId: guildId
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60
        }
    });

    const user = await fetchUser(userId);
    let date = new Date();

    if (birthdayData?.day && birthdayData?.month) {

        const sign = getZodiacSign(birthdayData.day, birthdayData.month);

        try {
            const timeLeft = await cooldown.checkCooldown(userId, guildId, "horoscope");
    
            if (timeLeft === 0) {
                await cooldown.setCooldown(userId, guildId);
    
                const horoscope = await ai.horoscopeQuery({
                    username: user.username,
                    zodiacSign: sign.name,
                    date: date,
                    birthday: {
                        day: birthdayData.day,
                        month: birthdayData.month
                    }
                });

                if (horoscope) {
                    console.log(horoscope)

                    embed = {
                        color: sign.color,
                        title: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                        description: horoscope,
                    }
                } else {
                    embed = {
                        ...EMBEDS.error,
                        description: "An error occured while generating the horoscope"
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
                ...EMBEDS.error,
                description: `An error occured while generating the horoscope\n\`\`\`json\n${JSON.stringify(e, null, 2)}\`\`\``
            }
        }
    } else {
        embed = {
            ...EMBEDS.noBirthdayFound,
            description: "You have not set your birthday yet",
            footer: {
                text: "/birthday set"
            }
        }
    }

    return embed;
}