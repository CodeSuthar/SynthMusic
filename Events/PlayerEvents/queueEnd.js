const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = async (client) => {
  client.manager.on("queueEnd", async (queue, track) => {
    const queuedata = queue.metadata;
    const Guild = client.guilds.cache.get(queuedata.guild)
    if (!Guild) return;
    const Channel = Guild.channels.cache.get(queuedata.channel)
    if (!Channel) return;

    const embed = new MessageEmbed()
    .setDescription("Queue Has Been **Ended**")
    .setTimestamp()
    .setColor("RANDOM")
    
    Channel
    .send({
      embeds: [embed]
    })
  });
}