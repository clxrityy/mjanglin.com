import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";

export default async function friendList(userId: string, guildId: string): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;

    const userData = await db.member.findFirst({
        where: {
            userId: userId,
            guilds: {
                some: {
                    guildId: guildId
                }
            }
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60
        }
    });

    if (userData) {
        const friends = await db.member.findFirst({
            where: {
                id: userData.id,
                userId: userId
            },
            select: {
                friends: true
            },
            cacheStrategy: {
                ttl: 60,
                swr: 60
            }
        });

        if (friends) {
            const friendList = friends.friends.map((friend) => `<@${friend}>`).join("\n");

            embed = {
                title: `Your friends list`,
                description: friendList,
                color: Colors.BLUE
            }
        } else {
            embed = {
                title: `You don't have any friends :(`,
                color: Colors.PURPLE,
                footer: {
                    text: "/friend request"
                }
            }
        }
    }

    return embed;
}