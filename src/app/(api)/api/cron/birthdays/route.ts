import { NextRequest, NextResponse } from "next/server";
import { getBirthdaysToday } from "@/data/util/functions/bday";
import { CONFIG } from "@/config";
import { db } from "@/lib/db";

export const runtime = "edge";

/**
 * Cron job to check for birthdays and send notifications
 * Configure this in vercel.json to run daily
 */
export async function GET(request: NextRequest) {
    try {
        // Verify this is a legitimate cron request (Vercel adds this header)
        const authHeader = request.headers.get("authorization");
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get today's birthdays
        const todaysBirthdays = await getBirthdaysToday();

        if (todaysBirthdays.length === 0) {
            return NextResponse.json({ message: "No birthdays today" });
        }

        // Send birthday messages for each user
        const results = await Promise.allSettled(
            todaysBirthdays.map(async (birthday: any) => {
                return await sendBirthdayMessage(birthday);
            })
        );

        const successful = results.filter((r: any) => r.status === "fulfilled").length;
        const failed = results.filter((r: any) => r.status === "rejected").length;

        return NextResponse.json({
            message: `Processed ${todaysBirthdays.length} birthdays`,
            successful,
            failed
        });
    } catch (error) {
        console.error("Birthday cron error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

async function sendBirthdayMessage(birthday: any) {
    try {
        // First, get the guild configuration to find the birthday channel and custom message
        const guild = await db.guild.findUnique({
            where: { guildId: birthday.guildId },
            cacheStrategy: {
                ttl: 300, // 5 minutes cache
                swr: 300,
            }
        });

        if (!guild) {
            throw new Error(`Guild not found: ${birthday.guildId}`);
        }        // Use custom birthday message from guild or default
        const message = guild.birthdayMessage || CONFIG.DEFAULTS.HBD_MESSAGE;
        const content = message.replace("{user}", `<@${birthday.userId}>`);

        // Check if guild has a specific birthday channel configured
        let channelId = (guild as any).birthdayChannelId;

        // If no birthday channel is set, fall back to system channel or first text channel
        if (!channelId) {
            // Get guild information from Discord API to find a suitable channel
            const guildResponse = await fetch(`${CONFIG.URLS.DISCORD_API_BASE_URL}/guilds/${birthday.guildId}`, {
                headers: {
                    "Authorization": `Bot ${CONFIG.VALUES.BOT_TOKEN}`,
                }
            });

            if (!guildResponse.ok) {
                throw new Error(`Failed to fetch guild info: ${guildResponse.statusText}`);
            }

            const guildData = await guildResponse.json();
            channelId = guildData.system_channel_id;

            // If no system channel, get the first available text channel
            if (!channelId) {
                const channelsResponse = await fetch(`${CONFIG.URLS.DISCORD_API_BASE_URL}/guilds/${birthday.guildId}/channels`, {
                    headers: {
                        "Authorization": `Bot ${CONFIG.VALUES.BOT_TOKEN}`,
                    }
                });

                if (channelsResponse.ok) {
                    const channels = await channelsResponse.json();
                    const textChannel = channels.find((ch: any) => ch.type === 0); // 0 = text channel
                    channelId = textChannel?.id;
                }
            }
        }

        if (!channelId) {
            throw new Error(`No suitable channel found for guild: ${birthday.guildId}`);
        }

        // Send the birthday message
        const response = await fetch(`${CONFIG.URLS.DISCORD_API_BASE_URL}/channels/${channelId}/messages`, {
            method: "POST",
            headers: {
                "Authorization": `Bot ${CONFIG.VALUES.BOT_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: content
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Failed to send birthday message: ${response.status} ${response.statusText} - ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error sending birthday message for user ${birthday.userId} in guild ${birthday.guildId}:`, error);
        throw error;
    }
}
