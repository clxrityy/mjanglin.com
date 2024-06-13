import { InteractionData } from "@/utils/types";
import { APIChatInputApplicationCommandInteraction, APIPingInteraction } from "discord-api-types/v10";
import nacl from "tweetnacl";

type VerifyWithNaclArgs = {
    publicKey: string;
    signature: string;
    timestamp: string;
    body: string;
}

const verifyWithNacl = ({ publicKey, signature, timestamp, body }: VerifyWithNaclArgs) => {
    return nacl.sign.detached.verify(
        Buffer.from(timestamp + body),
        Buffer.from(signature, "hex"),
        Buffer.from(publicKey, "hex")
    )
};

type VerifyDiscordRequestResult = | { isValid: false } | { isValid: true, interaction: APIPingInteraction | APIChatInputApplicationCommandInteraction };

/**
 * Verify that the interaction request is from Discord and intended for our bot.
 *
 * @see https://discord.com/developers/docs/interactions/receiving-and-responding#security-and-authorization
 */

export async function verifyInteractionRequest(
    req: Request,
    publicKey: string
): Promise<VerifyDiscordRequestResult> {
    const signature = req.headers.get("X-Signature-ed25519");
    const timestamp = req.headers.get("X-Signature-Timestamp");

    if (typeof signature !== "string" || typeof timestamp !== "string") {
        return { isValid: false };
    }

    const rawBody = await req.text();

    const isValidRequest = signature && timestamp && verifyWithNacl({ publicKey, body: rawBody, signature, timestamp });
    
    if (!isValidRequest) {
        return { isValid: false };
    }

    return {
        interaction: JSON.parse(rawBody) as APIPingInteraction | APIChatInputApplicationCommandInteraction,
        isValid: true
    }
}