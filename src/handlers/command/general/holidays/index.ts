import { COOLDOWNS } from '@/data/util/resources/cooldowns';
import { EMBEDS } from '@/data/util/resources/embeds';
import { db } from '@/lib/db';
import holidayApi from '@/lib/holidayApi';
import { Colors } from '@/types/constants';
import { EmbedType } from '@/types/general';
import { InteractionOption } from '@/types/interactions';


export default async function holidays(userId: string, guildId: string, options?: InteractionOption[]) {
    let embed: EmbedType = EMBEDS.error;

    const cooldown = COOLDOWNS.holidays;

    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let birthdays = [];
    let holidays = [];
    let country = "US";

    if (options && options.find((option) => option.name === "country_code")) {
        country = options.find((option) => option.name === "country_code")?.value as string;
    }

    if (options && options.find((option) => option.name === "month")) {
        month = options.find((option) => option.name === "month")?.value as number;
    }
    if (options && options.find((option) => option.name === "day")) {
        day = options.find((option) => option.name === "day")?.value as number;
    }

    try {
        const timeLeft = await cooldown.checkCooldown(userId, guildId, "holidays");

        if (timeLeft <= 0) {
            await cooldown.setCooldown(userId, guildId);

            if (month) {
                if (month && day) {
                    birthdays = await db.birthday.findMany({
                        where: {
                            month: month,
                            day: day,
                            guildId: guildId
                        },
                        cacheStrategy: {
                            ttl: 60,
                            swr: 60,
                        }
                    });
        
                    holidays = await holidayApi({ country: country, year: 2023, month: month, day: day - 1 });

                    holidays = holidays.filter((holiday) => Number(holiday.date.split("-")[1]) == month && Number(holiday.date.split("-")[2]) == day);
                } else {
                    day = new Date().getDate();
                    birthdays = await db.birthday.findMany({
                        where: {
                            month: month,
                            day: day,
                            guildId: guildId
                        },
                        cacheStrategy: {
                            ttl: 60,
                            swr: 60,
                        }
                    });
        
                    holidays = await holidayApi({ country: country, year: 2023, month: month, day: day - 1 });
                    holidays = holidays.filter((holiday) => Number(holiday.date.split("-")[1]) == month && Number(holiday.date.split("-")[2]) == day);
                }
        
                if (holidays.length) {
                    if (birthdays.length) {
                        embed = {
                            color: Colors.WHITE,
                            description: `**${month}/${day}**\n`,
                            fields: [
                                {
                                    name: "Birthdays",
                                    value: birthdays.map((birthday) => `- <@${birthday.userId}> — \`${birthday.month}/${birthday.day}\``).join("\n") || "No birthdays found",
                                    inline: true
                                },
                                {
                                    name: "Holidays",
                                    value: holidays.map((holiday) => `- ${holiday.name} — \`${holiday.date.split("-")[1]}/${holiday.date.split("-")[2]}\``).join("\n") || "No holidays found",
                                    inline: true
                                }
                            ],
                            footer: {
                                text: `Showing holidays for ${country}`
                            }
                        }
                    } else {
                        embed = {
                            color: Colors.WHITE,
                            description: `**${month}/${day}**\n`,
                            fields: [
                                {
                                    name: "Holidays",
                                    value: holidays.map((holiday) => `- ${holiday.name} — \`${holiday.date.split("-")[1]}/${holiday.date.split("-")[2]}\``).join("\n") || "No holidays found",
                                }
                            ],
                            footer: {
                                text: `Showing holidays for ${country}`
                            }
                        }
                    }
                } else {
                    embed = {
                        color: Colors.RED,
                        description: `No holidays found for \`${month}/${day}\``
                    }
                }
            } else {
                month = new Date().getMonth() + 1;
                day = new Date().getDate();
        
                birthdays = await db.birthday.findMany({
                    where: {
                        month: month,
                        day: day,
                        guildId: guildId
                    },
                    cacheStrategy: {
                        ttl: 60,
                        swr: 60,
                    }
                });
        
                holidays = await holidayApi({ country: country, year: 2023, month: month, day: day - 1 });
                holidays = holidays.filter((holiday) => Number(holiday.date.split("-")[1]) == month && Number(holiday.date.split("-")[2]) == day);
        
                if (holidays.length) {
                    if (birthdays.length) {
                        embed = {
                            color: Colors.WHITE,
                            description: `**${month}/${day}**\n`,
                            fields: [
                                {
                                    name: "Birthdays",
                                    value: birthdays.map((birthday) => `- <@${birthday.userId}> — \`${birthday.month}/${birthday.day}\``).join("\n") || "No birthdays found",
                                    inline: true
                                },
                                {
                                    name: "Holidays",
                                    value: holidays.map((holiday) => `- ${holiday.name} — \`${holiday.date.split("-")[1]}/${holiday.date.split("-")[2]}\``).join("\n") || "No holidays found",
                                    inline: true
                                }
                            ],
                            footer: {
                                text: `Showing holidays for ${country}`
                            }
                        }
                    } else {
                        embed = {
                            color: Colors.WHITE,
                            description: `**${month}/${day}**\n`,
                            fields: [
                                {
                                    name: "Holidays",
                                    value: holidays.map((holiday) => `- ${holiday.name} — \`${holiday.date.split("-")[1]}/${holiday.date.split("-")[2]}\``).join("\n") || "No holidays found",
                                }
                            ]
                        }
                    }
                } else {
                    embed = {
                        color: Colors.RED,
                        description: `No holidays found for \`${month}/${day}\``
                    }
                }
            }
        } else {
            embed = {
                ...EMBEDS.cooldown,
                description: `You are on cooldown for this command! Please wait **${Math.round(timeLeft * 0.001)}** more seconds.`
            }
        }
    } catch (e: any) {
        embed = {
            ...EMBEDS.error,
            description: `\`\`\`json\n${JSON.stringify(e, null, 2)}\`\`\``
        }

    }

    return embed;
}