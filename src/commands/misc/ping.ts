import { ApplicationCommand } from "@/utils/types";

const PING_COMMAND: ApplicationCommand = {
    name: "ping",
    description: "Replies with Pong!"
} as const;

export default PING_COMMAND;