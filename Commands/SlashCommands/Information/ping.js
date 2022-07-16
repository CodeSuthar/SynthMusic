const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Gets The Response Time",
  cooldown: 5,
  run: async (client, interaction, prefix) => {
    await interaction.deferReply({ ephemeral: true })
    interaction.editReply({ content: `Pinging` }).then(() => {
      const pinged = new MessageEmbed()
      .setAuthor({ name: "Pinged The Response Time", iconURL: client.user.displayAvatarURL() })
      .setColor("RANDOM")
      .addFields(
        { name: "Bot Latency", value: `\`\`\`[ ${Date.now() - interaction.createdAt}ms ]\`\`\`` },
        { name: "Gateway Latency", value: `\`\`\`[ ${client.ws.ping}ms ]\`\`\`` }
      )
      interaction.editReply({ content: `Pinged`, embeds: [pinged] })
    })
  }
}