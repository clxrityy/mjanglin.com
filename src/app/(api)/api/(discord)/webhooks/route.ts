import { NextRequest, NextResponse } from "next/server";
import { CONFIG } from "@/config";
import nacl from "tweetnacl";

export const runtime = "edge";

/**
 * Discord Webhook Handler for Events
 * This handles Discord webhooks for server events like member joins, message reactions, etc.
 */
export async function POST(request: NextRequest) {
    try {
        // Get the raw body and headers
        const body = await request.text();
        const signature = request.headers.get("x-signature-ed25519");
        const timestamp = request.headers.get("x-signature-timestamp");

        if (!signature || !timestamp) {
            return NextResponse.json({ error: "Missing signature headers" }, { status: 401 });
        }

        // Verify the request signature using Discord's public key
        const isValid = nacl.sign.detached.verify(
            Buffer.from(timestamp + body),
            Buffer.from(signature, "hex"),
            Buffer.from(CONFIG.VALUES.PUBLIC_KEY, "hex")
        );

        if (!isValid) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const data = JSON.parse(body);

        // Handle different event types
        switch (data.type) {
            case "guild_member_add":
                await handleMemberJoin(data);
                break;
            case "guild_member_remove":
                await handleMemberLeave(data);
                break;
            case "message_create":
                await handleMessageCreate(data);
                break;
            case "message_reaction_add":
                await handleReactionAdd(data);
                break;
            default:
                console.log(`Unhandled event type: ${data.type}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

async function handleMemberJoin(data: any) {
    // Handle new member joins
    console.log(`New member joined: ${data.user.username}`);

    // Example: Send welcome message or assign birthday role
    // You can integrate with your existing birthday logic here
}

async function handleMemberLeave(data: any) {
    // Handle member leaves
    console.log(`Member left: ${data.user.username}`);
}

async function handleMessageCreate(data: any) {
    // Handle new messages
    console.log(`New message from ${data.author.username}: ${data.content}`);

    // Example: Check for birthday mentions or special keywords
}

async function handleReactionAdd(data: any) {
    // Handle reaction additions
    console.log(`Reaction added: ${data.emoji.name}`);
}
