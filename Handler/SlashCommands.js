const { readdirSync } = require("fs");
const { REST } = require("@discordjs/rest");
const { PermissionsBitField, Routes } = require('discord.js');

module.exports = async (SynthBot) => {
    const SlashCMD = []
    readdirSync("./Commands/SlashCommands/").forEach((dir) => {
        const slashFile = readdirSync(`./Commands/SlashCommands/${dir}/`).filter((files) => files.endsWith(".js"));
        for (const file of slashFile) {
            const SlashCommand = require(`../Commands/SlashCommands/${dir}/${file}`);
            if (!SlashCommand.name) return console.error(`[SLASH COMMANDS] NameError: ${file.split(".")[0]} Application command name is required.`);
            if (!SlashCommand.description) return console.error(`[SLASH COMMANDS] DescriptionError: ${file.split(".")[0]} Application command description is required.`);
            SynthBot.slashCommands.set(SlashCommand.name, SlashCommand);
            console.log(`[SLASH COMMANDS] ${SlashCommand.name} Application Command Are Added For Being Registered To SynthBot`);
            SlashCMD.push({
                name: SlashCommand.name,
                description: SlashCommand.description,
                type: SlashCommand.type,
                options: SlashCommand.options ? SlashCommand.options : null,
                dm_permission: SlashCommand.dm ? SlashCommand.dm : null,
                default_member_permissions: SlashCommand.member_permissions ? SlashCommand.resolve(SlashCommand.member_permissions).toString() : null
            });
        }
    });

    SynthBot.on("ready", async () => {
        if (SynthBot.config.SlashSupport) {
            if (SynthBot.config.SlashAsGlobal) {
                (async () => {
                    try {
                        const ApplicationCommand = new REST({ version: '10' }).setToken(SynthBot.config.Bot.Token);
                        ApplicationCommand.put(
                            Routes.applicationCommands(SynthBot.user.id),
                            {
                                body: SlashCMD
                            }
                        );
                    } catch (e) {
                        console.log(`[SLASH COMMANDS] Error: ${e}`);
                    }
                })();
            } else {
                SynthBot.guilds.cache.map(g => g).forEach((guild) => {
                    (async () => {
                        try {
                            const ApplicationCommand = new REST({ version: '10' }).setToken(SynthBot.config.Bot.Token
                            );
                            ApplicationCommand.put(
                                Routes.applicationCommands(SynthBot.user.id, guild.id),
                                {
                                    body: SlashCMD
                                }
                            );
                        } catch (e) {
                            console.log(`[SLASH COMMANDS] Error: ${e}`);
                        }
                    })();
                });
            }
        } else {
            return
        }
    });
};
