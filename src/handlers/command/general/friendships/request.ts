import { EMBEDS } from "@/data/util/resources/embeds";
import { db } from "@/lib/db";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionOption } from "@/types/interactions";

export default async function friendRequest(userId: string, guildId: string, options: InteractionOption[]): Promise<EmbedType> {
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
        })

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
                    color: Colors.RED
                }
            } else {

                const isAlreadyRequested = await db.member.findFirst({
                    where: {
                        userId: user,
                        friendRequests: {
                            has: userId
                        }
                    },
                    cacheStrategy: {
                        ttl: 60,
                        swr: 60
                    }
                });

                if (isAlreadyRequested) {
                    embed = {
                        description: `You have already sent a friend request to <@${user}>!`,
                        color: Colors.ORANGE
                    }
                } else {
                    try {
                        await db.member.update({
                            where: {
                                id: requestUserData?.id
                            },
                            data: {
                                friendRequests: {
                                    push: userId
                                }
                            }
                        });
                        embed = {
                            description: `You have sent a friend request to <@${user}>!`,
                            color: Colors.GREEN
                        }

                    } catch (e: any) {
                        embed = {
                            ...EMBEDS.error,
                            description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\`\`\``,
                        }
                    }
                }
            }
        } else {
            try {
                await db.member.create({
                    data: {
                        userId: userId,
                        guilds: {
                            connect: {
                                guildId: guildId
                            }
                        }
                    }
                });

                await db.member.update({
                    where: {
                        id: requestUserData?.id,
                        userId: user,
                    },
                    data: {
                        friendRequests: {
                            push: userId
                        }
                    }
                });

                embed = {
                    description: `You have sent a friend request to <@${user}>!`,
                    color: Colors.GREEN
                }

            } catch (e: any) {
                embed = {
                    ...EMBEDS.error,
                    description: `\`\`\`json\n${JSON.stringify(e.message, null, 2)}\`\`\``,
                }
            }
        }
    } else {
        embed = {
            description: "Please specify a user to send a friend request to!",
            color: Colors.RED
        }
    }
    
    return embed;
}

