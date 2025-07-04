// Example external bot that forwards events to Vercel app
// This would run on a traditional server, not on Vercel

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const WEBHOOK_URL = "https://hbd.mjanglin.com/api/discord/webhooks";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("guildMemberAdd", async (member) => {
  await forwardEvent("guild_member_add", {
    user: {
      id: member.user.id,
      username: member.user.username,
      discriminator: member.user.discriminator,
    },
    guild_id: member.guild.id,
    joined_at: member.joinedAt,
  });
});

client.on("guildMemberRemove", async (member) => {
  await forwardEvent("guild_member_remove", {
    user: {
      id: member.user.id,
      username: member.user.username,
      discriminator: member.user.discriminator,
    },
    guild_id: member.guild.id,
  });
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  await forwardEvent("message_create", {
    id: message.id,
    content: message.content,
    author: {
      id: message.author.id,
      username: message.author.username,
    },
    channel_id: message.channel.id,
    guild_id: message.guild?.id,
  });
});

async function forwardEvent(eventType, data) {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WEBHOOK_SECRET}`,
      },
      body: JSON.stringify({
        type: eventType,
        data: data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(
        `Failed to forward event ${eventType}:`,
        response.statusText
      );
    }
  } catch (error) {
    console.error(`Error forwarding event ${eventType}:`, error);
  }
}

client.login(process.env.BOT_TOKEN);
