const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "volume",
  category: "Music",
  description: "Set The Volume Of Player",
  usage: "volume <amount>",
  aliases: ["v"],
  cooldown: 5,
  execute: async (message, args, client, prefix) => {

    let queue = client.manager.getQueue(message.guild.id);
    
    if (!message.member.voice.channelId) {
      const embed = new MessageEmbed()
      .setDescription("You Are Not Connected To A Voice Channed!")
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })
    }

    if (queue && queue.connection.channel.id !== message.member.voice.channelId) {
      const embed = new MessageEmbed()
      .setDescription(`I'm Already Connected To <#${queue.connection.channel.id}> Voice Channel, I Can't Betray <#${queue.connection.channel.id}>!`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })
    }

    if (!queue) {
      const embed = new MessageEmbed()
      .setDescription(`There's No Player In The Guild`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })  
    }

    const amount = Number(args[0]);

    if (!amount) {
      const embed = new MessageEmbed()
      .setDescription(`You Need To Give An Amount To Set Volume!`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })  
    }

    if (amount < 0 || amount > 100) {
      const embed = new MessageEmbed()
      .setDescription(`You Need To Give An Amount Between 0 And 100 To Set Volume!`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] }) 
    }
    
    try {
      let embed;
      const volumeup = client.emoji.volumeup;
      const volumedown = client.emoji.volumedown;

      if (queue.volume < amount) {
        embed = new MessageEmbed()
				.setColor("RANDOM")
				.setDescription(`${volumeup} Volume has been set to: **${amount}%**`)
      }

      if (queue.volume > amount) {
        embed = new MessageEmbed()
				.setColor("RANDOM")
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