const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "leave",
  category: "Music",
  description: "Leave A Voice Channel",
  usage: "leave",
  aliases: ["dc", "disconnecct"],
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

    try {
      const leave = client.emoji.leave
      
      const embed = new MessageEmbed()
      .setDescription(`${leave} Disconnected From <#${queue.connection.channel.id}> Sucessessfully`)
      .setColor("RANDOM")
      if (queue) queue.destroy(true);
      return message.reply({ embeds: [embed] })
    } catch (e) {
      console.log(e)
    }
  }
}