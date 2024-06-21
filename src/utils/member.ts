import { db } from "@/lib/db";

export async function checkMember(id: string, guildId: string): Promise<boolean | void> {
    let member: any = await db.member.findFirst({
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
        }
    });

    if (!guild) {
        return false;
    }

    if (!member) {

        const user = await db.user.findFirst({
            where: {
                userId: id
            },
            cacheStrategy: {
                ttl: 60,
                swr: 60
            }
        });

        try {
           member = await db.member.create({
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
                }
            });
        } catch (e: any) {
            console.error(e);
            return false;
        }

        if (user) {
            const userWithMembers = await db.user.findFirst({
                where: {
                    userId: id
                },
                include: {
                    members: true
                }
            });

            if (!userWithMembers?.members.includes(member!)) {
                await db.user.update({
                    where: {
                        userId: id
                    },
                    data: {
                        members: {
                            set: [
                                ...userWithMembers!.members,
                               member
                            ]
                        }
                    }
                });
            }
        }
    } else {
        if (!member.guilds.find((g: any) => g.guildId === guildId)) {
            await db.member.update({
                where: {
                    id: member.id
                },
                data: {
                    guilds: {
                        connect: {
                            guildId: guildId
                        }
                    }
                }
            });
        }
    }
}