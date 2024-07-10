import { db } from "@/lib/db";

export async function checkMember(id: string, guildId: string): Promise<boolean | void> {
    let member = await db.member.findFirst({
        where: {
            userId: id,
            guilds: {
                some: {
                    guildId: guildId
                }
            },
        },
        include: {
            guilds: true
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60
        }
    });

    const guild = await db.guild.findFirst({
        where: {
            guildId: guildId
        },
        cacheStrategy: {
            ttl: 60,
            swr: 60
        }
    });

    if (!guild) {
        return false;
    }

    if (!member) {
        try {
            await db.member.create({
                data: {
                    user: {
                        connect: {
                            userId: id
                        }
                    },
                    guilds: {
                        connect: {
                            guildId: guildId
                        }
                    }
                },
            });
        } catch (e: any) {
            console.error(e);
        }
        
    } else {

        const user = await db.user.findFirst({
            where: {
                userId: id
            },
            cacheStrategy: {
                ttl: 60,
                swr: 60
            }
        });

        if (!user) {
            try {
                await db.member.update({
                    where: {
                        id: member.id as string,
                    },
                    data: {
                        guilds: {
                            connect: {
                                guildId: guildId
                            }
                        }
                    }
                })
            } catch (e: any) {
                console.error(e);
            }


        } else {
            try {
                await db.member.update({
                    where: {
                        id: member.id as string,
                    },
                    data: {
                        guilds: {
                            connect: {
                                guildId: guildId
                            }
                        },
                        user: {
                            connect: {
                                userId: id
                            }
                        }
                    },
                })
            } catch (e: any) {
                console.error(e);
            }
        }

        
    }
}