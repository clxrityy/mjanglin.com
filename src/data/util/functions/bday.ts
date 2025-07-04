import { db } from "@/lib/db";

export async function mutualBirthday(birthday: { month: number, day: number, userId: string, guildId: string }): Promise<string | null> {
    try {
        const mutual = await db.birthday.findFirst({
            where: {
                month: birthday.month,
                day: birthday.day,
                guildId: birthday.guildId,
                NOT: {
                    userId: birthday.userId
                }
            },
            cacheStrategy: {
                ttl: 60,
                swr: 60,
            }
        });

        if (mutual) {
            return mutual.userId;
        } else {
            return null;
        }

    } catch (e: any) {
        console.error(e);
        return null;
    }
}

export function checkIfBirthdayToday(month: number, day: number): boolean {
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();

    if (currentMonth === month && currentDay === day) {
        return true;
    } else {
        return false;
    }
}

export async function getBirthdaysToday() {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    try {
        const birthdays = await db.birthday.findMany({
            where: {
                month: currentMonth,
                day: currentDay
            },
            cacheStrategy: {
                ttl: 60,
                swr: 60,
            }
        });

        return birthdays;
    } catch (error) {
        console.error("Error fetching today's birthdays:", error);
        return [];
    }
}