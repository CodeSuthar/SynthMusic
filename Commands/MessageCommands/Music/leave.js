const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leave",
    category: "Music",
    description: "Leave A Voice Channel",
    usage: "leave",
    aliases: ["dc", "disconnecct"],
    cooldown: 5,
    execute: async (message, args, SynthBot, prefix) => {

        let queue = SynthBot.manager.getQueue(message.guild.id);
        
        if (!message.member.voice.channelId) {
            const embed = new EmbedBuilder()
            .setDescription("You Are Not Connected To A Voice Channed!")
            .setColor("Random")
            return message.reply({ embeds: [embed] })
        }

        if (queue && queue.connection.channel.id !== message.member.voice.channelId) {
            const embed = new EmbedBuilder()
            .setDescription(`I'm Already Connected To <#${queue.connection.channel.id}> Voice Channel, I Can't Betray <#${queue.connection.channel.id}>!`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })
        }

        if (!queue) {
            const embed = new EmbedBuilder()
            .setDescription(`There's No Player In The Guild`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })  
        }

        try {
           const leave = SynthBot.emoji.leave
      
            const embed = new EmbedBuilder()
            .setDescription(`${leave} Disconnected From <#${queue.connection.channel.id}> Sucessessfully`)
            .setColor("Random")
            if (queue) queue.destroy(true);
            return message.reply({ embeds: [embed] })
        } catch (e) {
            console.log(e)
        }
    }
}