const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const db = require("quick.db")

module.exports = async (SynthBot) => {
    SynthBot.manager.on("trackEnd", async (queue, track) => {
        const queuedata = queue.metadata;
        const Guild = SynthBot.guilds.cache.get(queuedata.guild)
        if (!Guild) return;
        const Channel = Guild.channels.cache.get(queuedata.channel)
        if (!Channel) return;

        const Information = db.get(`np_${Guild.id}`)
    
        if (Information) {
            const embed = new EmbedBuilder()
            .setTitle("Seems... Like Track Has Been Ended")
            .setDescription(`*[${track.title}](${track.url})* - Track Has Been **Ended**`)
            .setFooter({ text: `Track Was Requested By ${track.requestedBy.tag}`, iconURL: track.requestedBy.displayAvatarURL() })
            .setColor("Random")

            const But1 = new ButtonBuilder()
            .setCustomId("volumedown")
            .setEmoji("🔉")
            .setStyle("Primary")
            .setDisabled(true)

            const But2 = new ButtonBuilder()
            .setCustomId("stop")
            .setEmoji("⏹️")
            .setStyle("Secondary")
            .setDisabled(true)

            const But3 = new ButtonBuilder()
            .setCustomId("pause")
            .setEmoji("⏸️")
            .setStyle("Primary")
            .setDisabled(true)

            const But4 = new ButtonBuilder()
            .setCustomId("skip")
            .setEmoji("⏭️")
            .setStyle("Secondary")
            .setDisabled(true)

            const But5 = new ButtonBuilder()
            .setCustomId("volumeup")
            .setEmoji("🔊")
            .setStyle("Primary")
            .setDisabled(true)

            const row = new ActionRowBuilder().addComponents(But1, But2, But3, But4, But5);
      
            await Channel.messages.edit(Information, {
              embeds: [embed],
              components: [row]
            })
        } else {
            return
        }
    });
}