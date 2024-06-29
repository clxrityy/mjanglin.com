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
        author: {
            name: "hbd",
            icon_url: "https://cdn.discordapp.com/avatars/1211045842362966077/18c79f8d048da2cf804008fd2e65cb64.png",
            url: "https://hbd.mjanglin.com"
        },
        color: Colors.BLUE,
        description: `<:slash_command:1256631341357989928> [**COMMANDS**](https://hbd.mjanglin.com/commands)\n\n <:discord:1256631317915762700> [**SUPPORT**](https://discord.gg/n65AVpTFNf)\n<:github:1256631319312601099> [**GITHUB**](https://github.com/clxrityy/mjanglin.com/tree/hbd)\n\n⚖️ [**Terms of Service**](https://hbd.mjanglin.com/terms-of-service)\n⚖️ [**Privacy Policy**](https://hbd.mjanglin.com/terms-of-service#privacy-policy)`,
        footer: {
            text: `/help [command]`,
        }

    } as EmbedType
}