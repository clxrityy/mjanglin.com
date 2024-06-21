import { ApplicationCommand } from "@/types/interactions";

const HOROSCOPE_COMMAND: ApplicationCommand = {
    name: "horoscope",
    description: "View your daily horoscope (once every 12hrs)",
} as const;

export default HOROSCOPE_COMMAND;