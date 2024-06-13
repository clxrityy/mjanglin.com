import { verifyInteractionRequest } from "@/lib/verify";
import { env } from "@/env.mjs";
import {
    // APIInteractionDataOptionBase,
    // ApplicationCommandOptionType,
    InteractionResponseType,
    InteractionType,
    // MessageFlags,
} from "discord-api-types/v10";
import { NextResponse } from "next/server";
import { commands } from "@/commands";
import birthdaySet from "@/handlers/birthday";
import { EmbedType } from "@/utils/types";

/**
 * Use edge runtime which is faster, cheaper, and has no cold-boot.
 * If you want to use node runtime, you can change this to `node`, but you'll also have to polyfill fetch (and maybe other things).
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */

export const runtime = "edge";

const ROOT_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : env.ROOT_URL;


/**
 * Handle Discord interactions. Discord will send interactions to this endpoint.
 *
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction
 */

export async function POST(req: Request) {
    const verifyResult = await verifyInteractionRequest(req, env.PUBLIC_KEY);
    if (!verifyResult.isValid) {
        return NextResponse.json( "Invalid request", { status: 401 });
    }

    const { interaction } = verifyResult;

    if (interaction.type === InteractionType.Ping) {
        return NextResponse.json({
            type: InteractionResponseType.Pong,
        })
    }

    if (interaction.type === InteractionType.ApplicationCommand) {

        const { name } = interaction.data;
        
        switch (name) {
            // /ping
            case commands.ping.name:

                const embed: EmbedType = {
                    title: "Pong!",
                    color: 0x00FF00
                }
                
                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        embeds: [
                            JSON.parse(JSON.stringify(embed))
                        ]
                    }
                });
            // /birthday
            case commands.birthday.name:
                switch (interaction.data.options?.[0].name) {
                    // /birthday set
                    case commands.birthday.options?.[0].name:

                        const embed = await birthdaySet(interaction.data.options, interaction.user!.id, interaction.guild_id!);
                        
                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                embeds: [
                                    JSON.parse(JSON.stringify(embed))
                                ]
                            }
                        });
                    // /birthday view
                    case commands.birthday.options?.[1].name:
                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                content: "No birthday found"
                            }
                        });
                    default:
                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                content: "Please provide a subcommand"
                            }
                        });
                 }
            default:

            
        }

        // const commandResponse = await handleCommand(interaction);
        
        // return NextResponse.json(JSON.stringify(commandResponse));
    }

    return NextResponse.json("Unknown command", { status: 400 });
}