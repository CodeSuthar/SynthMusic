const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    category: "Information",
    description: "Gets The Response Time",
    usage: "ping",
    cooldown: 5,
    execute: async (message, args, SynthBot, prefix) => {
        message.reply({ content: `Pinging` }).then((msg) => {
            const pinged = new EmbedBuilder()
            .setAuthor({ name: "Pinged The Response Time", iconURL: SynthBot.user.displayAvatarURL() })
            .setColor("Random")
            .addFields(
                { name: "Bot Latency", value: `\`\`\`[ ${msg.createdAt - message.createdAt}ms ]\`\`\`` },
                { name: "Gateway Latency", value: `\`\`\`[ ${SynthBot.ws.ping}ms ]\`\`\`` }
            )
            msg.edit({ content: `Pinged`, embeds: [pinged] })
        })
    }
}