import { fetchUser, fetchUserAvatar } from "@/data/util/functions/user";
import { EMBEDS } from "@/data/util/resources/embeds";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";

export default async function avatarHandler(userId: string, guildId: string, options?: InteractionOption[]): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    let targetUser;
    let avatar;
    let color;

    if (options?.length) {
        targetUser = options.find((option) => option.name === "user")?.value as string;

        try {
            avatar = await fetchUserAvatar(targetUser);
            color = await fetchUser(targetUser).then((user) => user?.accent_color);

            embed = {
                color: color || Colors.BLURPLE,
                image: {
                    url: avatar
                }
            }
        } catch (e: any) {
            console.error(e);
            embed = {
                ...EMBEDS.error,
                description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\`\`\``
            }
        }
    } else {
        try {
            avatar = await fetchUserAvatar(userId);
            color = await fetchUser(userId).then((user) => user?.accent_color);

            embed = {
                color: color || Colors.BLURPLE,
                image: {
                    url: avatar
                }
            }
        } catch (e: any) {
            console.error(e);
            embed = {
                ...EMBEDS.error,
                description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\`\`\``
            }
        }
    }

    return embed;
}