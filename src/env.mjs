import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        CLIENT_ID: z.string({
            required_error: "CLIENT_ID is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Application ID. Required in .env.local"
        }).min(1,
            "CLIENT_ID is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Application ID. Required in .env.local"
        ),
        PUBLIC_KEY: z.string({
            required_error: "PUBLIC_KEY is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Public Key. Required in .env.local"
        }).min(1,
            "PUBLIC_KEY is required. Visit https://discord.com/developers/applications -> Your bot -> General information -> Public Key. Required in .env.local"
        ),
        BOT_TOKEN: z.string({
            required_error: "BOT_TOKEN is required. Visit https://discord.com/developers/applications -> Your bot -> Bot -> Token. Required in .env.local"
        }).min(1,
            "BOT_TOKEN is required. Visit https://discord.com/developers/applications -> Your bot -> Bot -> Token. Required in .env.local"
        ),
        ROOT_URL: z.string().url("ROOT_URL must be a valid URL").optional().default("http://localhost:3000"),
    },
    onInvalidAccess: (error) => {
        throw new Error(`❌ Attempted to access a server-side environment variable on the client: ${error}`)
    },
    onValidationError: (error) => {
        throw new Error(
            `❌ Invalid environment variables:\n\n${error.errors.map((e, i) => `❌[${i}]: ${e.message}`).join("\n")}\n`
        )
    }
});