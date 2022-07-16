const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "remove",
  category: "Music",
  description: "Removes A Track",
  usage: "remove <index of track>",
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

    const index = Number(args[0]);

    if (!index) {
      const embed = new MessageEmbed()
      .setDescription(`You Need To Provide An Index Of The Queue To Remove It!`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })  
    }
    
    try {
       const eject = client.emoji.eject;
      
      //using index - 1 coz the counting in the language start from 0
      const embed = new MessageEmbed()
      .setDescription(`${eject} Removed - [${queue.tracks[index - 1].title}](${queue.tracks[index - 1].url})`)
      .setColor("RANDOM")
      message.reply({ embeds: [embed] })
      return queue.remove(index - 1);
    } catch (e) {
      console.log(e)
      return message.reply({ content: `Can't Resume The Track` })
    }
  }
}