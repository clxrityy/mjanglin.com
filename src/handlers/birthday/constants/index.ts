import { Colors } from "@/types/constants";
import { EmbedType } from "@/types/general";

const EMBEDS = {
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
}

export default EMBEDS;