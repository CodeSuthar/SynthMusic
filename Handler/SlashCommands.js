const { readdirSync } = require("fs");

module.exports = async (client) => {
  const SlashCMD = []
  readdirSync("./Commands/SlashCommands/").forEach((dir) => {
    const slashFile = readdirSync(`./Commands/SlashCommands/${dir}/`).filter((files) => files.endsWith(".js"));
    for (const file of slashFile) {
      const SlashCommand = require(`../Commands/SlashCommands/${dir}/${file}`);
      if(!SlashCommand.name) return console.error(`[SLASH COMMANDS] NameError: ${file.split(".")[0]} Application command name is required.`);
      if(!SlashCommand.description) return console.error(`[SLASH COMMANDS] DescriptionError: ${file.split(".")[0]} Application command description is required.`);
      client.slashCommands.set(SlashCommand.name, SlashCommand);
      console.log(`[SLASH COMMANDS] ${SlashCommand.name} Application command is added for being registered to client`);
      SlashCMD.push(SlashCommand);
    }
  });

  client.on("ready", async () => {
    if (client.config.SlashSupport) {
      if (client.config.SlashAsGlobal) {
        client.application.commands.set(SlashCMD).then(() => {
          console.log(`[SLASH COMMANDS] Application commands are registered to client.`)
          console.log(`[SLASH COMMANDS] It May Take Few Minutes To Slash Be Updated.`)
        })
      } else {
        client.guilds.cache.map(g => g).forEach((guild) => {
          try {
            guild.commands.set(SlashCMD).then(() => {
              console.log(`[SLASH COMMANDS] Application commands are registered to client.`).catch((e) => console.log(e));
              console.log(`[SLASH COMMANDS] It May Take Few Minutes To SLash Be Updated.`).catch((e) => console.log(e));
            })
          } catch (e) {
            console.log(`Error: ${err.stack}`)
          }
        })
      }
    } else {
      return
    }
  });
};