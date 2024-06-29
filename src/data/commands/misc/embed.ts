import { ApplicationCommand } from "@/types/interactions";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

const EMBED_COMMAND: ApplicationCommand = {
    name: "embed",
    description: "Send an embed message (requires MANGE_GUILD permission)",
    options: [
        {
            name: "color",
            description: "Color of the embed",
            type: ApplicationCommandOptionType.Integer,
            required: false
        },
        {
            name: "title",
            description: "Title of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "description",
            description: "Description of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "url",
            description: "URL of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "image",
            description: "Image of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "thumbnail",
            description: "Thumbnail of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "footer",
            description: "Footer of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "footer_icon",
            description: "Footer icon of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "author",
            description: "Author of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "author_icon",
            description: "Author icon of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: "author_url",
            description: "Author URL of the embed",
            type: ApplicationCommandOptionType.String,
            required: false
        },
    ]
} as const;


export default EMBED_COMMAND;