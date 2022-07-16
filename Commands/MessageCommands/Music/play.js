const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  name: "play",
  category: "Music",
  aliases: ["p"],
  description: "plays music from query",
  usage: "play <query>",
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
      const vc = message.member.voice.channel;
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
      if (!queue.connection) queue.connect(vc)
    }

    const searchquery = args.join(" ")

    if (!searchquery) {
      const embed = new MessageEmbed()
      .setDescription(`You Need To Provide Me Song Query, To Play The Track!`)
      .setColor("RANDOM")
      return message.reply({ embeds: [embed] })
    }

    const song = await client.manager.search(searchquery, {
      requestedBy: message.author,
      searchEngine: QueryType.AUTO
    });

    if (!song || !song.tracks.length) return message.reply({ content: 'No results were found!' });
    
    try {
      if (song.playlist) {
        message.reply({ content: `Loading Your Playlist!` }).then((msg) => {
          wait(2000)
          queue.addTracks(song.tracks)
          if (!queue.playing) queue.play();
        
          const embed = new MessageEmbed()
          .setAuthor({ name: `Loaded Your Playlist`, iconURL: `https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png` })
          .setDescription(`Added ${song.tracks.length} Tracks To Queue`)
          .setFooter({ text: `Requested By ${message.author.tag}` })
          .setColor("RANDOM")
          return msg.edit({ embeds: [embed], content: `🎶 Loaded You Playlist` })
        })
      } else {
        queue.addTrack(song.tracks[0]);
        if (!queue.playing) queue.play();
        const embed = new MessageEmbed()
        .setAuthor({ name: "Added To Queue" })
        .setDescription(`[${song.tracks[0].title}](${song.tracks[0].url})`)
        .setColor("RANDOM")
        return message.reply({ embeds: [embed] })
      }
    } catch (e) {
      console.log(e)
      return message.reply({ content: `Can't Load The Track` })
    }
  }
}

function wait(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}