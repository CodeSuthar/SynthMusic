const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "join",
  category: "Music",
  description: "Join A Voice Channe;",
  usage: "join",
  cooldown: 5,
  execute: async (message, args, client, prefix) => {

    let queue = client.manager.getQueue(message.guild.id)
    
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

    if (queue && queue.connection.channel.id == message.member.voice.channelid) {
      const embed = new MessageEmbed()
      .setDescription(`We Are In A Same Voice Channel, Dumbo!`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })
    }
    
    const vc = message.member.voice.channel;

    if (!queue) {
      queue = await client.manager.createQueue(message.guildId, {
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
        const join = client.emoji.join
        
        if (!queue.connection) queue.connect(vc) 
        const embed = new MessageEmbed()
        .setDescription(`${join} Joined A Voice Channel ${vc} Sucessfully, And Tied To ${message.channel}`)
        .setColor("RANDOM")
        return message.reply({ embeds: [embed] })
      } catch (e) {
        console.log(e)
      }
    }
  }
}