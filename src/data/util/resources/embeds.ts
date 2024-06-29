import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";

export const EMBEDS = {
    noSubcommand: {
        description: "Please provide a subcommand",
        color: Colors.RED,
    } as EmbedType,
    birthdayAlreadySet: {
        title: "You've already set your birthday!",
        color: Colors.ORANGE
    } as EmbedType,
    birthdaySet: {
        title: "Birthday set!",
        color: Colors.GREEN
    } as EmbedType,
    noBirthdayFound: {
        description: "No birthday found",
        color: Colors.YELLOW
    } as EmbedType,
    error: {
        title: "An error occurred",
        color: Colors.RED
    } as EmbedType,
    cooldown: {
        title: "COOLDOWN",
        color: Colors.DARK_RED
    } as EmbedType,
    help: {
        title: "hbd | help",
        color: Colors.BLUE,
        description: `<:slash_command:1256619891243352095> [**COMMANDS**](https://hbd.mjanglin.com/commands)\n\n <:discord:1256619327507927041> [**SUPPORT**](https://discord.gg/n65AVpTFNf) | <:github:1256619861363396648> [**GITHUB**](https://github.com/clxrityy/mjanglin.com/tree/hbd)\n\n⚖️ [**Terms of Service**](https://hbd.mjanglin.com/terms-of-service) | ⚖️ [**Privacy Policy**](https://hbd.mjanglin.com/terms-of-service#privacy-policy)`,
        footer: {
            text: `/help [command]`,
        }

    } as EmbedType
}