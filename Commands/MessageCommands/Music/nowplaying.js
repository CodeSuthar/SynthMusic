const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "nowplaying",
  category: "Music",
  description: "Show's The Playing Track Information",
  usage: "nowplaying",
  aliases: ["np"],
  cooldown: 5,
  execute: async (message, args, client, prefix) => {

    let queue = client.manager.getQueue(message.guild.id);
    
    if (!message.guild.me.voice.channelId) {
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

      let embed = new MessageEmbed()
      .addField(`Now Playing:-`, `[${queue.nowPlaying().title}](${queue.nowPlaying().url}) - <@${queue.nowPlaying().requestedBy.id}>`)
      .addField(
        "\u200b",
        `${queue.createProgressBar({ length: 8 })} • \`${queue.getPlayerTimestamp().current} / ${queue.nowPlaying().duration.replace(/0:00/g, '◉ LIVE')}\``
      )
      .setColor("RANDOM")
      
      return message.reply({ embeds: [embed] })
    } catch (e) {
      console.log(e)
      return message.reply({ content: `Can't Show The Queue The Track` })
    }
  }
}