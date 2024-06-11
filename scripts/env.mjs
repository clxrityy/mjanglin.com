import { createEnv } from "@t3-oss/env-nextjs";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export const env = createEnv({
    server: {
        CLIENT_ID: z.string({
            required_error: "CLIENT_ID is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Application ID. Required in .env.local"
        }).min(
            1,
            "CLIENT_ID is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Application ID. Required in .env.local"
        ),
        CLIENT_SECRET: z.string({
            required_error: "CLIENT_SECRET is required. Visit https://discord.com/developers/applications -> Your bot -> OAuth2 -> Client Secret. Required in .env.local"
        }).min(
            1,
            "CLIENT_SECRET is required. Visit https://discord.com/developers/applications -> Your bot -> OAuth2 -> Client Secret. Required in .env.local"
        ),
        BOT_TOKEN: z.string({
            required_error: "BOT_TOKEN is required. Visit https://discord.com/developers/applications -> Your bot -> Bot -> Token. Required in .env.local"
        }).min(
            1,
            "BOT_TOKEN is required. Visit https://discord.com/developers/applications -> Your bot -> Bot -> Token. Required in .env.local"
        ),
    },
    onValidationError: (error) => {
        throw new Error(
            `❌ Invalid environment variables:\n\n${error.errors.map((e, i) => `❌[${i}]: ${e.message}`).join("\n")}\n`
        )
    }
});