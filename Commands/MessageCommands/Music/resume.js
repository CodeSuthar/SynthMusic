const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "resume",
    category: "Music",
    description: "Resumes The Music",
    usage: "pause",
    aliases: ["unpause"],
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
    
        if (!queue.nowPlaying()) {
            const embed = new EmbedBuilder()
            .setDescription(`There's No Player Playing In The Guild`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })  
        }
    
        if (!queue.connection.paused) {
            const embed = new EmbedBuilder()
            .setDescription(`The Song Is Already Resumed`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })  
        }
        
        try {
            const resume = SynthBot.emoji.play;
            
            const embed = new EmbedBuilder()
            .setDescription(`${resume} Resumed - [${queue.nowPlaying().title}](${queue.nowPlaying().url})`)
            .setColor("Random")
            message.reply({ embeds: [embed] })
            if (queue.playing) return queue.setPaused(false);
        } catch (e) {
            console.log(e)
            return message.reply({ content: `Can't Resume The Track` })
        }
    }
}