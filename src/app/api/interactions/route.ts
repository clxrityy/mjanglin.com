import { commands } from "@/data/commands";
import { env } from "@/env.mjs";
import { birthdayCountdown, birthdaySet, birthdayView, astrologySignHandler } from "@/handlers";
import { verifyInteractionRequest } from "@/lib/verify";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionData, InteractionOption, InteractionSubcommand } from "@/types/interactions";
import {
    // APIInteractionDataOptionBase,
    // ApplicationCommandOptionType,
    InteractionResponseType,
    InteractionType,
} from "discord-api-types/v10";
import { NextResponse } from "next/server";

/**
 * Use edge runtime which is faster, cheaper, and has no cold-boot.
 * If you want to use node runtime, you can change this to `node`, but you'll also have to polyfill fetch (and maybe other things).
 *
 * @see https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes
 */

export const runtime = "edge";

// const ROOT_URL = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : env.ROOT_URL;


/**
 * Handle Discord interactions. Discord will send interactions to this endpoint.
 *
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#receiving-an-interaction
 */

export async function POST(req: Request) {
    const verifyResult = await verifyInteractionRequest(req, env.PUBLIC_KEY);
    if (!verifyResult.isValid) {
        return NextResponse.json("Invalid request", { status: 401 });
    }

    const { interaction } = verifyResult;

    if (interaction.type === InteractionType.Ping) {
        return NextResponse.json({
            type: InteractionResponseType.Pong,
        })
    }

    if (interaction.type === InteractionType.ApplicationCommand) {

        const { name } = interaction.data;

        const interactionData: InteractionData = JSON.parse(JSON.stringify(interaction.data));

        const interactionOptions = interactionData.options;

        const interactionSubcommand = interactionData.options?.[0] as InteractionSubcommand<InteractionOption>;

        const interactionSubcommandOptions = interactionSubcommand.options as InteractionOption[];

        let embed: EmbedType;
        
        switch (name) {
            // /ping
            case commands.ping.name:

                embed = {
                    title: "Pong!",
                    color: Colors.BLURPLE
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

                if (!interactionSubcommand) {
                    return NextResponse.json({
                        type: InteractionResponseType.ChannelMessageWithSource,
                        data: {
                            content: "Please provide a subcommand"
                        }
                    });
                }
                
                switch (interactionSubcommand.name) {
                    // /birthday set
                    case "set":
                        embed = await birthdaySet(interactionSubcommandOptions!, interaction.member!.user!.id, interaction.guild_id!);
                        
                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                embeds: [
                                    JSON.parse(JSON.stringify(embed))
                                ]
                            }
                        });
                    // /birthday view
                    case "view":
                        embed = await birthdayView(interactionSubcommandOptions!, interaction.member!.user!.id, interaction.guild_id!);

                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                embeds: [
                                    JSON.parse(JSON.stringify(embed))
                                ]
                            }
                        });
                    case "countdown":
                        embed = await birthdayCountdown(interactionSubcommandOptions!, interaction.member!.user!.id, interaction.guild_id!);

                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                embeds: [
                                    JSON.parse(JSON.stringify(embed))
                                ]
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
                
            // /sign
            case commands.sign.name:

                embed = await astrologySignHandler(interaction.member!.user!.id, interaction.guild_id!, interactionOptions as InteractionOption[]);

                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        embeds: [
                            JSON.parse(JSON.stringify(embed))
                        ]
                    }
                });

            default:
                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        content: "Unknown command"
                    }
                });
            
        }
    }

    return NextResponse.json("Unknown command", { status: 400 });
}