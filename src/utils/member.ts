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
            ttl: 30,
            swr: 30
        }
    });

    const guild = await db.guild.findFirst({
        where: {
            guildId: guildId
        },
        cacheStrategy: {
            ttl: 30,
            swr: 30
        }
    });

    if (!guild) {
        try {
            await db.guild.create({
                data: {
                    guildId: guildId,
                    userId: id
                },
            });
        } catch (e) {
            console.error(`Error creating guild: ${e}`);
        }
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
            console.error(`Error creating member: ${e}`);
        }
        
    } else {

        const user = await db.user.findFirst({
            where: {
                userId: id
            },
            cacheStrategy: {
                ttl: 30,
                swr: 30
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
                console.error(`Error updating member: ${e}`);
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
                console.error(`Error updating member: ${e}`);
            }
        }

        
    }
}