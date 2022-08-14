const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");

module.exports = async (SynthBot) => {
    SynthBot.manager.on("queueEnd", async (queue, track) => {
        const queuedata = queue.metadata;
        const Guild = SynthBot.guilds.cache.get(queuedata.guild)
        if (!Guild) return;
        const Channel = Guild.channels.cache.get(queuedata.channel)
        if (!Channel) return;

        const embed = new EmbedBuilder()
        .setDescription("Queue Has Been **Ended**")
        .setTimestamp()
        .setColor("Random")
    
        Channel.send({
            embeds: [embed]
        })
    });
}