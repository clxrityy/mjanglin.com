import { InteractionResponse, EmbedType, InteractionData, Colors } from './../utils/types';
import { APIChatInputApplicationCommandInteraction, APIChatInputApplicationCommandInteractionData, APIInteraction, APIPingInteraction, InteractionResponseType, InteractionType } from "discord-api-types/v10";
import { db } from './db';
import { userMention } from '@/utils/misc';
import { commands } from '@/commands';

const EMBEDS = {
    noSubcommand: {
        description: "Please provide a subcommand",
        color: Colors.RED,
    } as EmbedType,
    birthdayAlreadySet: {
        description: "You've already set your birthday!",
        color: Colors.ORANGE
    } as EmbedType,
    birthdaySet: {
        description: "Birthday set!",
        color: Colors.GREEN
    } as EmbedType,
    noBirthdayFound: {
        description: "No birthday found",
        color: Colors.YELLOW
    } as EmbedType
}

export async function handleCommand(interactionData: APIChatInputApplicationCommandInteraction): Promise<InteractionResponse> {


    switch (interactionData.data.name) {
        /**
         * /ping
         */
        case commands.ping.name:
            return {
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: "Pong!"
                }
            }
        /**
         * /birthday
         */
        // case "birthday":
        //     const subcommand = interactionData.data.options?.[0];

        //     if (!subcommand) {
        //         return {
        //             type: InteractionResponseType.ChannelMessageWithSource,
        //             data: {
        //                 embeds: [EMBEDS.noSubcommand]
        //             }
        //         }
        //     }

        //     switch (subcommand.name) {
        //         case "set":
        //             const user = interactionData.member?.user;

        //             if (!user) {
        //                 return {
        //                     type: InteractionResponseType.ChannelMessageWithSource,
        //                     data: {
        //                         content: "User not found"
        //                     }
        //                 }
        //             }

        //             const existingBirthday = await db.birthday.findUnique({
        //                 where: {
        //                     userId: user.id,
        //                     guildId: interactionData.guildId
        //                 },
        //                 cacheStrategy: {
        //                     swr: 60,
        //                     ttl: 60
        //                 }
        //             });

        //             if (existingBirthday) {
        //                 return {
        //                     type: InteractionResponseType.ChannelMessageWithSource,
        //                     data: {
        //                         embeds: [EMBEDS.birthdayAlreadySet]
        //                     }
        //                 }
        //             }
        //             let day: number;
        //             let month: number;

        //             for (const { name, value } of interactionData.data.options!) {
        //                 switch (name) {
        //                     case "day":
        //                         day = parseInt(value);
        //                         break;
        //                     case "month":
        //                         month = parseInt(value);
        //                         break;
        //                 }
        //             }

        //             try {
        //                 await db.birthday.create({
        //                     data: {
        //                         userId: user.id,
        //                         guildId: interactionData.guildId!,
        //                         day: day!,
        //                         month: month!
        //                     },
        //                 });

        //                 return {
        //                     type: InteractionResponseType.ChannelMessageWithSource,
        //                     data: {
        //                         embeds: [EMBEDS.birthdaySet]
        //                     }
        //                 }

        //             } catch (e: any) {
        //                 return {
        //                     type: InteractionResponseType.ChannelMessageWithSource,
        //                     data: {
        //                         content: e.message
        //                     }
        //                 }
        //             }
        //         case "view":
                    
        //             let target: string;

        //             for (const { name, value } of interactionData.data.options!) {
        //                 if (name === "user") {
        //                     target = value.id;
        //                 }
        //             }

        //             if (target! === undefined) {
        //                 target = interactionData.member!.user.id
        //             }

        //             const birthday = await db.birthday.findUnique({
        //                 where: {
        //                     userId: target,
        //                     guildId: interactionData.guildId
        //                 },
        //                 cacheStrategy: {
        //                     swr: 60,
        //                     ttl: 60
        //                 }
        //             });

        //             if (!birthday) {
        //                 return {
        //                     type: InteractionResponseType.ChannelMessageWithSource,
        //                     data: {
        //                         embeds: [EMBEDS.noBirthdayFound]
        //                     }
        //                 }
        //             }

        //             let embed: EmbedType = {
        //                 color: Colors.BLURPLE,
        //                 description: `${userMention(target)}'s birthday: \`${birthday.month}/${birthday.day}\``
        //             }

        //             return {
        //                 type: InteractionResponseType.ChannelMessageWithSource,
        //                 data: {
        //                     embeds: [embed]
        //                 }
        //             }
        //     }
               
        
        default:
            return {
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                    content: "Unknown command"
                }
            }
    }
}