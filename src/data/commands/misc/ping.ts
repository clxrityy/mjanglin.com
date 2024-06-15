import { ApplicationCommand } from "@/types/interactions";

const PING_COMMAND: ApplicationCommand = {
    name: "ping",
    description: "Replies with Pong!"
} as const;

export default PING_COMMAND;