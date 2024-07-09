import { getGuildMembers } from "@/data/util/functions/guild";
import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";

export default async function embedHandler(userId: string, guildId: string, options: InteractionOption[]): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    const color = options.find((option) => option.name === "color")?.value as number;
    const title = options.find((option) => option.name === "title")?.value as string;
    const description = options.find((option) => option.name === "description")?.value as string;
    const url = options.find((option) => option.name === "url")?.value as string;
    const image = options.find((option) => option.name === "image")?.value as string;
    const thumbnail = options.find((option) => option.name === "thumbnail")?.value as string;
    const footer = options.find((option) => option.name === "footer")?.value as string;
    const footerIcon = options.find((option) => option.name === "footer_icon")?.value as string;
    const author = options.find((option) => option.name === "author")?.value as string;
    const authorIcon = options.find((option) => option.name === "author_icon")?.value as string;
    const authorUrl = options.find((option) => option.name === "author_url")?.value as string;

    let guildMembers = await getGuildMembers(guildId);
    let member = guildMembers.find(m => m.user!.id === userId);

    const guild = await db.guild.findFirst({
        where: {
            guildId: guildId
        }
    });

    console.log(member?.roles); // debug

    if (guild && guild.adminRoleId) {
        if (member?.roles.find(({ id }) => id === guild.adminRoleId)) {
            embed = {
                color: color || Colors.DEFAULT,
                title: title && title,
                description: description && description,
                url: url && url,
                image: {
                    url: image && image
                },
                thumbnail: {
                    url: thumbnail && thumbnail
                },
                author: {
                    name: author && author,
                    icon_url: authorIcon && authorIcon,
                    url: authorUrl && authorUrl
                },
                footer: {
                    text: footer && footer,
                    icon_url: footerIcon && footerIcon
                },
            }
        }
        embed = {
            ...EMBEDS.error,
            description: "You do not have the required role to use this command.",
        }
    } else {
        if (guild && guild.userId) {
            if (guild.userId === userId) {
                embed = {
                    color: color || Colors.DEFAULT,
                    title: title && title,
                    description: description && description,
                    url: url && url,
                    image: {
                        url: image && image
                    },
                    thumbnail: {
                        url: thumbnail && thumbnail
                    },
                    author: {
                        name: author && author,
                        icon_url: authorIcon && authorIcon,
                        url: authorUrl && authorUrl
                    },
                    footer: {
                        text: footer && footer,
                        icon_url: footerIcon && footerIcon
                    },
                }

            } else {
                embed = {
                    ...EMBEDS.error,
                    description: "You do not have the required role to use this command.",
                }
            }
        }
    }

    return embed;
}