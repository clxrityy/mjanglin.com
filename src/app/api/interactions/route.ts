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
import { EmbedType, InteractionData } from "@/utils/types";

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

        const interactionData: InteractionData = JSON.parse(JSON.stringify(interaction.data));

        const interactionSubcommand = interactionData.options?.[0];

        const interactionSubcommandOptions = interactionData.options?.[0].options;
        
        
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
                switch (interactionSubcommand!.name) {
                    // /birthday set
                    case "set":
                        const embed = await birthdaySet(interactionSubcommandOptions!, interaction.member!.user!.id, interaction.guild_id!);
                        
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