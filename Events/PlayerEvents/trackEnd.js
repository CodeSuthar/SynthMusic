const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("quick.db")

module.exports = async (client) => {
  client.manager.on("trackEnd", async (queue, track) => {
    const queuedata = queue.metadata;
    const Guild = client.guilds.cache.get(queuedata.guild)
    if (!Guild) return;
    const Channel = Guild.channels.cache.get(queuedata.channel)
    if (!Channel) return;

    const Information = db.get(`np_${Guild.id}`)
    
    if (Information) {
      const embed = new MessageEmbed()
      .setTitle("Seems... Like Track Has Been Ended")
      .setDescription(`*[${track.title}](${track.url})* - Track Has Been **Ended**`)
      .setFooter({ text: `Track Was Requested By ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() })
      .setColor("RANDOM")

      const But1 = new MessageButton()
      .setCustomId("volumedown")
      .setEmoji("🔉")
      .setStyle("PRIMARY")
      .setDisabled(true)

      const But2 = new MessageButton()
      .setCustomId("stop")
      .setEmoji("⏹️")
      .setStyle("SECONDARY")
      .setDisabled(true)

      const But3 = new MessageButton()
      .setCustomId("pause")
      .setEmoji("⏸️")
      .setStyle("PRIMARY")
      .setDisabled(true)

      const But4 = new MessageButton()
      .setCustomId("skip")
      .setEmoji("⏭️")
      .setStyle("SECONDARY")
      .setDisabled(true)

      const But5 = new MessageButton()
      .setCustomId("volumeup")
      .setEmoji("🔊")
      .setStyle("PRIMARY")
      .setDisabled(true)

      const row = new MessageActionRow().addComponents(But1, But2, But3, But4, But5);
      
      await Channel.messages.edit(Information, {
        embeds: [embed],
        components: [row]
      })
    } else {
      return
    }
  });
}