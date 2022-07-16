const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "skip",
  category: "Music",
  description: "Skip's A Music",
  usage: "skip",
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

    if (!queue.nowPlaying()) {
      const embed = new MessageEmbed()
      .setDescription(`There's No Player Playing In The Guild`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })  
    }
    
    try {
      const skip = client.emoji.skip
      
      const embed = new MessageEmbed()
      .setDescription(`${skip} Skipped - [${queue.nowPlaying().title}](${queue.nowPlaying().url})`)
      .setColor("RANDOM")
      message.reply({ embeds: [embed] })
      return queue.skip();
    } catch (e) {
      console.log(e)
      return message.reply({ content: `Can't Skip The Track` })
    }
  }
}