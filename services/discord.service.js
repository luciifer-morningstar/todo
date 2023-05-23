
const Discord = require('discord.js'); //import discord.js

const client = new Discord.Client({
    intents: [ Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.on('messageCreate', msg => {
    console.log("client", msg, msg.partial, msg.content)
    if (msg.content != '') {
      msg.reply('Hello!');
    }
  });
});

client.login(process.env.DISCORD_BOT_TOKEN);