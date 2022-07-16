const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const db = require("quick.db")

module.exports = {
  name: "stop",
  category: "Music",
  description: "Stops A Music",
  usage: "stop",
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
      const Information = db.get(`np_${message.guild.id}`)
    
      if (Information) {
        const embedend = new MessageEmbed()
        .setTitle("Seems... Like Track Has Been Ended")
        .setDescription(`*[${queue.nowPlaying().title}](${queue.nowPlaying().url})* - Track Has Been **Ended**`)
        .setFooter({ text: `Track Was Requested By ${queue.nowPlaying().requestedBy.tag}`, iconURL: queue.nowPlaying().requestedBy.displayAvatarURL() })
        .setColor("RANDOM")

        const But1 = new MessageButton()
        .setCustomId("volumedown")
        .setEmoji("🔉")
        .setStyle("PRIMARY")
        .setDisabled(true)

        const But2 = new MessageButton()
        .setCustomId("stop")
        .setEmoji("⏹️")
        .setStyle("SECONDARY")
        .setDisabled(true)

        const But3 = new MessageButton()
        .setCustomId("pause")
        .setEmoji("⏸️")
        .setStyle("PRIMARY")
        .setDisabled(true)

        const But4 = new MessageButton()
        .setCustomId("skip")
        .setEmoji("⏭️")
        .setStyle("SECONDARY")
        .setDisabled(true)

        const But5 = new MessageButton()
        .setCustomId("volumeup")
        .setEmoji("🔊")
        .setStyle("PRIMARY")
        .setDisabled(true)

        const row = new MessageActionRow().addComponents(But1, But2, But3, But4, But5);

        const Guild = client.guilds.cache.get(queue.metadata.guild)

        const Channel = Guild.channels.cache.get(queue.metadata.channel)
        
        await Channel.messages.edit(Information, {
          embeds: [embedend],
          components: [row]
        })
      }

      const stop = client.emoji.stop;
      
      const embed = new MessageEmbed()
      .setDescription(`${stop} Stopped - [${queue.nowPlaying().title}](${queue.nowPlaying().url})`)
      .setColor("RANDOM")
      message.reply({ embeds: [embed] })
      if (queue.playing) return queue.stop();
    } catch (e) {
      console.log(e)
      return message.reply({ content: `Can't Stop The Track` })
    }
  }
}