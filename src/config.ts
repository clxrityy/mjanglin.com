export const CONFIG = {
    REDIRECT_URI: process.env.NODE_ENV === "production" ? "https://hbd.mjanglin.com/api/auth/discord/redirect" : "http://localhost:3000/api/auth/discord/redirect",
    OAUTH2_TOKEN: "https://discord.com/api/v10/oauth2/token",
    OAUTH2_USER: "https://discord.com/api/v10/users/@me",
    OAUTH2_REVOKE_TOKEN: "https://discord.com/api/v10/oauth2/token/revoke",
    OAUTH2_INVITE_URL: process.env.NODE_ENV === "development" ? "https://discord.com/oauth2/authorize?client_id=1211045842362966077&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fdiscord%2Fredirect&integration_type=0&scope=identify+applications.commands" : "https://discord.com/oauth2/authorize?client_id=1211045842362966077&response_type=code&redirect_uri=https%3A%2F%2Fhbd.mjanglin.com%2Fapi%2Fauth%2Fdiscord%2Fredirect&scope=identify",
    COOKIE_NAME: process.env.COOKIE_NAME! || "discord-session",
    BASE_URL: process.env.NODE_ENV === "production" ? "https://hbd.mjanglin.com" : "http://localhost:3000",
    DISCORD_API_BASE_URL: "https://discord.com/api/v10",
}