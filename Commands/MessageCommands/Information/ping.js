const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  category: "Information",
  description: "Gets The Response Time",
  usage: "ping",
  cooldown: 5,
  execute: async (message, args, client, prefix) => {
    message.reply({ content: `Pinging` }).then((msg) => {
      const pinged = new MessageEmbed()
      .setAuthor({ name: "Pinged The Response Time", iconURL: client.user.displayAvatarURL() })
      .setColor("RANDOM")
      .addFields(
        { name: "Bot Latency", value: `\`\`\`[ ${msg.createdAt - message.createdAt}ms ]\`\`\`` },
        { name: "Gateway Latency", value: `\`\`\`[ ${client.ws.ping}ms ]\`\`\`` }
      )
      msg.edit({ content: `Pinged`, embeds: [pinged] })
    })
  }
}