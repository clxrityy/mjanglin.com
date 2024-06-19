import { db } from "@/lib/db";

export class Cooldown {
    commandName: string;
    timeout: number;
    activeTimeouts: {
        [commandName: string]: {
            [userId: string]: {
                userId: string;
                timeLeft: string
            }
        }
    }

    constructor(commandName: string, timeout: number) {
        this.commandName = commandName;
        this.timeout = timeout;
        this.activeTimeouts = {};
    }

    private async addCooldownData(userId: string, guildId: string) {
        const existingCooldown = await db.cooldown.findFirst({
            where: {
                guildId: guildId,
                userId: userId,
                command: this.commandName
            },
            cacheStrategy: {
                ttl: 60,
                swr: 60
            }
        });

        if (existingCooldown) {
            await db.cooldown.update({
                where: {
                    id: existingCooldown.id
                },
                data: {
                    expiresAt: new Date(Date.now() + this.timeout).toISOString()
                }
            });
        } else {
            await db.cooldown.create({
                data: {
                    guildId: guildId,
                    userId: userId,
                    command: this.commandName,
                    expiresAt: new Date(Date.now() + this.timeout).toISOString()
                }
            });
        }
    }



    async setCooldown(userId: string, guildId: string) {

        await this.addCooldownData(userId, guildId);

        if (!this.activeTimeouts[this.commandName]) {
            this.activeTimeouts[this.commandName] = {};
        }

        this.activeTimeouts[this.commandName][userId] = {
            userId,
            timeLeft: new Date(Date.now() + this.timeout).toISOString()
        }
    }

    public async checkCooldown(userId: string, guildId: string, command: string) {
        const existingCooldown = await db.cooldown.findFirst({
            where: {
                guildId: guildId,
                userId: userId,
                command: command
            },
            cacheStrategy: {
                ttl: 60,
                swr: 60
            }
        });

        if (existingCooldown) {
            const expiresAt = new Date(existingCooldown.expiresAt).getTime();

            if (expiresAt > Date.now()) {
                return expiresAt - Date.now();
            }
        }

        return 0
    }

    isOnCooldown(userId: string): boolean {
        if (!this.activeTimeouts[this.commandName]) {
            return false;
        }

        if (!this.activeTimeouts[this.commandName][userId]) {
            return false;
        }

        const timeLeft = new Date(this.activeTimeouts[this.commandName][userId].timeLeft).getTime();

        return timeLeft > Date.now();
    }

    getTimeLeft(userId: string): number {
        if (!this.activeTimeouts[this.commandName]) {
            return 0;
        }

        if (!this.activeTimeouts[this.commandName][userId]) {
            return 0;
        }

        const timeLeft = new Date(this.activeTimeouts[this.commandName][userId].timeLeft).getTime();

        return timeLeft - Date.now();
    }

    removeCooldown(userId: string) {
        if (!this.activeTimeouts[this.commandName]) {
            return;
        }

        if (!this.activeTimeouts[this.commandName][userId]) {
            return;
        }

        delete this.activeTimeouts[this.commandName][userId];
    }

    async removeCooldownData(userId: string, guildId: string) {
        await db.cooldown.deleteMany({
            where: {
                guildId: guildId,
                userId: userId,
                command: this.commandName
            }
        });
    }

}