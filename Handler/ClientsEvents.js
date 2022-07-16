const { readdirSync } = require("fs");

module.exports = async (client) => {
  readdirSync("./Events/ClientEvents/").forEach(file => {
    try {
      const event = require(`../Events/ClientEvents/${file}`);
      client.on(event.name, (...args) => event.run(client, ...args))
      console.log(`[EVENTS] Client event named ${event.name} loaded`);
    } catch (e) {
      console.log(e)
    }
  });
};