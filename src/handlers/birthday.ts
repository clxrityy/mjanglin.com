import { db } from "@/lib/db";
import { APPLICATION_COMMAND_OPTION_TYPES, Colors, EmbedType } from "@/utils/types";
import { APIApplicationCommandInteractionDataOption, APIChatInputApplicationCommandInteractionData, ApplicationCommandOptionType } from "discord-api-types/v10";

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

export default async function birthdaySet(options: APIApplicationCommandInteractionDataOption[], userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    switch (options[0].name) {
        case "set":

            const month = options.find((option) => option.name === "month") as APIApplicationCommandInteractionDataOption & {
                value: number;
            };

            const day = options.find((option) => option.name === "day") as APIApplicationCommandInteractionDataOption & {
                value: number;
            }
            
            if (month.type === ApplicationCommandOptionType.Integer && day.type === ApplicationCommandOptionType.Integer) {
                
                try {
                    const existingBirthday = await db.birthday.findUnique({
                        where: {
                            userId: userId
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
                                month: month.value,
                                day: day.value
                            }
                        });

                        embed = {
                            ...EMBEDS.birthdaySet,
                            description: `Your birthday is set to \`${month.value}/${day.value}\`!`
                        }
                    }

                } catch (e: any) {
                    console.error(e);
                    embed = EMBEDS.error;
                }
            }
            
    }

    return embed;
}