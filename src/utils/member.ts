import { db } from "@/lib/db";

export async function checkMember(id: string, guildId: string): Promise<boolean | void> {
    const member = await db.member.findFirst({
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
            }
        });

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
                }
            });
        } catch (e: any) {
            console.error(e);
            return false;
        }

        if (user) {
            await db.user.update({
                where: {
                    userId: id
                
                },
                data: {
                    members: {
                        connect: {
                            id
                        }
                    }
                }
            })
        }
    }
}