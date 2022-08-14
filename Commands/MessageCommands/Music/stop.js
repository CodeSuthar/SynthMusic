const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "stop",
    category: "Music",
    description: "Stops A Music",
    usage: "stop",
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
        
        try {
            const Information = db.get(`np_${message.guild.id}`)
          
            if (Information) {
                const embedend = new EmbedBuilder()
                .setTitle("Seems... Like Track Has Been Ended")
                .setDescription(`*[${queue.nowPlaying().title}](${queue.nowPlaying().url})* - Track Has Been **Ended**`)
                .setFooter({ text: `Track Was Requested By ${queue.nowPlaying().requestedBy.tag}`, iconURL: queue.nowPlaying().requestedBy.displayAvatarURL() })
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
        
                const Guild = SynthBot.guilds.cache.get(queue.metadata.guild)
        
                const Channel = Guild.channels.cache.get(queue.metadata.channel)
                
                await Channel.messages.edit(Information, {
                    embeds: [embedend],
                    components: [row]
                })
            }
    
            const stop = SynthBot.emoji.stop;
          
            const embed = new EmbedBuilder()
            .setDescription(`${stop} Stopped - [${queue.nowPlaying().title}](${queue.nowPlaying().url})`)
            .setColor("Random")
            message.reply({ embeds: [embed] })
            if (queue.tracks.length) queue.clear(); //there is a bug if we stop the queue it will delete the queue and we can't use leave cmd after that because the queue has been destroyed
            if (queue.playing) return queue.skip(); //so clearing the queue than skipping it will work like stop 
        } catch (e) {
            console.log(e)
            return message.reply({ content: `Can't Stop The Track` })
        }
    }
}