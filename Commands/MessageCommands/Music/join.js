const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "join",
    category: "Music",
    description: "Join A Voice Channe;",
    usage: "join",
    cooldown: 5,
    execute: async (message, args, SynthBot, prefix) => {

        let queue = SynthBot.manager.getQueue(message.guild.id)
    
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

        if (queue && queue.connection.channel.id == message.member.voice.channelId) {
            const embed = new EmbedBuilder()
            .setDescription(`We Are In A Same Voice Channel, Dumbo!`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })
        }
    
        const vc = message.member.voice.channel;

        if (!queue) {
            queue = await SynthBot.manager.createQueue(message.guildId, {
                leaveOnEnd: false,
                leaveOnStop: false,
                initialVolume: 80,
                bufferingTimeout: 200,
                metadata: {
                    guild: message.guild.id,
                    channel: message.channel.id
                }
            })
      
            try {
                const join = SynthBot.emoji.join
        
                if (!queue.connection) queue.connect(vc) 
                const embed = new EmbedBuilder()
                .setDescription(`${join} Joined A Voice Channel ${vc} Sucessfully, And Tied To ${message.channel}`)
                .setColor("Random")
                return message.reply({ embeds: [embed] })
            } catch (e) {
                console.log(e)
            }
        }
    }
}