const { readdirSync } = require("fs");

module.exports = async (client) => {
  readdirSync("./Events/PlayerEvents/").forEach(file => {
    try {
      require(`../Events/PlayerEvents/${file}`)(client);
      console.log(`[EVENTS] Client event named ${file.split[0]} loaded`);
    } catch (e) {
      console.log(e)
    }
  });
};