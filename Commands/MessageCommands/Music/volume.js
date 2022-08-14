const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "volume",
    category: "Music",
    description: "Set The Volume Of Player",
    usage: "volume <amount>",
    aliases: ["v"],
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
    
        const amount = Number(args[0]);
    
        if (!amount) {
            const embed = new EmbedBuilder()
            .setDescription(`${SynthBot.emoji.volumeup} The Current Volume Level Is **${queue.volume}%**`)
            .setColor("Random")
            return message.reply({ embeds: [embed] })  
        }
    
        if (amount < 0 || amount > 100) {
            const embed = new EmbedBuilder()
            .setDescription(`You Need To Give An Amount Between 0 And 100 To Set Volume!`)
            .setColor("Random")
            return message.reply({ embeds: [embed] }) 
        }
        
        try {
            let embed;
            const volumeup = SynthBot.emoji.volumeup;
            const volumedown = SynthBot.emoji.volumedown;
    
            if (queue.volume < amount) {
                embed = new EmbedBuilder()
	    		.setColor("Random")
	    		.setDescription(`${volumeup} Volume has been set to **${amount}%**`)
            }
    
            if (queue.volume > amount) {
                embed = new EmbedBuilder()
	    	    .setColor("Random")
	    		.setDescription(`${volumedown} Volume has been set to **${amount}%**`)
            }
    
            
            message.reply({ embeds: [embed] })
            return queue.setVolume(amount);
        } catch (e) {
            console.log(e)
            return message.reply({ content: `Can't Set The Volume` })
        }
    }
}