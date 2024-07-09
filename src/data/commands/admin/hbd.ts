import { ApplicationCommand } from "@/types/interactions";

const HBD_COMMAND: ApplicationCommand = {
    name: "hbd",
    description: "Announce today's birthdays & give them a role",
} as const;

export default HBD_COMMAND;