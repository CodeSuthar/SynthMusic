const { Client, Partials, GatewayIntentBits, Collection } = require("discord.js");
const SynthClient = Client;
const SynthBot = new SynthClient({
    shards: "auto",
    allowedMentions: {
        everyone: false,
        roles: false,
        users: false
    },
    partials: [
        Partials.Channel, 
        Partials.Message, 
        Partials.User, 
        Partials.GuildMember 
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
    ],
});
const { Player } = require("discord-player");
const { readdirSync } = require("fs");

//Adding The Music Manager
SynthBot.manager = new Player(SynthBot);

//Defining Some Globals With The Help Of Client
SynthBot.commands = new Collection();
SynthBot.slashCommands = new Collection();
SynthBot.aliases = new Collection();
SynthBot.cooldowns = new Collection();
SynthBot.config = require("./synthmusic.config.js");
SynthBot.runfix = SynthBot.config.Bot.Prefix;
SynthBot.emoji = require("./emoji.json");

//Loading The Specific Handler Which Name's Are In Array
[ "Commands", "SlashCommands", "ClientEvents", "PlayerEvents", "Mongoose", "HandlingError" ].forEach((Handler) => {
    try {
        require(`./Handler/${Handler}`)(SynthBot).then(() => {
            console.log(`[HANDLER] Loaded ${Handler} System`)
        });
    } catch (e) {
    console.log(`Error Found In Handler Called ${Handler}\nError:- ${e}`)
  }
});

if (!SynthBot.config.Bot.Token) {
    console.log(`[SynthBot] TokenError: No Token Was Found In The Config`)
} else {
    try {
        SynthBot.login(SynthBot.config.Bot.Token) 
    } catch (e) {
        console.log(`[SynthBot] TokenError: The Token Which Was Supplied To Bot Is Invalid`)
    }
}