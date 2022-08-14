const { readdirSync } = require("fs");

module.exports = async (SynthBot) => {
    readdirSync("./Events/PlayerEvents/").forEach(file => {
        try {
            require(`../Events/PlayerEvents/${file}`)(SynthBot);
            console.log(`[EVENTS] Player event named ${file.split(".")[0]} loaded`);
        } catch (e) {
            console.log(e)
        }
    });
};