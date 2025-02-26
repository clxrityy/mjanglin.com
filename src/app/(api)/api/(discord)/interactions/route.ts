import { CONFIG } from "@/config";
import { commands } from "@/data/commands";
import { env } from "@/env.mjs";
import { adminCommandHandlers, generalCommandHandlers } from "@/handlers/command";
import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";
import { InteractionData, InteractionOption, InteractionSubcommand, InteractionSubcommandGroup } from "@/types/interactions";
import { checkMember } from "@/utils/member";
import { verifyInteractionRequest } from "@/utils/verify";
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

    const verifyResult = await verifyInteractionRequest(req, CONFIG.VALUES.PUBLIC_KEY);
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

        let interactionOptions = interactionData.options as InteractionOption[] || [];
        let interactionSubcommandGroup = interactionData.options?.[0] as InteractionSubcommandGroup<InteractionSubcommand<InteractionOption>> || {};
        let interactionSubcommand = interactionData.options?.[0] as InteractionSubcommand<InteractionOption> || {};
        let interactionSubcommandOptions = interactionSubcommand.options as InteractionOption[] || [];
        let interactionSubcommandGroupOptions = interactionSubcommandGroup && interactionSubcommandGroup.options as InteractionOption[] || [];

        let embed: EmbedType;

        await checkMember(interaction.member!.user!.id, interaction.guild_id!).catch(e => console.error(e));

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

                if (!interactionSubcommand || !interactionSubcommandGroup) {
                    return NextResponse.json({
                        type: InteractionResponseType.ChannelMessageWithSource,
                        data: {
                            content: "Please provide a subcommand"
                        }
                    });
                }

                // /birthday wish

                if (interactionSubcommandGroup) {
                    if (interactionSubcommandGroup.name === "wish" && interactionSubcommandGroup.options.length > 0) {
                        switch (interactionSubcommandGroup.options[0].name) {
                            case "send":
                                embed = await generalCommandHandlers.birthdayHandlers.wish.send(interactionSubcommandGroupOptions!, interaction.member!.user!.id, interaction.guild_id!);

                                return NextResponse.json({
                                    type: InteractionResponseType.ChannelMessageWithSource,
                                    data: {
                                        embeds: [
                                            JSON.parse(JSON.stringify(embed))
                                        ]
                                    }
                                });
                            case "list":
                                embed = await generalCommandHandlers.birthdayHandlers.wish.list(interactionSubcommandGroupOptions!, interaction.member!.user!.id, interaction.guild_id!);

                                return NextResponse.json({
                                    type: InteractionResponseType.ChannelMessageWithSource,
                                    data: {
                                        embeds: [
                                            JSON.parse(JSON.stringify(embed))
                                        ]
                                    }
                                });
                        }
                    }
                }

                switch (interactionSubcommand.name) {
                    // /birthday set
                    case "set":
                        embed = await generalCommandHandlers.birthdayHandlers.set(interactionSubcommandOptions!, interaction.member!.user!.id, interaction.guild_id!);

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
                        embed = await generalCommandHandlers.birthdayHandlers.view(interactionSubcommandOptions!, interaction.member!.user!.id, interaction.guild_id!);

                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                embeds: [
                                    JSON.parse(JSON.stringify(embed))
                                ]
                            }
                        });
                    case "countdown":
                        embed = await generalCommandHandlers.birthdayHandlers.countdown(interactionSubcommandOptions!, interaction.member!.user!.id, interaction.guild_id!);

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

                embed = await generalCommandHandlers.astrologyHandlers.sign(interaction.member!.user!.id, interaction.guild_id!, interactionOptions);

                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        embeds: [
                            JSON.parse(JSON.stringify(embed))
                        ]
                    }
                });

            // /config

            case commands.config.name:

                switch (interactionSubcommand.name) {
                    case "set":

                        if (!interactionSubcommandOptions) {
                            return NextResponse.json({
                                type: InteractionResponseType.ChannelMessageWithSource,
                                data: {
                                    content: "Please provide a subcommand"
                                }
                            });
                        }

                        switch (interactionSubcommandOptions[0].name) {
                            case "changeable":
                                embed = await adminCommandHandlers.configHandlers.set.changeable(interactionSubcommandOptions[0].value as boolean, interaction.member!.user!.id, interaction.guild_id!);

                                return NextResponse.json({
                                    type: InteractionResponseType.ChannelMessageWithSource,
                                    data: {
                                        embeds: [
                                            JSON.parse(JSON.stringify(embed))
                                        ]
                                    }
                                });
                            case "admin_role":
                                embed = await adminCommandHandlers.configHandlers.set.adminRole(interactionSubcommandOptions[0].value as string, interaction.member!.user!.id, interaction.guild_id!);

                                return NextResponse.json({
                                    type: InteractionResponseType.ChannelMessageWithSource,
                                    data: {
                                        embeds: [
                                            JSON.parse(JSON.stringify(embed))
                                        ]
                                    }
                                });
                            case "birthday_role":
                                embed = await adminCommandHandlers.configHandlers.set.birthdayRole(interactionSubcommandOptions[0].value as string, interaction.member!.user!.id, interaction.guild_id!);

                                return NextResponse.json({
                                    type: InteractionResponseType.ChannelMessageWithSource,
                                    data: {
                                        embeds: [
                                            JSON.parse(JSON.stringify(embed))
                                        ]
                                    }
                                });
                            case "birthday_message":
                                embed = await adminCommandHandlers.configHandlers.set.birthdayMessage(interactionSubcommandOptions[0].value as string, interaction.member!.user!.id, interaction.guild_id!);

                                return NextResponse.json({
                                    type: InteractionResponseType.ChannelMessageWithSource,
                                    data: {
                                        embeds: [
                                            JSON.parse(JSON.stringify(embed))
                                        ]
                                    }
                                });
                        }

                    case "view":
                        embed = await adminCommandHandlers.configHandlers.view(interaction.member!.user!.id, interaction.guild_id!);


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

            // /horoscope
            case commands.horoscope.name:

                try {
                    embed = await generalCommandHandlers.astrologyHandlers.horoscope(interaction.member!.user!.id, interaction.guild_id!);

                    return NextResponse.json({
                        type: InteractionResponseType.ChannelMessageWithSource,
                        data: {
                            embeds: [
                                JSON.parse(JSON.stringify(embed))
                            ]
                        }
                    });
                } catch (e) {
                    embed = {
                        title: "Error",
                        description: "An error occured while generating the horoscope",
                        color: Colors.RED
                    }

                    return NextResponse.json({
                        type: InteractionResponseType.ChannelMessageWithSource,
                        data: {
                            embeds: [
                                JSON.parse(JSON.stringify(embed))
                            ]
                        }
                    });
                }

            // /avatar
            case commands.avatar.name:

                embed = await generalCommandHandlers.avatarHandler(interaction.member!.user!.id, interaction.guild_id!, interactionOptions);

                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        embeds: [
                            JSON.parse(JSON.stringify(embed))
                        ]
                    }
                });

            // /help
            case commands.help.name:

                embed = await generalCommandHandlers.helpHandler(interaction.member!.user!.id, interaction.guild_id!, interactionOptions);

                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        embeds: [
                            JSON.parse(JSON.stringify(embed))
                        ]
                    }
                });
            // /compatibility
            case commands.compatibility.name:

                embed = await generalCommandHandlers.astrologyHandlers.compatibility(interaction.member!.user!.id, interaction.guild_id!, interactionOptions);

                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        embeds: [
                            JSON.parse(JSON.stringify(embed))
                        ]
                    }
                });

            // /embed
            case commands.embed.name:

                embed = await adminCommandHandlers.embedHandler(interaction.member!.user!.id, interaction.guild_id!, interactionOptions);

                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        embeds: [
                            JSON.parse(JSON.stringify(embed))
                        ]
                    }
                });

            // /holidays
            case commands.holidays.name:

                embed = await generalCommandHandlers.holidays(interaction.member!.user!.id, interaction.guild_id!, interactionOptions);

                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        embeds: [
                            JSON.parse(JSON.stringify(embed))
                        ]
                    }
                });

            // /hbd

            case commands.hbd.name:
                embed = await adminCommandHandlers.hbdHandler(interaction.member!.user.id, interaction.guild_id!);

                return NextResponse.json({
                    type: InteractionResponseType.ChannelMessageWithSource,
                    data: {
                        embeds: [
                            JSON.parse(JSON.stringify(embed))
                        ]
                    }
                });

            // /friend

            case commands.friend.name:
                switch (interactionSubcommand.name) {
                    case "request":
                        embed = await generalCommandHandlers.friendHandlers.friendRequest(interaction.member!.user!.id, interaction.guild_id!, interactionSubcommandOptions!);

                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                embeds: [
                                    JSON.parse(JSON.stringify(embed))
                                ]
                            }
                        });
                    case "accept":
                        embed = await generalCommandHandlers.friendHandlers.friendAccept(interaction.member!.user!.id, interaction.guild_id!, interactionSubcommandOptions!);

                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                embeds: [
                                    JSON.parse(JSON.stringify(embed))
                                ]
                            }
                        });
                    case "remove":
                        embed = await generalCommandHandlers.friendHandlers.friendRemove(interaction.member!.user!.id, interaction.guild_id!, interactionSubcommandOptions!);

                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                embeds: [
                                    JSON.parse(JSON.stringify(embed))
                                ]
                            }
                        });
                    case "list":
                        embed = await generalCommandHandlers.friendHandlers.friendList(interaction.member!.user!.id, interaction.guild_id!);

                        return NextResponse.json({
                            type: InteractionResponseType.ChannelMessageWithSource,
                            data: {
                                embeds: [
                                    JSON.parse(JSON.stringify(embed))
                                ]
                            }
                        });
                }

            default:
                return NextResponse.json({
                    type: InteractionResponseType.Pong,
                });

        }
    }

    return NextResponse.json("Unknown command", { status: 400 });
}