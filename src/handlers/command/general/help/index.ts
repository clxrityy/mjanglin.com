import { EMBEDS } from "@/data/util/resources/embeds";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";
import { commands } from "@/data/commands";
import { Colors } from "@/types/constants";

export default async function helpHandler(userId: string, guildId: string, options?: InteractionOption[]) {
    let embed: EmbedType = EMBEDS.help;
    let command;

    if (options?.length) {
        command = options[0].value;

        switch (command) { 
            case commands.birthday.name:
                embed = {
                    title: "/birthday",
                    color: Colors.GREY,
                    description: `${commands.birthday.description}`,
                    fields: [
                        {
                            name: "set",
                            value: `Set the month and day of your birthday\n\`/birthday set [month] [day]\``
                        },
                        {
                            name: "view",
                            value: `View a user's birthday\n\`/birthday view (user)\``
                        },
                        {
                            name: "countdown",
                            value: `Countdown to a user's birthday\n\`/birthday countdown (user)\``
                        },
                        {
                            name: "wish",
                            value: `Wish a user a happy birthday\n\`/birthday wish send [user]\`\n\`/birthday wish list (year)\``
                        }
                    ]
                };
                break;
            case commands.sign.name:
                embed = {
                    title: "/sign",
                    color: Colors.GREY,
                    description: `${commands.sign.description}`,
                };
                break;
            case commands.ping.name:
                embed = {
                    title: "/ping",
                    color: Colors.GREY,
                    description: `${commands.ping.description}`,
                };
                break;
            case commands.config.name:
                embed = {
                    title: "/config",
                    color: Colors.RED,
                    description: `${commands.config.description}`,
                    fields: [
                        {
                            name: "view",
                            value: `View the bot's configurations\n\`/config view\``
                        },
                        {
                            name: "set",
                            value: `Set the bot's configurations\n\`/config set changeable [true/false]\`\n\`/config set admin_role [role]\``
                        }
                    ],
                    footer: {
                        text: `ADMIN ONLY`
                    }
                };
                break;
            case commands.horoscope.name:
                embed = {
                    title: "/horoscope",
                    color: Colors.GREYPLE,
                    description: `${commands.horoscope.description}`,
                    footer: {
                        text: `12 hour cooldown`
                    }
                }
                break;
            case commands.avatar.name:
                embed = {
                    title: "/avatar",
                    color: Colors.GREY,
                    description: `${commands.avatar.description}`,
                }
                break;
            case commands.compatibility.name:
                embed = {
                    title: "/compatibility",
                    color: Colors.GREY,
                    description: `${commands.compatibility.description}`,
                }
                break;
            default:
                embed = EMBEDS.help;
        }
    } else {
        embed = EMBEDS.help;
    }

    return embed;
}