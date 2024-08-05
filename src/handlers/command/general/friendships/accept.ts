import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";

export default async function friendAccept(userId: string, guildId: string, options: InteractionOption[]): Promise<EmbedType> {
    let embed: EmbedType = EMBEDS.error;
    let user;

    if (options && options.find((option) => option.name === "user")) {
        user = options.find((option) => option.name === "user")?.value as string;

        const requestUserData = await db.member.findFirst({
            where: {
                userId: user,
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
            const isAlreadyFriend = await db.member.findFirst({
                where: {
                    userId: userId,
                    friends: {
                        has: user
                    }
                },
                cacheStrategy: {
                    ttl: 60,
                    swr: 60
                }
            });

            if (isAlreadyFriend) {
                embed = {
                    description: `You are already friends with <@${user}>!`,
                    color: Colors.YELLOW
                };
            } else {
                if (requestUserData) {
                    await db.member.update({
                        where: {
                            id: requestUserData.id,
                            userId: userId
                        },
                        data: {
                            friends: {
                                push: user
                            }
                        }
                    });

                    await db.member.update({
                        where: {
                            id: userData.id,
                            userId: user
                        },
                        data: {
                            friends: {
                                push: userId
                            }
                        }
                    });

                    embed = {
                        description: `You are now friends with <@${user}>!`,
                        color: Colors.GREEN
                    };
                } else {
                    embed = {
                        description: `User <@${user}> does not exist in this server!`,
                        color: Colors.DARK_GREY
                    };
                }
            }
        }
    }

    return embed;
}