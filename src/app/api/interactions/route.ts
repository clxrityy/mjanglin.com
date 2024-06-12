import { commands } from "@/commands";
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
import { handleCommand } from "@/lib/handleCommand";
import { InteractionData } from "@/utils/types";

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
        return NextResponse.json({ message: "Invalid request signature" }, { status: 401 });
    }

    const { interaction } = verifyResult;

    if (interaction.type === InteractionType.Ping) {
        return NextResponse.json({ type: InteractionResponseType.Pong });
    }

    if (interaction.type === InteractionType.ApplicationCommand) {
        const interactionObject: InteractionData = interaction as InteractionData;

        return NextResponse.json(await handleCommand(interactionObject));
    }

    return NextResponse.json({ message: "Unknown command" }, { status: 400 });
}