const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Gets The Response Time",
    cooldown: 5,
    dm_permission: false,
    run: async (SynthBot, interaction, prefix) => {
        await interaction.deferReply({ ephemeral: true })
        interaction.editReply({ content: `Pinging` }).then(() => {
            const pinged = new EmbedBuilder()
            .setAuthor({ name: "Pinged The Response Time", iconURL: SynthBot.user.displayAvatarURL() })
            .setColor("RANDOM")
            .addFields(
                { name: "Bot Latency", value: `\`\`\`[ ${Date.now() - interaction.createdAt}ms ]\`\`\`` },
                { name: "Gateway Latency", value: `\`\`\`[ ${SynthBot.ws.ping}ms ]\`\`\`` }
            )
            interaction.editReply({ content: `Pinged`, embeds: [pinged] })
        })
    }
}