const { Client, Intents, Collection } = require("discord.js");
const client = new Client({
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users", "everyone"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_VOICE_STATES
  ]
});
const { Player } = require("discord-player");
const { readdirSync } = require("fs")

//Making Some Globals With Client
client.commands = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.config = require("./config.js");
client.password = client.config.Bot.Token;
client.runfix = client.config.Bot.Prefix;
client.emoji = require("./emoji.json");
 
//Adding The Music Manager
client.manager = new Player(client);

//Loading THe Handler System
readdirSync("./Handler/").forEach(file => {
  require(`./Handler/${file}`)(client).then(() => {
    const Handler = file.split(".")[0]
    console.log(`[HANDLER] Loaded ${Handler} System`)
  });
});

client.login(client.password)