import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";

export default async function friendRemove(userId: string, guildId: string, options: InteractionOption[]): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    let user: string = "";

    if (options && options.find((option) => option.name === "user")) {
        user = options.find((option) => option.name === "user")?.value as string;

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
            const isFriend = await db.member.findFirst({
                where: {
                    id: userData.id,
                    userId: userId,
                    friends: {
                        has: user
                    },
                },
                cacheStrategy: {
                    ttl: 60,
                    swr: 60
                }
            });

            const isAlsoFriend = await db.member.findFirst({
                where: {
                    userId: user,
                    friends: {
                        has: userId
                    },
                    guilds: {
                        some: {
                            guildId: guildId
                        }
                    }
                }
            })

            if (isFriend && isAlsoFriend) {

                try {
                    await db.member.update({
                        where: {
                            id: userData.id,
                            userId: userId
                        },
                        data: {
                            friends: {
                                set: isFriend.friends.filter((friend) => friend !== user)
                            }
                        },
                    });
    
                    await db.member.update({
                        where: {
                            id: isAlsoFriend.id,
                            userId: user
                        },
                        data: {
                            friends: {
                                set: isAlsoFriend.friends.filter((friend) => friend !== userId)
                            }
                        },
                    });
    
                    embed = {
                        description: `You have removed <@${user}> from your friends list!`,
                        color: Colors.GREEN
                    };
                } catch (e: any) {
                    embed = {
                        description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\n\`\`\``,
                        ...EMBEDS.error
                    }
                }

            } else {
                embed = {
                    description: `You are not friends with <@${user}>!`,
                    color:  Colors.GREY
                }
            }
        }
    }

    return embed;
}