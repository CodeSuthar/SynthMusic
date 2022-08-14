const { readdirSync } = require("fs");

module.exports = async (SynthBot) => {
    readdirSync("./Events/ClientEvents/").forEach(file => {
        try {
            const event = require(`../Events/ClientEvents/${file}`);
            SynthBot.on(event.name, (...args) => event.run(SynthBot, ...args))
            console.log(`[EVENTS] Client event named ${event.name} loaded`);
        } catch (e) {
           console.log(e)
        }
    });
};