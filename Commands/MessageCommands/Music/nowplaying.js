const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "nowplaying",
    category: "Music",
    description: "Show's The Playing Track Information",
    usage: "nowplaying",
    aliases: ["np"],
    cooldown: 5,
    execute: async (message, args, SynthBot, prefix) => {

        let queue = SynthBot.manager.getQueue(message.guild.id);
    
        if (!queue) {
            const embed = new EmbedBuilder()
            .setDescription(`There's No Player In The Guild`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })  
        }

        if (!queue.nowPlaying()) {
            const embed = new EmbedBuilder()
            .setDescription(`There's No Player Playing In The Guild`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })  
        }
    
        try {
            let embed = new EmbedBuilder()
            .addFields(
                { name: `Now Playing:-`, value: `[${queue.nowPlaying().title}](${queue.nowPlaying().url}) - <@${queue.nowPlaying().requestedBy.id}>` },
            { name: "\u200b",
        value: `${queue.createProgressBar({ length: 8 })} • \`${queue.getPlayerTimestamp().current} / ${queue.nowPlaying().duration.replace(/0:00/g, '◉ LIVE')}\`` }
            )
            .setColor("Random")
            return message.reply({ embeds: [embed] })
        } catch (e) {
            console.log(e)
            return message.reply({ content: `Can't Show The Queue The Track` })
        }
    }
}